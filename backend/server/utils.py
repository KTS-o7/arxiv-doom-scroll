from pydantic import BaseModel, Field
import requests
from typing import Optional
import aiohttp
import asyncio
from datetime import datetime, timedelta
import json
from cachetools import TTLCache
import xml.etree.ElementTree as ET


class ArxivQueryParams(BaseModel):
    search_query: str = Field(default="", description="The search query to search for")
    id_list: list[str] = Field(default_factory=list, description="The list of IDs to search for")
    start: int = Field(default=0, description="The start index of the search")
    max_results: int = Field(default=10, description="The maximum number of results to return")
    sortBy: str = Field(default="relevance", description="The field to sort the results by")
    sortOrder: str = Field(default="descending", description="The order to sort the results by")


class ArxivResponse(BaseModel):
    feed: dict = Field(..., description="The feed of the response")
    entries: list[dict] = Field(..., description="The entries of the response")


class ArxivError(BaseModel):
    error: str = Field(..., description="The error message")


class Author(BaseModel):
    name: str = Field(..., description="Author name")
    affiliation: Optional[str] = Field(None, description="Author affiliation")


class Link(BaseModel):
    href: str = Field(..., description="Link URL")
    rel: Optional[str] = Field(None, description="Link relation")
    title: Optional[str] = Field(None, description="Link title")
    type: Optional[str] = Field(None, description="Link type")


class Category(BaseModel):
    term: str = Field(..., description="Category term")
    scheme: Optional[str] = Field(None, description="Category scheme")
    isPrimary: bool = Field(False, description="Whether this is the primary category")


class OpenSearchMetadata(BaseModel):
    totalResults: int = Field(..., description="The total number of results")
    startIndex: int = Field(..., description="The start index of the results")
    itemsPerPage: int = Field(..., description="The number of results per page")


class ArxivPaper(BaseModel):
    id: str
    title: str
    summary: str
    published: str
    updated: str
    authors: list[Author]
    links: list[Link]
    categories: list[Category]
    primaryCategory: Category
    comment: Optional[str] = None
    journalRef: Optional[str] = None
    doi: Optional[str] = None


class AsyncHTTPClient:
    def __init__(self, base_url: str):
        self.base_url = base_url

    async def get(self, url: str, params: dict = None):
        response = requests.get(url, params=params)
        return response.json()


class ArxivService:
    def __init__(self):
        self.base_url = "http://export.arxiv.org/api/query"
        # Cache papers for 1 hour
        self.cache = TTLCache(maxsize=1000, ttl=3600)
        self.session = None

    async def get_session(self):
        if self.session is None:
            self.session = aiohttp.ClientSession()
        return self.session

    async def close(self):
        if self.session:
            await self.session.close()
            self.session = None

    def get_cache_key(self, params: dict) -> str:
        # Create a unique cache key from the query parameters
        return json.dumps(params, sort_keys=True)

    async def fetch_papers(self, params: ArxivQueryParams) -> tuple[list[ArxivPaper], OpenSearchMetadata]:
        cache_key = self.get_cache_key(params.dict())
        
        # Check cache first
        if cache_key in self.cache:
            return self.cache[cache_key]

        # If not in cache, fetch from arXiv
        session = await self.get_session()
        query_params = {
            'search_query': params.search_query,
            'id_list': ','.join(params.id_list) if params.id_list else '',
            'start': params.start,
            'max_results': params.max_results,
            'sortBy': params.sortBy,
            'sortOrder': params.sortOrder
        }

        async with session.get(self.base_url, params=query_params) as response:
            if response.status != 200:
                raise ArxivError(error=f"ArXiv API returned status code {response.status}")
            
            data = await response.text()
            # Parse XML response
            root = ET.fromstring(data)
            
            # Get namespace mapping
            ns = {
                'atom': 'http://www.w3.org/2005/Atom',
                'opensearch': 'http://a9.com/-/spec/opensearch/1.1/',
                'arxiv': 'http://arxiv.org/schemas/atom'
            }
            
            # Parse total results from opensearch metadata
            total_results = int(root.find('opensearch:totalResults', ns).text)
            
            papers = []
            for entry in root.findall('atom:entry', ns):
                # Parse basic metadata
                paper_id = entry.find('atom:id', ns).text.split('/')[-1]
                title = entry.find('atom:title', ns).text.strip()
                summary = entry.find('atom:summary', ns).text.strip()
                published = entry.find('atom:published', ns).text
                updated = entry.find('atom:updated', ns).text
                
                # Parse authors
                authors = []
                for author in entry.findall('atom:author', ns):
                    name = author.find('atom:name', ns).text
                    affiliation = author.find('arxiv:affiliation', ns)
                    authors.append(Author(
                        name=name,
                        affiliation=affiliation.text if affiliation is not None else None
                    ))
                
                # Parse links
                links = []
                for link in entry.findall('atom:link', ns):
                    links.append(Link(
                        href=link.get('href'),
                        rel=link.get('rel'),
                        title=link.get('title'),
                        type=link.get('type')
                    ))
                
                # Parse categories
                categories = []
                primary_category = None
                for category in entry.findall('atom:category', ns):
                    cat = Category(
                        term=category.get('term'),
                        scheme=category.get('scheme'),
                        isPrimary='true' == category.get('{http://arxiv.org/schemas/atom}primary', 'false')
                    )
                    categories.append(cat)
                    if cat.isPrimary:
                        primary_category = cat
                
                # Parse optional fields
                comment = entry.find('arxiv:comment', ns)
                journal_ref = entry.find('arxiv:journal_ref', ns)
                doi = entry.find('arxiv:doi', ns)
                
                # Create ArxivPaper object
                paper = ArxivPaper(
                    id=paper_id,
                    title=title,
                    summary=summary,
                    published=published,
                    updated=updated,
                    authors=authors,
                    links=links,
                    categories=categories,
                    primaryCategory=primary_category or categories[0],
                    comment=comment.text if comment is not None else None,
                    journalRef=journal_ref.text if journal_ref is not None else None,
                    doi=doi.text if doi is not None else None
                )
                papers.append(paper)
            
            metadata = OpenSearchMetadata(
                totalResults=total_results,  # Use the parsed total_results
                startIndex=params.start,
                itemsPerPage=params.max_results
            )

            # Cache the results
            result = (papers, metadata)
            self.cache[cache_key] = result
            return result

# Create a global instance of the service
arxiv_service = ArxivService()



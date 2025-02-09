import { ArxivQueryParams, ArxivResponse, ArxivPaper } from "../data/types";
import { XMLParser } from "fast-xml-parser";

const BASE_URL = "http://export.arxiv.org/api/query";
const INITIAL_BATCH_SIZE = 50;

/**
 * Converts XML response to our ArxivResponse type
 */
const parseArxivResponse = (xmlData: string): ArxivResponse => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    textNodeName: "text",
    isArray: (name) => ["entry", "author", "category", "link"].includes(name),
  });

  const parsed = parser.parse(xmlData);
  const feed = parsed.feed;

  return {
    feed: {
      title: feed.title.text || feed.title,
      id: feed.id,
      updated: feed.updated,
      opensearch: {
        totalResults: parseInt(feed["opensearch:totalResults"]),
        startIndex: parseInt(feed["opensearch:startIndex"]),
        itemsPerPage: parseInt(feed["opensearch:itemsPerPage"]),
      },
      entries: feed.entry.map((entry: any) => ({
        id: entry.id,
        title: entry.title.text || entry.title,
        summary: entry.summary.text || entry.summary,
        published: entry.published,
        updated: entry.updated,
        authors: entry.author.map((author: any) => ({
          name: author.name.text || author.name,
          affiliation: author["arxiv:affiliation"],
        })),
        categories: entry.category.map((category: any) => ({
          term: category.term,
          scheme: category.scheme,
        })),
        primaryCategory: {
          term: entry["arxiv:primary_category"].term,
          scheme: entry["arxiv:primary_category"].scheme,
        },
        links: entry.link.map((link: any) => ({
          href: link.href,
          rel: link.rel,
          type: link.type,
          title: link.title,
        })),
        comment: entry["arxiv:comment"],
        journalRef: entry["arxiv:journal_ref"],
        doi: entry["arxiv:doi"],
      })),
    },
  };
};

/**
 * Constructs the query URL from the provided parameters
 */
const buildQueryUrl = (params: ArxivQueryParams): string => {
  const queryParams = new URLSearchParams();

  if (params.search_query) queryParams.set("search_query", params.search_query);
  if (params.id_list) queryParams.set("id_list", params.id_list);
  if (params.start !== undefined)
    queryParams.set("start", params.start.toString());
  if (params.max_results !== undefined)
    queryParams.set("max_results", params.max_results.toString());
  if (params.sortBy) queryParams.set("sortBy", params.sortBy);
  if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);

  return `${BASE_URL}?${queryParams.toString()}`;
};

/**
 * Fetches arXiv data based on the provided query parameters
 * @param params Query parameters for the arXiv API
 * @returns Promise that resolves to the parsed ArxivResponse
 * @throws Error if the request fails or the response is invalid
 */
export const fetchArxivData = async (
  params: ArxivQueryParams
): Promise<ArxivResponse> => {
  try {
    const url = buildQueryUrl(params);

    // Add a delay to respect arXiv's rate limiting
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ArXiv API request failed: ${response.statusText}`);
    }

    const xmlData = await response.text();
    return parseArxivResponse(xmlData);
  } catch (error) {
    throw new Error(
      `Failed to fetch arXiv data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Example usage:
 *
 * const response = await fetchArxivData({
 *   search_query: 'cat:cs.AI',
 *   max_results: 10
 * });
 */

export async function fetchArxivPapers(
  page: number,
  isInitialLoad = false
): Promise<ArxivPaper[]> {
  const batchSize = isInitialLoad ? INITIAL_BATCH_SIZE : 10;
  const start = page * batchSize;

  try {
    // Add a small delay to respect arXiv's rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(
      `http://export.arxiv.org/api/query?search_query=cat:cs.AI&start=${start}&max_results=${batchSize}&sortBy=submittedDate&sortOrder=descending`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");

    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      console.error("XML parsing error:", parserError);
      return [];
    }

    const entries = xmlDoc.getElementsByTagName("entry");
    console.log(`Fetched ${entries.length} papers`); // Debug log

    return Array.from(entries).map((entry): ArxivPaper => {
      const authors = Array.from(entry.getElementsByTagName("author")).map(
        (author) => {
          const nameElement = author.getElementsByTagName("name")[0];
          return nameElement ? nameElement.textContent || "" : "";
        }
      );

      const getElementText = (element: Element, tagName: string): string => {
        const elem = element.getElementsByTagName(tagName)[0];
        return elem ? elem.textContent?.replace(/\s+/g, " ").trim() || "" : "";
      };

      // Get the PDF link
      const links = Array.from(entry.getElementsByTagName("link"));
      const pdfLink =
        links
          .find((link) => link.getAttribute("title") === "pdf")
          ?.getAttribute("href") || "";

      return {
        id: getElementText(entry, "id"),
        title: getElementText(entry, "title"),
        summary: getElementText(entry, "summary"),
        authors,
        publishedDate: getElementText(entry, "published"),
        link: pdfLink || getElementText(entry, "id"), // Use PDF link if available
      };
    });
  } catch (error) {
    console.error("Error fetching arXiv papers:", error);
    throw error; // Propagate error to show in UI
  }
}

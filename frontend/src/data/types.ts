// Base URL and query parameter types
export interface ArxivQueryParams {
  search_query?: string;
  id_list?: string;
  start?: number;
  max_results?: number;
  sortBy?: "relevance" | "lastUpdatedDate" | "submittedDate";
  sortOrder?: "ascending" | "descending";
}

// Author type with optional affiliation
export interface Author {
  name: string;
  affiliation?: string;
}

// Category type for arXiv classifications
export interface Category {
  term: string;
  scheme: string;
  isPrimary?: boolean;
}

// Link type for different article references
export interface Link {
  href: string;
  rel: "alternate" | "related";
  type?: string;
  title?: "pdf" | "doi";
}

// Main article entry type
export interface ArxivEntry {
  id: string;
  title: string;
  summary: string;
  published: string;
  updated: string;
  authors: Author[];
  categories: Category[];
  links: Link[];
  // ArXiv specific fields
  comment?: string;
  journalRef?: string;
  doi?: string;
  primaryCategory: Category;
}

// OpenSearch metadata
export interface OpenSearchMetadata {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
}

// Main feed response type
export interface ArxivResponse {
  feed: {
    title: string;
    id: string;
    updated: string;
    opensearch: OpenSearchMetadata;
    entries: ArxivEntry[];
  };
}

// Error response type
export interface ArxivError {
  feed: {
    title: string;
    id: string;
    updated: string;
    entry: {
      id: string;
      title: string;
      summary: string;
      updated: string;
      link: Link;
      author: Author;
    };
  };
}

export interface Colors {
  background: string;
  border: string;
  primary: string;
  secondary: string;
}

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  publishedDate: string;
  link: string;
}

export interface Theme extends Colors {
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}

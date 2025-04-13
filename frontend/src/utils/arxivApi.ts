import {
  ArxivQueryParams,
  ArxivServerResponse,
  ArxivPaper,
} from "../data/types";

//const BASE_URL = "https://infscrolltest.pythonanywhere.com/api/";
const BASE_URL = "http://127.0.0.1:5000/api";
/**
 * Fetches papers from the pythonanywhere server
 */
export const fetchArxivData = async (
  params: ArxivQueryParams
): Promise<ArxivServerResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (params.search_query)
      queryParams.set("search_query", params.search_query);
    if (params.id_list) queryParams.set("id_list", params.id_list);
    if (params.start !== undefined)
      queryParams.set("start", params.start.toString());
    if (params.max_results !== undefined)
      queryParams.set("max_results", params.max_results.toString());
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);

    const url = `${BASE_URL}/papers?${queryParams.toString()}`;
    //console.log('fetchArxivData: Attempting to fetch from URL:', url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    //console.log('fetchArxivData: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(
        `Server request failed: ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    //console.log('fetchArxivData: Received data:', data);
    return data;
  } catch (error) {
    console.error("fetchArxivData: Error details:", error);
    throw error;
  }
};

/**
 * Fetches papers with pagination
 * @param page - The page number (0-based)
 * @returns Promise containing the papers and total count
 */
export async function fetchArxivPapers(
  page: number
): Promise<{ papers: ArxivPaper[]; totalResults: number }> {
  try {
    //console.log('fetchArxivPapers: Starting fetch for page:', page);

    const response = await fetchArxivData({
      search_query: "cat:cs.AI",
      start: page * 50,
      max_results: 50,
      sortBy: "submittedDate",
      sortOrder: "descending",
    });

    //console.log('fetchArxivPapers: Raw response:', response);

    if (!response.papers || !Array.isArray(response.papers)) {
      console.error("fetchArxivPapers: Invalid response format:", response);
      throw new Error("Invalid response format from server");
    }

    // Transform the server response to match ArxivPaper interface
    const papers: ArxivPaper[] = response.papers.map((paper) => ({
      id: paper.id,
      title: paper.title,
      summary: paper.summary,
      authors: paper.authors.map((author) => author.name),
      publishedDate: paper.published,
      link: paper.links.find((link) => link.title === "pdf")?.href || paper.id,
    }));

    //console.log('fetchArxivPapers: Transformed papers:', papers.length);

    return {
      papers,
      totalResults: response.metadata.total_results,
    };
  } catch (error) {
    console.error("fetchArxivPapers: Error:", error);
    throw error;
  }
}

/**
 * Fetches a single paper by ID
 */
export const fetchPaperById = async (paperId: string): Promise<ArxivPaper> => {
  try {
    const response = await fetch(`${BASE_URL}/paper/${paperId}`);

    if (!response.ok) {
      throw new Error(`Server request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch paper: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Add a test function
export const testApiConnection = async () => {
  try {
    const response = await fetch(`${BASE_URL}/test`);
    const data = await response.json();
    console.log("API test response:", data);
    return data;
  } catch (error) {
    console.error("API test error:", error);
    throw error;
  }
};

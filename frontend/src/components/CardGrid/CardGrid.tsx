import { useState, useEffect, useCallback } from "react";
import { ArxivPaper } from "../../data/types";
import Card from "../Card/Card";
import { GridContainer, LoadingText, CardWrapper } from "./CardGrid.styles";
import { fetchArxivPapers } from "../../utils/arxivApi";

const CardGrid: React.FC = () => {
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePapers = useCallback(async () => {
    //console.log('loadMorePapers called, loading:', loading, 'hasMore:', hasMore);
    if (loading || !hasMore) {
      //console.log('Skipping load due to loading:', loading, 'or hasMore:', hasMore);
      return;
    }

    try {
      setLoading(true);
      //console.log('CardGrid: Fetching papers for page:', page);

      const { papers: newPapers, totalResults } = await fetchArxivPapers(page);
      //console.log('CardGrid: Received papers:', newPapers.length, 'total:', totalResults);
      
      if (newPapers.length === 0) {
        //console.log('CardGrid: No more papers available');
        setHasMore(false);
        return;
      }

      setPapers(prev => {
        const updatedPapers = [...prev, ...newPapers];
        //console.log('CardGrid: Total papers after update:', updatedPapers.length);
        return updatedPapers;
      });
      
      setHasMore(papers.length + newPapers.length < totalResults);
      setPage(prev => prev + 1);
    } catch (err) {
      //console.error('CardGrid: Error loading papers:', err);
      setError(err instanceof Error ? err.message : "Failed to load papers");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, papers.length]);

  // Initial load effect
  useEffect(() => {
    const initializeAndLoad = async () => {
      //console.log('CardGrid: Initializing component');
      // Reset states
      setPapers([]);
      setPage(0);
      setHasMore(true);
      setError(null);
      setLoading(false);
      
      // Load initial papers
      await loadMorePapers();
    };

    initializeAndLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load more papers when approaching the end
  useEffect(() => {
    if (papers.length === 0) return;
    
    const loadThreshold = 5;
    if (currentIndex >= papers.length - loadThreshold && hasMore && !loading) {
      //console.log('Triggering load more papers'); // Debug log
      loadMorePapers();
    }
  }, [currentIndex, papers.length, hasMore, loading, loadMorePapers]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (papers.length === 0) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, papers.length - 1));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [papers.length]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (touchStart === null || papers.length === 0) return;
      e.preventDefault();

      const currentTouch = e.touches[0].clientY;
      const diff = touchStart - currentTouch;
      const threshold = 50; // minimum swipe distance

      if (Math.abs(diff) < threshold) return;

      if (diff > 0) {
        // Swipe up - show next paper
        setCurrentIndex((prev) => Math.min(prev + 1, papers.length - 1));
      } else {
        // Swipe down - show previous paper
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }

      setTouchStart(null);
    },
    [touchStart, papers.length]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStart(null);
  }, []);

  // Desktop scroll handling
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // Mobile touch handling
  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (error) {
    return <LoadingText>Error: {error}</LoadingText>;
  }

  return (
    <GridContainer>
      {loading && papers.length === 0 ? (
        <LoadingText>Loading papers...</LoadingText>
      ) : papers.length > 0 ? (
        <>
          <CardWrapper key={papers[currentIndex].id}>
            <Card paper={papers[currentIndex]} />
          </CardWrapper>
          {loading && <LoadingText>Loading more papers...</LoadingText>}
          {!hasMore && currentIndex === papers.length - 1 && (
            <LoadingText>No more papers to load</LoadingText>
          )}
        </>
      ) : (
        <LoadingText>No papers available</LoadingText>
      )}
    </GridContainer>
  );
};

export default CardGrid;

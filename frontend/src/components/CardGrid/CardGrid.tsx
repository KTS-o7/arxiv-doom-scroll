import { useState, useEffect, useCallback } from "react";
import { ArxivPaper } from "../../data/types";
import Card from "../Card/Card";
import { GridContainer, LoadingText, CardWrapper } from "./CardGrid.styles";
import { fetchArxivPapers } from "../../utils/arxivApi";

const CardGrid = () => {
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const loadPapers = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const newPapers = await fetchArxivPapers(0, true);
      if (newPapers.length === 0) {
        throw new Error("No papers received from API");
      }
      setPapers(newPapers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load papers");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

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

  useEffect(() => {
    if (papers.length === 0) {
      loadPapers();
    }
  }, [papers.length, loadPapers]);

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
      {isLoading ? (
        <LoadingText>Loading papers...</LoadingText>
      ) : (
        papers[currentIndex] && (
          <CardWrapper key={papers[currentIndex].id}>
            <Card paper={papers[currentIndex]} />
          </CardWrapper>
        )
      )}
    </GridContainer>
  );
};

export default CardGrid;

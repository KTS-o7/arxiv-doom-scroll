import { useState, useEffect, useCallback } from "react";
import { ArxivPaper } from "../../data/types";
import Card from "../Card/Card";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import { fetchArxivPapers } from "../../utils/arxivApi";
import { useIsBigCardOpen } from "../../hooks/useIsBigCardOpen";
import { styled } from "@mui/material/styles";

const GridBox = styled(Box)(({ theme }) => ({
  minHeight: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  touchAction: "none",
  overflow: "hidden",
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
    minHeight: "calc(100vh - 80px)",
  },
}));

const CardGrid: React.FC = () => {
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isBigCardOpen = useIsBigCardOpen();

  const loadMorePapers = useCallback(async () => {
    //console.log('loadMorePapers called, loading:', loading, 'hasMore:', hasMore);

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

      setPapers((prev) => {
        const updatedPapers = [...prev, ...newPapers];
        //console.log('CardGrid: Total papers after update:', updatedPapers.length);
        return updatedPapers;
      });

      setHasMore(papers.length + newPapers.length < totalResults);
      setPage((prev) => prev + 1);
    } catch (err) {
      //console.error('CardGrid: Error loading papers:', err);
      setError(err instanceof Error ? err.message : "Failed to load papers");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, papers.length]);

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

      const scrollThreshold = 18;
      const currentScrollDist = Math.abs(e.deltaY);
      //console.log(' Before trigger Scroll distance:', currentScrollDist);
      if (currentScrollDist >= scrollThreshold) {
        //console.log('Scroll distance:', currentScrollDist);
        if (e.deltaY > 0) {
          setCurrentIndex((prev) => Math.min(prev + 1, papers.length - 1));
        } else {
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    },
    [papers.length]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (isBigCardOpen) return;
      setTouchStart(e.touches[0].clientY);
    },
    [isBigCardOpen]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isBigCardOpen) return;
      if (touchStart === null || papers.length === 0) return;
      e.preventDefault();

      const currentTouch = e.touches[0].clientY;
      const diff = touchStart - currentTouch;
      const threshold = 50;

      if (Math.abs(diff) < threshold) return;

      if (diff > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, papers.length - 1));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }

      setTouchStart(null);
    },
    [touchStart, papers.length, isBigCardOpen]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStart(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (papers.length === 0) return;

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setCurrentIndex((prev) => Math.min(prev + 1, papers.length - 1));
          break;
      }
    },
    [papers.length]
  );

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

  //  new effect for keyboard handling
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 10, textAlign: "center" }}>
        <Alert severity="error" sx={{ display: "inline-flex" }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <GridBox>
      {loading && papers.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={40} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading papers...
          </Typography>
        </Box>
      ) : papers.length > 0 ? (
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 1, sm: 2, md: 3 },
            width: "100%",
          }}
        >
          <Fade in={true} timeout={500}>
            <Box sx={{ position: "relative" }}>
              <Card
                paper={papers[currentIndex]}
                onPrevious={() =>
                  currentIndex > 0 && setCurrentIndex(currentIndex - 1)
                }
                onNext={() =>
                  currentIndex < papers.length - 1 &&
                  setCurrentIndex(currentIndex + 1)
                }
                hasPrevious={currentIndex > 0}
                hasNext={currentIndex < papers.length - 1}
              />
              {loading && (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    color: "text.secondary",
                  }}
                >
                  Loading more papers...
                </Typography>
              )}
              {!hasMore && currentIndex === papers.length - 1 && (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    color: "text.secondary",
                  }}
                >
                  No more papers to load
                </Typography>
              )}
            </Box>
          </Fade>
        </Container>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No papers available
        </Typography>
      )}
    </GridBox>
  );
};

export default CardGrid;

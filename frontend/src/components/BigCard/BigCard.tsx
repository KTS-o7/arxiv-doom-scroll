import React, { useEffect } from "react";
import { Typography, IconButton, Link, Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSetBigCardOpen } from "../../hooks/useIsBigCardOpen";
import { StyledPaper } from "./BigCard.styles";

interface BigCardProps {
  title: string;
  authors: string[];
  publishedDate: string;
  summary: string;
  url: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const BigCard: React.FC<BigCardProps> = ({
  title,
  authors,
  publishedDate,
  summary,
  url,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = true,
  hasNext = true,
}) => {
  const setBigCardOpen = useSetBigCardOpen();

  useEffect(() => {
    setBigCardOpen(true);
    return () => setBigCardOpen(false);
  }, [setBigCardOpen]);

  // Prevent touch events from propagating when scrolling inside the BigCard
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StyledPaper
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        sx={{
          position: "relative",
          maxWidth: { xs: "95%", sm: "600px", md: "800px" },
          maxHeight: { xs: "95vh", sm: "90vh" },
          width: "90%",
          overflow: "auto",
          padding: { xs: 2, sm: 3 },
          margin: { xs: 1, sm: 2 },
          "& .MuiTypography-h5": {
            fontSize: {
              xs: "1.25rem",
              sm: "1.5rem",
              md: "1.75rem",
            },
            paddingRight: { xs: 4, sm: 5 }, // Space for close button
          },
          "& .MuiTypography-subtitle1, & .MuiTypography-subtitle2": {
            fontSize: {
              xs: "0.875rem",
              sm: "1rem",
            },
          },
          "& .MuiTypography-body1": {
            fontSize: {
              xs: "0.875rem",
              sm: "1rem",
            },
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Authors: {authors.join(", ")}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Published: {new Date(publishedDate).toLocaleDateString()}
        </Typography>

        <Typography
          variant="body1"
          component="p"
          sx={{ mt: 2, textAlign: "justify" }}
        >
          {summary}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            component="a"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "medium",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Read More
          </Link>
        </Box>

        {/* Navigation arrows at the bottom */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            pb: 1,
          }}
        >
          <IconButton
            onClick={onPrevious}
            disabled={!hasPrevious || !onPrevious}
            sx={{
              visibility: hasPrevious && onPrevious ? "visible" : "hidden",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            onClick={onNext}
            disabled={!hasNext || !onNext}
            sx={{ visibility: hasNext && onNext ? "visible" : "hidden" }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </StyledPaper>
    </Modal>
  );
};

export default BigCard;

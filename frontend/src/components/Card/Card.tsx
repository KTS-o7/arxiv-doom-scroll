import React, { useState } from "react";
import { ArxivPaper } from "../../data/types";
import {
  Card as MUICard,
  CardContent,
  Typography,
  CardActionArea,
  Fade,
  Box,
} from "@mui/material";
import BigCard from "../BigCard/BigCard";

interface CardProps {
  paper: ArxivPaper;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const Card: React.FC<CardProps> = ({
  paper,
  onPrevious,
  onNext,
  hasPrevious = true,
  hasNext = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to get first 4 lines of summary
  const truncateSummary = (text: string) => {
    const lines = text.split("\n").slice(0, 6);
    return lines.join("\n") + (text.split("\n").length > 4 ? "..." : "");
  };

  return (
    <>
      <Fade in={true} timeout={500}>
        <MUICard
          sx={{
            maxWidth: { xs: "95%", sm: "600px", md: "800px" },
            width: "100%",
            m: "auto",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: {
                xs: "none",
                sm: "translateY(-4px)",
              },
              boxShadow: { xs: 2, sm: 6 },
            },
          }}
        >
          <CardActionArea onClick={() => setIsExpanded(true)}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  lineHeight: 1.4,
                  fontSize: {
                    xs: "1.125rem",
                    sm: "1.25rem",
                    md: "1.5rem",
                  },
                  wordBreak: "break-word",
                  padding: { xs: 1, sm: 2 },
                }}
              >
                {paper.title}
              </Typography>
              <Box sx={{ mt: { xs: 1, sm: 2 }, textAlign: "justify" }}>
                <Typography
                  variant="body1"
                  component="p"
                  color="text.secondary"
                  sx={{
                    whiteSpace: "pre-line",
                    lineHeight: 1.6,
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                    },
                    padding: { xs: 1, sm: 0 },
                  }}
                >
                  {truncateSummary(paper.summary)}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </MUICard>
      </Fade>

      {isExpanded && (
        <BigCard
          title={paper.title}
          authors={paper.authors}
          publishedDate={paper.publishedDate}
          summary={paper.summary}
          url={paper.link}
          onClose={() => setIsExpanded(false)}
          onPrevious={onPrevious}
          onNext={onNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      )}
    </>
  );
};

export default Card;

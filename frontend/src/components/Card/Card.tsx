import React, { useState } from 'react';
import { ArxivPaper } from "../../data/types";
import {
  StyledCard,
  Title,
  Summary,
} from "./Card.styles";
import BigCard from '../BigCard/BigCard';

interface CardProps {
  paper: ArxivPaper;
}

const Card: React.FC<CardProps> = ({ paper }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Function to get first 4 lines of summary
  const truncateSummary = (text: string) => {
    const lines = text.split('\n').slice(0, 6);
    return lines.join('\n') + (text.split('\n').length > 4 ? '...' : '');
  };

  return (
    <>
      <StyledCard onClick={() => setIsExpanded(true)}>
        <Title>{paper.title}</Title>
        <Summary>{truncateSummary(paper.summary)}</Summary>
      </StyledCard>
      
      {isExpanded && (
        <BigCard
          title={paper.title}
          authors={paper.authors}
          publishedDate={paper.publishedDate}
          summary={paper.summary}
          url={paper.link}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default Card;

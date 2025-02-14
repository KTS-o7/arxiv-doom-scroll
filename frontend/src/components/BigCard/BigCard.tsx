import React from 'react';
import {
  StyledBigCard,
  StyledOverlay,
  Title,
  AuthorInfo,
  PublicationDate,
  Summary,
  ReadMoreLink,
  CloseButton,
} from './BigCard.styles';

interface BigCardProps {
  title: string;
  authors: string[];
  publishedDate: string;
  summary: string;
  url: string;
  onClose: () => void;
}

const BigCard: React.FC<BigCardProps> = ({
  title,
  authors,
  publishedDate,
  summary,
  url,
  onClose,
}) => {
  return (
    <>
      <StyledOverlay onClick={onClose} />
      <StyledBigCard>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{title}</Title>
        <AuthorInfo>
          Authors: {authors.join(', ')}
        </AuthorInfo>
        <PublicationDate>
          Published: {new Date(publishedDate).toLocaleDateString()}
        </PublicationDate>
        <Summary>{summary}</Summary>
        <ReadMoreLink href={url} target="_blank" rel="noopener noreferrer">
          Read More
        </ReadMoreLink>
      </StyledBigCard>
    </>
  );
};

export default BigCard;

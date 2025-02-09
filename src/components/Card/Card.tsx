import { ArxivPaper } from "../../data/types";
import {
  StyledCard,
  Title,
  Summary,
  AuthorList,
  PublishedDate,
  ReadMore,
} from "./Card.styles";

interface CardProps {
  paper: ArxivPaper;
}

const Card = ({ paper }: CardProps) => {
  return (
    <StyledCard>
      <Title>{paper.title}</Title>
      <AuthorList>{paper.authors.join(", ")}</AuthorList>
      <PublishedDate>
        {new Date(paper.publishedDate).toLocaleDateString()}
      </PublishedDate>
      <Summary>{paper.summary}</Summary>
      <ReadMore href={paper.link} target="_blank" rel="noopener noreferrer">
        Read More
      </ReadMore>
    </StyledCard>
  );
};

export default Card;

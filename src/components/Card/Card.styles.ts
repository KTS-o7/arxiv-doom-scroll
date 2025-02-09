import styled from "styled-components";

export const StyledCard = styled.article`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.medium};
  max-height: 80vh;
  overflow-y: auto;
  margin: 0 ${({ theme }) => theme.spacing.medium};

  /* Custom scrollbar for better aesthetics */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 4px;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Summary = styled.p`
  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: ${({ theme }) => theme.spacing.small} 0;
  display: -webkit-box;
  -webkit-line-clamp: 15;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const AuthorList = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 0.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const PublishedDate = styled.span`
  color: ${({ theme }) => theme.secondary};
  font-size: 0.8rem;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const ReadMore = styled.a`
  color: ${({ theme }) => theme.border};
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

import styled from "styled-components";

export const StyledCard = styled.article`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
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
    background: ${({ theme }) => theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Summary = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: ${({ theme }) => theme.spacing.small} 0;
  display: -webkit-box;
  overflow: hidden;
`;







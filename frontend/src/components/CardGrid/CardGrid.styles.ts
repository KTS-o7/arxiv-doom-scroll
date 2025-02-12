import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const GridContainer = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.medium};
  touch-action: none; /* Prevents default touch behaviors */
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.small};
  }
`;

export const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.medium};
`;

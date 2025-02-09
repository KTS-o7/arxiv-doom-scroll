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
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.medium};
  touch-action: none; /* Prevents default touch behaviors */
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.small};
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
  color: ${({ theme }) => theme.secondary};
  padding: ${({ theme }) => theme.spacing.medium};
`;

import styled from "styled-components";

export const StyledNav = styled.nav`
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: ${({ theme }) => theme.spacing.medium};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  text-align: center;
`;

export const Acknowledgement = styled.h3`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  display: block;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

export const DoomName = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  display: block;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

export const ColorLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`;

import React from 'react';
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from './styles/theme';
import Navbar from "./components/Navbar/Navbar";
import CardGrid from "./components/CardGrid/CardGrid";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Inter', sans-serif;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
        <CardGrid />
    </ThemeProvider>
  );
};

export default App;

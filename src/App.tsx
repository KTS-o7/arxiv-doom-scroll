import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme } from "./data/types";
import Navbar from "./components/Navbar/Navbar";
import CardGrid from "./components/CardGrid/CardGrid";

const theme: Theme = {
  background: "#121212",
  border: "#A6ABF4",
  primary: "#E2E2E2",
  secondary: "#A3BABF",
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1024px",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
    font-family: 'Inter', sans-serif;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <CardGrid />
    </ThemeProvider>
  );
}

export default App;

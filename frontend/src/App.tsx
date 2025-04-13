import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme, CustomThemeProvider } from "./contexts/ThemeContext";
import { getTheme } from "./styles/theme";
import Navbar from "./components/Navbar/Navbar";
import CardGrid from "./components/CardGrid/CardGrid";

const ThemedApp = () => {
  const { mode } = useTheme();
  const theme = getTheme(mode);

  console.log("mode", mode);
  console.log("theme", theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <CardGrid />
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <ThemedApp />
    </CustomThemeProvider>
  );
}

export default App;

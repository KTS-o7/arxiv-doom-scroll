import {
  Typography,
  Link,
  Box,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../../contexts/ThemeContext";
import { StyledAppBar, StyledToolbar } from "./Navbar.styles";

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              justifyContent: { xs: "left", sm: "center" },
              py: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              color="primary"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.25rem",
                },
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              ArXiv Doom Scroll
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                },
                textAlign: "center",
                maxWidth: { xs: "100%", sm: "80%" },
                mx: "auto",
              }}
            >
              Content provided by arXiv.org - Find the latest research papers
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              justifyContent: { xs: "left", sm: "center" },
              mt: { xs: 1, sm: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexDirection: { xs: "row", sm: "row" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                  },
                }}
              >
                Built by your fellow Doom Scroller:
              </Typography>

              <Link
                href="https://github.com/KTS-o7"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.875rem",
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }} />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "inherit",
                  }}
                >
                  KTS
                </Typography>
              </Link>
            </Box>

            <Tooltip
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                size="small"
                sx={{
                  ml: { xs: 0, sm: 1 },
                  padding: { xs: 0.5, sm: 1 },
                }}
              >
                {mode === "light" ? (
                  <Brightness4Icon
                    sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                  />
                ) : (
                  <Brightness7Icon
                    sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;

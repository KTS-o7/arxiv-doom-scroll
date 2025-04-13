import { createTheme, ThemeOptions } from "@mui/material/styles";
/*
:root[data-theme="light"] {
  --text: #232c02;
  --background: #f8fee1;
  --primary: #677f05;
  --secondary: #62cef9;
  --accent: #1508d4;
}
:root[data-theme="dark"] {
  --text: #f4fdd3;
  --background: #181e01;
  --primary: #e1fa80;
  --secondary: #06729d;
  --accent: #392bf7;
}
*/
// --- Shared Theme Settings ---
const sharedSettings = {
  // More pronounced rounded corners
  borderRadius: "12px",

  // Enhanced shadow system
  shadows: {
    small: "0 2px 4px rgba(0, 0, 0, 0.3)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.4)",
    large: "0 8px 16px rgba(0, 0, 0, 0.5)",
    glow: "0 0 15px rgba(211, 177, 23, 0.5)",
  },

  // Expanded spacing system
  spacing: {
    xs: "4px",
    small: "8px",
    medium: "16px",
    large: "24px",
    xl: "32px",
    xxl: "48px",
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },

  // Typography settings
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeights: {
      normal: 600,
      medium: 700,
      semibold: 800,
      bold: 900,
    },
    sizes: {
      xs: "0.75rem",
      small: "0.875rem",
      base: "1rem",
      large: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
      heading: "2rem",
    },
  },

  // Animation settings
  animation: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.5s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Common feedback colors
  commonColors: {
    success: "#4ADE80",
    warning: "#FB923C",
    error: "#F87171",
  },
};

// --- Dark Theme ---
export const darkTheme = {
  colors: {
    background: "#181e01", // New dark background
    text: "#f4fdd3", // New dark text
    primary: "#e1fa80", // New dark primary
    secondary: "#62cef9", // New dark secondary
    accent: "#392bf7", // New dark accent
    border: "#2a2408", // Darker shade of background for border
    ...sharedSettings.commonColors,
  },
  ...sharedSettings,
  shadows: {
    ...sharedSettings.shadows,
    glow: "0 0 15px rgba(211, 177, 23, 0.5)", // Updated to match new primary color
  },
};

// --- Light Theme ---
export const lightTheme = {
  colors: {
    background: "#f8fee1", // New light background
    text: "#232c02", // New light text
    primary: "#677f05", // New light primary
    secondary: "#06729d", // New light secondary
    accent: "#1508d4", // New light accent
    border: "#e8e4d2", // Lighter shade of background for border
    ...sharedSettings.commonColors,
  },
  ...sharedSettings,
  shadows: {
    small: "0 2px 4px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.15)",
    large: "0 8px 16px rgba(0, 0, 0, 0.2)",
    glow: "0 0 15px rgba(232, 197, 44, 0.4)", // Updated to match new primary color
  },
};

// Define the Theme type based on the structure (e.g., using darkTheme)
// Both themes should adhere to this structure.
export type Theme = typeof darkTheme;

// Optional: Export a default theme or a function to get the current theme
export const defaultTheme = darkTheme; // Or lightTheme depending on preference

// Convert your spacing object to MUI's spacing function
const createSpacing = (base: number) => (factor: number) =>
  `${base * factor}px`;

export const getTheme = (mode: "light" | "dark") => {
  const colors = mode === "light" ? lightTheme.colors : darkTheme.colors;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.background,
        paper: colors.background, // Use background for paper
      },
      text: {
        primary: colors.text,
        secondary: colors.secondary, // Use secondary for textSecondary
      },
    },
    spacing: createSpacing(8), // MUI's default spacing unit is 8px
    shape: {
      borderRadius: 8, // Convert your borderRadius to number
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: colors.background,
            color: colors.text,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background, // Use background for paper
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background, // Use background for AppBar
            color: colors.text,
          },
        },
      },
    },
    typography: {
      fontFamily: sharedSettings.typography.fontFamily,
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 500,
      },
      h5: {
        fontSize: "1.1rem",
        fontWeight: 500,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
      },
      body1: {
        fontSize: "1rem",
      },
      body2: {
        fontSize: "0.875rem",
      },
    },
  };

  return createTheme(themeOptions);
};

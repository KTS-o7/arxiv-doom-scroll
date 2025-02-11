export const theme = {
  colors: {
    background: '#121212',
    text: '#E2E2E2',
    textSecondary: '#A3BABF',
    primary: '#E2E2E2',
    secondary: '#A3BABF',
    border: '#A6ABF4',
  },
  borderRadius: '8px',
  shadows: {
    medium: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
};
export type Theme = typeof theme;

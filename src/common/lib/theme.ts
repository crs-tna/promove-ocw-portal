'use client'

import { createTheme } from '@mui/material/styles'

// Convert HSL to RGB helper function
const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
};

const colors = {
  light: {
    primary: hslToRgb(24, 100, 50), // #ff6600
    secondary: hslToRgb(285, 76, 31), // #75138d  
    tertiary: hslToRgb(63, 100, 41), // #d1d500
    background: hslToRgb(36, 0, 95), // #f2f2f2
    foreground: hslToRgb(36, 14, 7), // #14120f
    card: hslToRgb(0, 0, 100), // white
    muted: hslToRgb(240, 4, 90),
    accent: hslToRgb(240, 4, 90),
    border: hslToRgb(240, 5, 85),
    destructive: hslToRgb(0, 84.2, 60.2),
  },
  dark: {
    primary: hslToRgb(24, 100, 50), // #ff6600
    secondary: hslToRgb(285, 76, 31), // #75138d
    tertiary: hslToRgb(63, 100, 41), // #d1d500
    background: hslToRgb(36, 14, 4), // #0C0B09
    foreground: hslToRgb(0, 0, 100), // white
    card: hslToRgb(0, 0, 10),
    muted: hslToRgb(0, 0, 20),
    accent: hslToRgb(0, 0, 20),
    border: hslToRgb(0, 0, 20),
    destructive: hslToRgb(0, 62.8, 30.6),
  }
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6600', // Primary orange
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#75138d', // Secondary purple
      contrastText: '#ffffff',
    },
    error: {
      main: hslToRgb(0, 84.2, 60.2), // Destructive color
      contrastText: '#ffffff',
    },
    background: {
      default: '#f2f2f2', // Background
      paper: '#ffffff', // Card background
    },
    text: {
      primary: '#14120f', // Foreground
      secondary: hslToRgb(240, 4, 40), // Muted foreground
    },
    divider: hslToRgb(240, 5, 85), // Border color
    action: {
      hover: colors.light.accent,
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // 0.5rem converted to pixels
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6600', // Primary orange (same as light)
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#75138d', // Secondary purple (same as light)
      contrastText: '#ffffff',
    },
    error: {
      main: hslToRgb(0, 62.8, 30.6), // Dark destructive color
      contrastText: '#ffffff',
    },
    background: {
      default: '#0C0B09', // Dark background
      paper: colors.dark.card, // Dark card background
    },
    text: {
      primary: '#ffffff', // Dark foreground
      secondary: hslToRgb(0, 0, 65), // Dark muted foreground
    },
    divider: colors.dark.border, // Dark border color
    action: {
      hover: colors.dark.accent,
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(255 255 255 / 0.1), 0 1px 2px -1px rgb(255 255 255 / 0.1)',
        },
      },
    },
  },
})
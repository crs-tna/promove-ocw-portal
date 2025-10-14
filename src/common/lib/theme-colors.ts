export const customColors = {
  primary: {
    main: '#ff6600',
    light: '#ff8533',
    dark: '#cc5200',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#75138d',
    light: '#9440a8',
    dark: '#5b0f71',
    contrastText: '#ffffff',
  },
  tertiary: {
    main: '#d1d500',
    light: '#e6e633',
    dark: '#a6a600',
    contrastText: '#000000',
  },
  light: {
    background: '#f2f2f2',
    surface: '#ffffff',
    onSurface: '#14120f',
    muted: '#e6e6e6',
    mutedForeground: '#666666',
    border: '#d9d9d9',
  },
  dark: {
    background: '#0c0b09',
    surface: '#1a1a1a',
    onSurface: '#ffffff',
    muted: '#333333',
    mutedForeground: '#a6a6a6',
    border: '#333333',
  },
  chart: {
    1: '#ff6600',
    2: '#75138d', 
    3: '#d1d500',
    4: '#003366',
    5: '#14120f',
  }
} as const;

// Helper function to get colors based on theme mode
export const getThemeColors = (isDark: boolean) => {
  return isDark ? customColors.dark : customColors.light;
};

// Utility function to create custom color variants
export const createCustomPalette = (isDark: boolean) => ({
  primary: customColors.primary,
  secondary: customColors.secondary,
  tertiary: customColors.tertiary,
  ...getThemeColors(isDark),
  chart: customColors.chart,
});
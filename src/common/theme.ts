'use client'

import { createTheme } from '@mui/material/styles'

// Função para converter HSL para RGB (MUI usa RGB/hex)
const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100
    l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0,
        g = 0,
        b = 0

    if (0 <= h && h < 60) {
        r = c
        g = x
        b = 0
    } else if (60 <= h && h < 120) {
        r = x
        g = c
        b = 0
    } else if (120 <= h && h < 180) {
        r = 0
        g = c
        b = x
    } else if (180 <= h && h < 240) {
        r = 0
        g = x
        b = c
    } else if (240 <= h && h < 300) {
        r = x
        g = 0
        b = c
    } else if (300 <= h && h < 360) {
        r = c
        g = 0
        b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return `rgb(${r}, ${g}, ${b})`
}

// Cores baseadas no seu globals.css
const colors = {
    light: {
        background: hslToRgb(36, 0, 95), // #f2f2f2
        foreground: hslToRgb(36, 14, 7), // #14120f
        primary: hslToRgb(24, 100, 50), // #ff6600
        secondary: hslToRgb(285, 76, 31), // #75138d
        tertiary: hslToRgb(63, 100, 41), // #d1d500
        card: '#ffffff',
        muted: hslToRgb(240, 4, 90),
        mutedForeground: hslToRgb(240, 4, 40),
        accent: hslToRgb(240, 4, 90),
        destructive: hslToRgb(0, 84.2, 60.2),
        border: hslToRgb(240, 5, 85),
    },
    dark: {
        background: hslToRgb(36, 14, 4), // #0C0B09
        foreground: '#ffffff',
        primary: hslToRgb(24, 100, 50), // #ff6600
        secondary: hslToRgb(285, 76, 31), // #75138d
        tertiary: hslToRgb(63, 100, 41), // #d1d500
        card: hslToRgb(0, 0, 10),
        muted: hslToRgb(0, 0, 20),
        mutedForeground: hslToRgb(0, 0, 65),
        accent: hslToRgb(0, 0, 20),
        destructive: hslToRgb(0, 62.8, 30.6),
        border: hslToRgb(0, 0, 20),
    },
}

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: colors.light.background,
            paper: colors.light.card,
        },
        text: {
            primary: colors.light.foreground,
            secondary: colors.light.mutedForeground,
            disabled: colors.light.mutedForeground,
        },
        primary: {
            main: colors.light.primary,
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.light.secondary,
            contrastText: '#ffffff',
        },
        error: {
            main: colors.light.destructive,
            contrastText: '#ffffff',
        },
        warning: {
            main: colors.light.tertiary,
            contrastText: '#000000',
        },
        info: {
            main: '#0066cc',
            contrastText: '#ffffff',
        },
        success: {
            main: '#4caf50',
            contrastText: '#ffffff',
        },
        divider: colors.light.border,
        action: {
            hover: colors.light.accent,
            selected: colors.light.accent,
            disabled: colors.light.mutedForeground,
        },
    },
    shape: {
        borderRadius: 8, // 0.5rem = 8px
    },
    typography: {
        fontFamily: 'inherit',
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 500,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
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
                    borderRadius: 8,
                    border: `1px solid ${colors.light.border}`,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '& fieldset': {
                            borderColor: colors.light.border,
                        },
                        '&:hover fieldset': {
                            borderColor: colors.light.primary,
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: colors.dark.background,
            paper: colors.dark.card,
        },
        text: {
            primary: colors.dark.foreground,
            secondary: colors.dark.mutedForeground,
            disabled: colors.dark.mutedForeground,
        },
        primary: {
            main: colors.dark.primary,
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.dark.secondary,
            contrastText: '#ffffff',
        },
        error: {
            main: colors.dark.destructive,
            contrastText: '#ffffff',
        },
        warning: {
            main: colors.dark.tertiary,
            contrastText: '#000000',
        },
        info: {
            main: '#66b3ff',
            contrastText: '#000000',
        },
        success: {
            main: '#81c784',
            contrastText: '#000000',
        },
        divider: colors.dark.border,
        action: {
            hover: colors.dark.accent,
            selected: colors.dark.accent,
            disabled: colors.dark.mutedForeground,
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: 'inherit',
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 500,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
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
                    borderRadius: 8,
                    border: `1px solid ${colors.dark.border}`,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '& fieldset': {
                            borderColor: colors.dark.border,
                        },
                        '&:hover fieldset': {
                            borderColor: colors.dark.primary,
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
})

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import { lightTheme, darkTheme } from '../theme'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextProps {
    mode: ThemeMode
    setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const AppThemeProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [mode, setMode] = useState<ThemeMode>('system')

    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
    const appliedTheme =
        mode === 'system'
            ? prefersDark
                ? darkTheme
                : lightTheme
            : mode === 'dark'
              ? darkTheme
              : lightTheme

    // salva no localStorage
    useEffect(() => {
        const saved = localStorage.getItem('themeMode') as ThemeMode | null
        if (saved) setMode(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('themeMode', mode)
    }, [mode])

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <MuiThemeProvider theme={appliedTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeMode = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx)
        throw new Error(
            'useThemeMode deve ser usado dentro de AppThemeProvider'
        )
    return ctx
}

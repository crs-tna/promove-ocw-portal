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
    actualTheme: 'light' | 'dark' // tema que está sendo aplicado de fato
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const AppThemeProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [mode, setMode] = useState<ThemeMode>('system')
    const [mounted, setMounted] = useState(false)

    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

    // Determina qual tema aplicar
    const actualTheme =
        mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode

    const appliedTheme = actualTheme === 'dark' ? darkTheme : lightTheme

    // Carrega o tema salvo
    useEffect(() => {
        const saved = localStorage.getItem('themeMode') as ThemeMode | null
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
            setMode(saved)
        }
        setMounted(true)
    }, [])

    // Salva o tema no localStorage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('themeMode', mode)
        }
    }, [mode, mounted])

    // Aplica a classe no HTML para sincronizar com Tailwind
    useEffect(() => {
        if (mounted) {
            const html = document.documentElement
            if (actualTheme === 'dark') {
                html.classList.add('dark')
            } else {
                html.classList.remove('dark')
            }
        }
    }, [actualTheme, mounted])

    // Evita flash de conteúdo não estilizado
    if (!mounted) {
        return null
    }

    return (
        <ThemeContext.Provider value={{ mode, setMode, actualTheme }}>
            <MuiThemeProvider theme={appliedTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeMode = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        throw new Error(
            'useThemeMode deve ser usado dentro de AppThemeProvider'
        )
    }
    return ctx
}

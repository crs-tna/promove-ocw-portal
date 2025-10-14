'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useTheme } from 'next-themes'
import { theme, darkTheme } from './lib/theme'
import { useEffect, useState } from 'react'

function MuiThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { theme: nextTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a default theme during SSR
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    )
  }

  const muiTheme = nextTheme === 'dark' ? darkTheme : theme

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

import { UserContextProvider } from './contexts/user-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MuiThemeProviderWrapper>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </MuiThemeProviderWrapper>
    </NextThemeProvider>
  )
}
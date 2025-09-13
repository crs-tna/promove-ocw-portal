'use client'

import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#fafafa',
            paper: '#fff',
        },
    },
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
})

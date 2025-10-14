'use client'

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { useTheme } from 'next-themes'
import { useEffect, useState, MouseEvent } from 'react'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme)
        handleClose()
    }

    if (!mounted) {
        return null
    }

    const ICON_SIZE = 16
    const open = Boolean(anchorEl)

    return (
        <>
            <IconButton
                size="small"
                onClick={handleClick}
                sx={{ color: 'text.secondary' }}
                aria-label="change theme"
            >
                {theme === 'light' ? (
                    <LightModeOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
                ) : theme === 'dark' ? (
                    <DarkModeOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
                ) : (
                    <LaptopOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
                )}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem
                    onClick={() => handleThemeChange('light')}
                    selected={theme === 'light'}
                >
                    <ListItemIcon>
                        <LightModeOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
                    </ListItemIcon>
                    <ListItemText>Claro</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => handleThemeChange('dark')}
                    selected={theme === 'dark'}
                >
                    <ListItemIcon>
                        <DarkModeOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
                    </ListItemIcon>
                    <ListItemText>Escuro</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() => handleThemeChange('system')}
                    selected={theme === 'system'}
                >
                    <ListItemIcon>
                        <LaptopOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
                    </ListItemIcon>
                    <ListItemText>Sistema</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

export { ThemeSwitcher }

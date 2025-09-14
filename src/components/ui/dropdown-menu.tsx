'use client'

import {
    Box,
    Button,
    Menu,
    MenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    useTheme,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Compass, MenuIcon, Map, Smile } from 'lucide-react'
import { PromoveSmallLogo } from '@/src/promove-small-logo'
import { alpha } from '@mui/material/styles'

export const DropdownMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const theme = useTheme()

    const menuItems = [
        {
            onClick: () => router.push('/cursos'),
            label: 'Explorar cursos',
            icon: <Compass size={16} />,
        },
        {
            onClick: () => router.push('/sobre'),
            label: 'Sobre a plataforma',
            icon: <Smile size={16} />,
        },
        {
            onClick: () => router.push('/sobre'),
            label: 'Sobre o promove',
            icon: <PromoveSmallLogo size={16} borderColor="#fff" />,
        },
        {
            onClick: () => router.push('/roadmap'),
            label: 'Roadmap',
            icon: <Map size={16} />,
        },
    ]

    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            <Button
                id="dropdown-menu"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    width: '2.5rem',
                    height: '2.5rem',
                    minWidth: '2.5rem', // força ser quadrado
                    padding: 0, // remove padding interno
                    '&:hover': {
                        width: '2.5rem',
                        height: '2.5rem',
                        minWidth: '2.5rem',
                        backgroundColor: (theme) =>
                            alpha(theme.palette.text.primary, 0.1),
                    },
                }}
            >
                <MenuIcon color={theme.palette.text.primary} size={24} />
            </Button>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{ list: { 'aria-labelledby': 'user-menu-button' } }}
            >
                <Box sx={{ width: 250 }}>
                    <MenuList dense>
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.label}
                                onClick={item.onClick}
                                sx={{ px: 2, py: 1 }}
                            >
                                <ListItemIcon
                                    sx={{ minWidth: 20, color: 'inherit' }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        ))}
                    </MenuList>
                </Box>
            </Menu>
        </>
    )
}

'use client'

import {
    Avatar,
    Box,
    Button,
    Divider,
    Menu,
    MenuItem,
    MenuList,
    Typography,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { createClient } from '../common/lib/supabase/client'
import { useUser } from '../common/contexts/UserContext'
import {
    Sun,
    Moon,
    Laptop,
    Check,
    Settings,
    LogOut,
    Calendar,
    BookOpen,
    Compass,
} from 'lucide-react'
import { useThemeMode } from '../common/contexts/ThemeProvider'

export const UserDropdown = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { user, profile } = useUser()
    const [mounted, setMounted] = useState(false)
    const { mode, setMode } = useThemeMode()
    const router = useRouter()

    const logout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
    }

    const settings = () => redirect('/user/perfil')

    const menuItems = [
        {
            onClick: settings,
            label: 'Configurações',
            icon: <Settings size={16} />,
        },
        {
            onClick: () => router.push('/meus-cursos'),
            label: 'Meus cursos',
            icon: <BookOpen size={16} />,
        },
        {
            onClick: () => router.push('/calendar'),
            label: 'Calendário',
            icon: <Calendar size={16} />,
        },
        {
            onClick: () => router.push('/explore'),
            label: 'Explorar cursos',
            icon: <Compass size={16} />,
        },
    ]

    const themes = [
        { value: 'light', label: 'Light', icon: <Sun size={16} /> },
        { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
        { value: 'system', label: 'System', icon: <Laptop size={16} /> },
    ] as const

    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    function stringToColor(string: string) {
        let hash = 0
        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }
        let color = '#'
        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        return color
    }

    function stringAvatar(name: string) {
        return {
            sx: { bgcolor: stringToColor(name) },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            <Button
                id="user-menu-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {profile?.user_image ? (
                    <Avatar src={profile.user_image} />
                ) : (
                    <Avatar
                        {...stringAvatar(
                            `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`
                        )}
                    />
                )}
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
                        {/* Header */}
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography variant="body2" fontWeight={500}>
                                {profile?.first_name} {profile?.last_name}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {user?.email}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Menu principal */}
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

                        <Divider />

                        {/* Tema */}
                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 0.5 }}
                            >
                                Modo de exibição
                            </Typography>
                            {themes.map((item) => (
                                <MenuItem
                                    key={item.value}
                                    onClick={() => setMode(item.value)}
                                    selected={mode === item.value}
                                    sx={{ px: 2, py: 1 }}
                                >
                                    <ListItemIcon
                                        sx={{ minWidth: 20, color: 'inherit' }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                    {mode === item.value && (
                                        <Check
                                            size={16}
                                            style={{ marginLeft: 'auto' }}
                                        />
                                    )}
                                </MenuItem>
                            ))}
                        </Box>

                        <Divider />

                        {/* Logout */}
                        <MenuItem onClick={logout} sx={{ px: 2, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                                <LogOut size={16} />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </MenuItem>
                    </MenuList>
                </Box>
            </Menu>
        </>
    )
}

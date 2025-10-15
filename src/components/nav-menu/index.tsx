'use client'

import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    MenuList,
    Paper,
    Box,
} from '@mui/material'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import { useTheme } from 'next-themes'
import { useEffect, useState, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/common/contexts/user-context'
import { ENDPOINTS } from '@/common/lib/endpoints'
import { createClient } from '@/common/lib/supabase/client'

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: 'primary.main',
            width: 32,
            height: 32,
            fontSize: 14,
        },
        children: name
            .split(' ')
            .map((n) => n[0])
            .join(''),
    }
}

const NavMenu = () => {
    const [mounted, setMounted] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { theme, setTheme } = useTheme()
    const { user, loggedIn, profile } = useUser()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleNavigation = (path: string) => {
        router.push(path)
        handleClose()
    }

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push(ENDPOINTS.AUTH.LOGIN)
        handleClose()
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

    const getAvatarProps = () => {
        if (profile?.user_image) {
            return {
                src: profile.user_image,
                sx: { width: 40, height: 40 },
            }
        }
        if (profile?.first_name && profile?.last_name) {
            return stringAvatar(`${profile.first_name} ${profile.last_name}`)
        }
        return {
            sx: {
                bgcolor: 'primary.main',
                width: 32,
                height: 32,
                fontSize: 14,
            },
            children: '?',
        }
    }

    return (
        <>
            <IconButton
                size="small"
                onClick={handleClick}
                sx={{ color: 'text.secondary' }}
                aria-label="change theme"
            >
                <Avatar {...getAvatarProps()} />
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
                slotProps={{
                    paper: {
                        sx: {
                            width: 240,
                            maxWidth: '100%',
                            '& .MuiList-root': {
                                py: 0,
                            },
                        },
                    },
                }}
            >
                <Paper sx={{ width: '100%' }}>
                    <MenuList disablePadding>
                        {loggedIn ? (
                            <Box>
                                <Box sx={{ px: 2.5, py: 2 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {profile?.first_name}{' '}
                                        {profile?.last_name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            mt: 0.5,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {user?.email}
                                    </Typography>
                                </Box>
                                <Divider />
                                <MenuItem
                                    sx={{ pb: 1, pt: 2 }}
                                    onClick={() =>
                                        handleNavigation(ENDPOINTS.USER.PROFILE)
                                    }
                                >
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <SettingsOutlinedIcon
                                            sx={{ fontSize: ICON_SIZE }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Configurações"
                                        slotProps={{
                                            primary: { fontSize: 14 },
                                        }}
                                    />
                                </MenuItem>
                                <MenuItem
                                    sx={{ py: 1 }}
                                    onClick={() =>
                                        handleNavigation(ENDPOINTS.USER.COURSES)
                                    }
                                >
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <BookOutlinedIcon
                                            sx={{ fontSize: ICON_SIZE }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Meus cursos"
                                        slotProps={{
                                            primary: { fontSize: 14 },
                                        }}
                                    />
                                </MenuItem>
                                <MenuItem
                                    sx={{ py: 1 }}
                                    onClick={() =>
                                        handleNavigation(
                                            ENDPOINTS.USER.CALENDAR
                                        )
                                    }
                                >
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CalendarTodayOutlinedIcon
                                            sx={{ fontSize: ICON_SIZE }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Calendário"
                                        slotProps={{
                                            primary: { fontSize: 14 },
                                        }}
                                    />
                                </MenuItem>

                                <Divider />
                            </Box>
                        ) : null}

                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 12,
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                    color: 'text.secondary',
                                }}
                            >
                                Modo de exibição
                            </Typography>
                        </Box>
                        <MenuItem
                            onClick={() => handleThemeChange('light')}
                            selected={theme === 'light'}
                            sx={{ py: 1 }}
                        >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <LightModeOutlinedIcon
                                    sx={{ fontSize: ICON_SIZE }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Claro"
                                slotProps={{
                                    primary: { fontSize: 14 },
                                }}
                            />
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleThemeChange('dark')}
                            selected={theme === 'dark'}
                            sx={{ py: 1 }}
                        >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <DarkModeOutlinedIcon
                                    sx={{ fontSize: ICON_SIZE }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Escuro"
                                slotProps={{
                                    primary: { fontSize: 14 },
                                }}
                            />
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleThemeChange('system')}
                            selected={theme === 'system'}
                            sx={{ py: 1 }}
                        >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <LaptopOutlinedIcon
                                    sx={{ fontSize: ICON_SIZE }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Sistema"
                                slotProps={{
                                    primary: { fontSize: 14 },
                                }}
                            />
                        </MenuItem>

                        <Divider />
                        <MenuItem sx={{ pt: 1, pb: 2 }} onClick={handleLogout}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <LogoutOutlinedIcon
                                    sx={{ fontSize: ICON_SIZE }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Sair"
                                slotProps={{
                                    primary: { fontSize: 14 },
                                }}
                            />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Menu>
        </>
    )
}

export { NavMenu }

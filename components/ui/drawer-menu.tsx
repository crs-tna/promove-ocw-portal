'use client'
import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Avatar, Chip, Grid, Typography } from '@mui/material'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

export default function DrawerMenu() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                    {
                        mr: 2,
                    },
                    open && { display: 'none' },
                ]}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '1rem',
                    }}
                >
                    <Avatar>JS</Avatar>
                    <Typography>John Smith</Typography>
                    <Typography sx={{ fontSize: '14px' }}>
                        johns@ic.ufrj.br
                    </Typography>
                    <Grid>
                        <Chip
                            label="graduando"
                            size="small"
                            sx={{
                                fontSize: '12px',
                                width: 'fit-content',
                                padding: '4px',
                            }}
                        />
                        <Chip
                            label="ccmn"
                            size="small"
                            sx={{
                                fontSize: '12px',
                                width: 'fit-content',
                                padding: '4px',
                            }}
                        />
                        <Chip
                            label="IC"
                            size="small"
                            sx={{
                                fontSize: '12px',
                                width: 'fit-content',
                                padding: '4px',
                            }}
                        />
                    </Grid>
                </Box>

                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                        (text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    )
}

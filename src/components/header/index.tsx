'use client'
import Link from 'next/link'
import { AppBar, Toolbar, Box, Container, Typography, Avatar } from '@mui/material'
import { NavMenu } from '../nav-menu/index'
import { useUser } from '@/common/contexts/user-context'
import { PromoveLogo } from '../promove-logo'

export default function Header() {
    const { loggedIn } = useUser()

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
            }}
        >
            <Container
                maxWidth={false}
                sx={{ maxWidth: 'calc(100vw - 10rem)' }}
            >
                <Toolbar
                    sx={{ justifyContent: 'space-between', minHeight: '64px' }}
                >
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}
                    >
                        <Link
                            href={loggedIn ? '/user/home' : '/'}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'primary.main',
                                }}
                            >
                                <PromoveLogo />
                            </Typography>
                        </Link>
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}
                    >
                        {loggedIn && <NavMenu />}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

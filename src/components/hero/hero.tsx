'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
    Box,
    Container,
    Typography,
    Button,
    Stack
} from '@mui/material'

export function Hero() {
    
    return (
        <Box
            sx={{
                position: 'relative',
                height: 'calc(100vh - 4rem)',
                minHeight: '600px',
                overflow: 'hidden',
            }}
        >
            {/* Background Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: { xs: '100%', lg: '50%' },
                    height: '100%',
                    zIndex: -1,
                }}
            >
                <Image
                    src={'/images/hero.jpg'}
                    alt="hero image"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </Box>

            {/* Content Container */}
            <Container
                maxWidth="xl"
                sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    py: 4,
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', lg: '50%' },
                        minHeight: '335px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: { xs: 3, lg: 4 },
                        p: 4,
                        borderRadius: 2,
                        bgcolor: {
                            xs: 'rgba(255, 255, 255, 0.9)',
                            lg: 'transparent',
                        },
                        backdropFilter: { xs: 'blur(10px)', lg: 'none' },
                        boxShadow: { xs: 2, lg: 0 },
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontSize: {
                                xs: '1.5rem',
                                sm: '2rem',
                                lg: '2.5rem',
                            },
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            color: 'text.primary',
                            letterSpacing: '0.02em',
                        }}
                    >
                        Acesse e descubra tudo que você precisa para os seus
                        estudos.
                    </Typography>

                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            fontSize: { xs: '1rem', lg: '1.25rem' },
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: 'text.secondary',
                            fontFamily: 'Roboto, Arial, sans-serif',
                        }}
                    >
                        O OpenCourseWare da UFRJ é uma iniciativa educacional
                        que disponibiliza gratuitamente materiais de cursos
                        oferecidos por nossos professores e pesquisadores.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ mt: 2 }}
                    >
                        <Button
                            component={Link}
                            href="/auth/sign-up"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                borderRadius: 2,
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                    transform: 'translateY(-1px)',
                                },
                            }}
                        >
                            CADASTRE-SE
                        </Button>

                        <Button
                            component={Link}
                            href="/auth/login"
                            variant="outlined"
                            color="primary"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                borderRadius: 2,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    transform: 'translateY(-1px)',
                                },
                            }}
                        >
                            ENTRAR
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

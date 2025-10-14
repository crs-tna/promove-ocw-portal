import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Box,
    Container,
} from '@mui/material'

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ error: string }>
}) {
    const params = await searchParams

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100svh',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 3, md: 5 },
            }}
        >
            <Container maxWidth="xs">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Card
                        sx={{
                            boxShadow: 2,
                            borderRadius: 2,
                        }}
                    >
                        <CardHeader>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                }}
                            >
                                Desculpe, algo de errado aconteceu.
                            </Typography>
                        </CardHeader>
                        <CardContent>
                            {params?.error ? (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    Código do erro: {params.error}
                                </Typography>
                            ) : (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    Ocorreu um erro não especificado.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    )
}

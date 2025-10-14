import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Box,
    Container,
} from '@mui/material'

export default function Page() {
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
                                    mb: 1
                                }}
                            >
                                Obrigado por se cadastrar!
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                Verifique seu e-mail para confirmar
                            </Typography>
                        </CardHeader>
                        <CardContent>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.875rem',
                                }}
                            >
                                Você se registrou com sucesso. Por favor,
                                verifique seu e-mail para confirmar sua conta
                                antes de entrar.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    )
}

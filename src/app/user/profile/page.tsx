'use client'

import { Container, Typography } from '@mui/material'

export default function ProfilePage() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Perfil do Usuário
            </Typography>
            <Typography variant="body1">
                Esta página está em desenvolvimento.
            </Typography>
        </Container>
    )
}
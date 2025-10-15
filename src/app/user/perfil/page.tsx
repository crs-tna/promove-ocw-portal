'use client'

import ProfilePage from '@/components/profile-page.tsx'
import { Container, Typography } from '@mui/material'

export default function UserProfilePage() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <ProfilePage />
        </Container>
    )
}
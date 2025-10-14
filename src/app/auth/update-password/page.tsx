import { Box, Container } from '@mui/material'
import { UpdatePasswordForm } from '../../../components/update-password-form'

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
                <UpdatePasswordForm />
            </Container>
        </Box>
    )
}

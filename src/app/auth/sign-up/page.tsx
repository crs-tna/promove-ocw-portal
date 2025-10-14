import { Box, Container } from '@mui/material'
import { SignUpForm } from '../../../components/sign-up-form'

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
            <Container maxWidth="sm">
                <SignUpForm />
            </Container>
        </Box>
    )
}

import { Box, Typography, Divider, Link as MuiLink } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: 1,
                borderColor: 'divider',
                mx: 'auto',
                textAlign: 'center',
                gap: 4,
                py: 8,
                px: 2
            }}
        >
            <Typography variant="body2">Powered by PROMOVE</Typography>
            <Divider orientation="vertical" flexItem sx={{ height: '24px' }} />
            <Typography variant="body2">
                <MuiLink
                    href="mailto:promove.ufrj@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    <EmailIcon sx={{ fontSize: '16px' }} />
                    promove.ufrj@gmail.com
                </MuiLink>
            </Typography>
            <Typography variant="body2">
                <MuiLink
                    href="https://instagram.com/promove.ufrj"
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    <InstagramIcon sx={{ fontSize: '16px' }} />
                    @promove.ufrj
                </MuiLink>
            </Typography>
        </Box>
    )
}

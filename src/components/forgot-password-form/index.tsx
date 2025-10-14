'use client'

import { createClient } from '../../common/lib/supabase/client'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        try {
            // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            })
            if (error) throw error
            setSuccess(true)
        } catch (error: unknown) {
            setError(
                error instanceof Error ? error.message : 'An error occurred'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3 
            }} 
            className={className}
            {...props}
        >
            {success ? (
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                    <CardHeader>
                        <Typography 
                            variant="h4" 
                            component="h1"
                            sx={{ 
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                mb: 1
                            }}
                        >
                            Check Your Email
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ color: 'text.secondary' }}
                        >
                            Password reset instructions sent
                        </Typography>
                    </CardHeader>
                    <CardContent>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'text.secondary',
                                fontSize: '0.875rem'
                            }}
                        >
                            If you registered using your email and password, you
                            will receive a password reset email.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                    <CardHeader>
                        <Typography 
                            variant="h4" 
                            component="h1"
                            sx={{ 
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                mb: 1
                            }}
                        >
                            Reset Your Password
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ color: 'text.secondary' }}
                        >
                            Type in your email and we&apos;ll send you a link to
                            reset your password
                        </Typography>
                    </CardHeader>
                    <CardContent>
                        <Box 
                            component="form" 
                            onSubmit={handleForgotPassword}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                        >
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!error}
                                variant="outlined"
                            />
                            
                            {error && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    {error}
                                </Alert>
                            )}
                            
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                                sx={{ mt: 2 }}
                            >
                                {isLoading ? 'Sending...' : 'Send reset email'}
                            </Button>
                            
                            <Typography 
                                variant="body2" 
                                align="center"
                                sx={{ mt: 2 }}
                            >
                                Already have an account?{' '}
                                <Link
                                    href="/auth/login"
                                    style={{
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '4px',
                                        color: 'inherit'
                                    }}
                                >
                                    Login
                                </Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    )
}

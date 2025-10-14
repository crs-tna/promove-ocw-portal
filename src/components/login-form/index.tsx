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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            // Update this route to redirect to an authenticated route. The user already has an active session.
            router.push("/user/home")
            router.refresh()
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
                        Entrar
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ color: 'text.secondary' }}
                    >
                        Digite seu e-mail abaixo para entrar na sua conta
                    </Typography>
                </CardHeader>
                <CardContent>
                    <Box 
                        component="form" 
                        onSubmit={handleLogin}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
                        <TextField
                            id="email"
                            label="E-mail"
                            type="email"
                            placeholder="m@example.com"
                            required
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                            variant="outlined"
                        />
                        
                        <Box>
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 1
                                }}
                            >
                                <Typography 
                                    component="label" 
                                    htmlFor="password"
                                    variant="body2"
                                    sx={{ fontWeight: 500 }}
                                >
                                    Senha
                                </Typography>
                                <Link
                                    href="/auth/forgot-password"
                                    style={{
                                        fontSize: '0.875rem',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '4px',
                                        color: 'inherit'
                                    }}
                                >
                                    Esqueceu sua senha?
                                </Link>
                            </Box>
                            <TextField
                                id="password"
                                type="password"
                                required
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!error}
                                variant="outlined"
                            />
                        </Box>
                        
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
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                        
                        <Typography 
                            variant="body2" 
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            Não possui uma conta?{' '}
                            <Link
                                href="/auth/sign-up"
                                style={{
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px',
                                    color: 'inherit'
                                }}
                            >
                                Registre-se
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

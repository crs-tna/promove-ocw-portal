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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function UpdatePasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error
            // Update this route to redirect to an authenticated route. The user already has an active session.
            router.push('/protected')
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
                        Atualize sua senha
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ color: 'text.secondary' }}
                    >
                        Por favor digite sua nova senha abaixo
                    </Typography>
                </CardHeader>
                <CardContent>
                    <Box 
                        component="form" 
                        onSubmit={handleUpdatePassword}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
                        <TextField
                            id="password"
                            label="Nova senha"
                            type="password"
                            placeholder="Digite sua nova senha"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error}
                            variant="outlined"
                            helperText="Digite uma senha segura com pelo menos 6 caracteres"
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
                            {isLoading ? 'Salvando...' : 'Salvar nova senha'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

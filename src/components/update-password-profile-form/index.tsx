'use client'

import { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Divider,
} from '@mui/material'
import { createClient } from '../../common/lib/supabase/client'

export function UpdatePasswordProfileForm() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.updateUser({ password })
            if (error) throw error
            // Update this route to redirect to an authenticated route. The user already has an active session.
        } catch (error: unknown) {
            setError(
                error instanceof Error ? error.message : 'An error occurred'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                    Atualize sua senha
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Por favor digite sua nova senha abaixo.
                </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box component="form" onSubmit={handleForgotPassword} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    id="password"
                    label="Nova senha"
                    type="password"
                    placeholder="Digite sua nova senha"
                    required
                    fullWidth
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                    startIcon={isLoading ? <CircularProgress size={16} /> : null}
                    sx={{ 
                        mt: 2,
                        minHeight: 48,
                        bgcolor: '#ea580c',
                        '&:hover': {
                            bgcolor: '#c2410c',
                        }
                    }}
                >
                    {isLoading ? 'Salvando...' : 'Salvar nova senha'}
                </Button>
            </Box>
        </Box>
    )
}

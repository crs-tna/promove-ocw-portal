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
    FormControlLabel,
    Checkbox,
    Collapse,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SignUpForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [email, setEmail] = useState('')
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [isStudent, setIsStudent] = useState<boolean>(false)
    const [password, setPassword] = useState('')
    const [dre, setDre] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        if (password !== repeatPassword) {
            setError('As senhas estão diferentes')
            setIsLoading(false)
            return
        }

        try {
            const { data: userData, error: authError } =
                await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/protected`,
                    },
                })

            if (authError) throw authError

            const user = userData.user

            if (user) {
                const { error: insertError } = await supabase
                    .from('users')
                    .insert({
                        id: user.id,
                        first_name: userFirstName,
                        last_name: userLastName,
                        dre: isStudent ? dre : null,
                        role: isStudent ? 'student' : 'guest',
                    })

                if (insertError) throw insertError
            }
            router.push('/auth/sign-up-success')
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
                        Criar nova conta
                    </Typography>
                </CardHeader>
                <CardContent>
                    <Box 
                        component="form" 
                        onSubmit={handleSignUp}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="email@exemplo.com"
                            required
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!error}
                            variant="outlined"
                        />

                        <TextField
                            id="userFirstName"
                            label="Nome"
                            type="text"
                            required
                            fullWidth
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                            error={!!error}
                            variant="outlined"
                        />

                        <TextField
                            id="userLastName"
                            label="Sobrenome"
                            type="text"
                            required
                            fullWidth
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                            error={!!error}
                            variant="outlined"
                        />

                        <TextField
                            id="password"
                            label="Senha"
                            type="password"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!error}
                            variant="outlined"
                            helperText="Digite uma senha segura com pelo menos 6 caracteres"
                        />

                        <TextField
                            id="repeat-password"
                            label="Repita a senha"
                            type="password"
                            required
                            fullWidth
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            error={!!error}
                            variant="outlined"
                        />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isStudent}
                                        onChange={(e) => setIsStudent(e.target.checked)}
                                        name="isStudent"
                                    />
                                }
                                label="Sou estudante da UFRJ"
                                sx={{ mb: 1 }}
                            />
                            
                            <Collapse in={isStudent}>
                                <TextField
                                    id="dre"
                                    label="DRE"
                                    type="text"
                                    placeholder="123456789"
                                    required={isStudent}
                                    fullWidth
                                    value={dre}
                                    onChange={(e) => setDre(e.target.value)}
                                    error={!!error}
                                    variant="outlined"
                                    helperText="Digite seu número de DRE da UFRJ"
                                />
                            </Collapse>
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
                            {isLoading ? 'Criando conta...' : 'Criar conta'}
                        </Button>
                        
                        <Typography 
                            variant="body2" 
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            Já possui uma conta?{' '}
                            <Link
                                href="/auth/login"
                                style={{
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '4px',
                                    color: 'inherit'
                                }}
                            >
                                Entrar
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

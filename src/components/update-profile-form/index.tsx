'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Avatar,
    Box,
    IconButton,
    Alert,
    Divider,
    CircularProgress,
} from '@mui/material'
import { updateUserProfile } from '../../common/lib/data'
import { UpdatePasswordProfileForm } from '../update-password-profile-form'

interface UpdateProfileFormProps {
    onClose: () => void
    userFirstName: string
    userLastName: string
    userId: string
}

export function UpdateProfileForm({
    onClose,
    userFirstName,
    userLastName,
    userId,
}: UpdateProfileFormProps) {
    const [firstName, setFirstName] = useState(userFirstName)
    const [lastName, setLastName] = useState(userLastName)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            await updateUserProfile(
                firstName,
                lastName,
                userId,
                avatarFile ?? undefined
            )
        } catch (error: unknown) {
            console.error(error)
            setError(error instanceof Error ? error.message : 'Ocorreu um erro')
        } finally {
            setIsLoading(false)
            if (onClose) {
                onClose()
            }
        }
    }

    return (
        <Dialog 
            open={true} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        Atualize os dados do perfil
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Typography variant="h6">×</Typography>
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Atualize seu nome e foto de perfil.
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Primeiro Nome"
                        id="first_name"
                        type="text"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <TextField
                        label="Sobrenome"
                        id="last_name"
                        type="text"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    {/* Upload da imagem */}
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Foto de Perfil
                        </Typography>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                console.log('Arquivo selecionado:', file)
                                setAvatarFile(file ?? null)
                                if (file) {
                                    setPreviewUrl(URL.createObjectURL(file))
                                }
                            }}
                            style={{ 
                                width: '100%', 
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />

                        {/* Preview da imagem */}
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Avatar
                                src={previewUrl || undefined}
                                sx={{
                                    width: 96,
                                    height: 96,
                                    border: 1,
                                    borderColor: 'divider',
                                    boxShadow: 1,
                                }}
                            >
                                <Typography variant="h3" component="div">
                                    👤
                                </Typography>
                            </Avatar>
                        </Box>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={16} /> : null}
                    sx={{ minWidth: 120 }}
                >
                    {isLoading ? 'Atualizando...' : 'Atualizar'}
                </Button>
            </DialogActions>

            <Divider />
            <Box sx={{ p: 2 }}>
                <UpdatePasswordProfileForm />
            </Box>
        </Dialog>
    )
}

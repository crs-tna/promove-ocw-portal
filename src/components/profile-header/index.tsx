import React from 'react'
import {
    Toolbar,
    Typography,
    Button,
    Box,
    Avatar,
    Breadcrumbs,
    Paper,
} from '@mui/material'

interface ProfileHeaderProps {
    onUpdate: () => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onUpdate }) => {
    return (
        <Box sx={{ mb: 4 }}>
            {/* Main Header */}
            <Paper 
                elevation={1} 
                sx={{ 
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    borderRadius: 0,
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Toolbar sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
                    {/* Left side - Title and description */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                width: 40,
                                height: 40,
                            }}
                        >
                            <Typography variant="h6" component="div">
                                👤
                            </Typography>
                        </Avatar>
                        <Box>
                            <Typography 
                                variant="h5" 
                                component="h1" 
                                fontWeight="bold"
                                sx={{ 
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' } 
                                }}
                            >
                                Perfil de Usuário
                            </Typography>
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    display: { xs: 'none', sm: 'block' } 
                                }}
                            >
                                Gerencie os seus dados de perfil
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right side - Actions */}
                    <Button
                        variant="contained"
                        onClick={onUpdate}
                        sx={{
                            bgcolor: '#ea580c',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#c2410c',
                            },
                        }}
                    >
                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                            Atualizar Perfil
                        </Box>
                        <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                            Editar
                        </Box>
                    </Button>
                </Toolbar>

                {/* Breadcrumb section */}
                <Box 
                    sx={{ 
                        borderTop: 1,
                        borderColor: 'divider',
                        bgcolor: 'grey.50',
                        px: { xs: 2, sm: 3, lg: 4 },
                        py: 1,
                    }}
                >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography variant="body2" color="text.secondary">
                            Perfil
                        </Typography>
                    </Breadcrumbs>
                </Box>
            </Paper>
        </Box>
    )
}

export default ProfileHeader

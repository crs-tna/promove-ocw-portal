'use client'
import { redirect } from 'next/navigation'
import { useUser } from '../../common/contexts/user-context'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    Box,
    Container,
    CircularProgress,
} from '@mui/material'
import ProfileHeader from '../profile-header'
import { UpdateProfileForm } from '../update-profile-form'

export default function ProfilePage() {
    const userDetails = useUser()
    const [showModal, setShowModal] = useState(false)

    if (userDetails.loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
                <Typography variant="body1" sx={{ ml: 2 }}>
                    Carregando perfil...
                </Typography>
            </Box>
        )
    }

    if (!userDetails.loggedIn) {
        redirect('/auth/login')
    }

    const toggleModal = async () => {
        setShowModal(!showModal)
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <ProfileHeader onUpdate={toggleModal} />

            {/* Imagem de Perfil */}
            <Box display="flex" flexDirection="column" alignItems="center" my={6}>
                <Avatar
                    src={userDetails.profile?.user_image || undefined}
                    alt="Profile"
                    sx={{
                        width: 192,
                        height: 192,
                        border: (theme) => `2px solid ${theme.palette.divider}`,
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h1" component="div">
                        👤
                    </Typography>
                </Avatar>
            </Box>

            {/* Dados Pessoais */}
            <Box sx={{ mb: 5 }}>
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                    gap: 3 
                }}>
                    <ProfileInfo
                        label="Nome"
                        value={`${userDetails.profile?.first_name || ''} ${userDetails.profile?.last_name || ''}`}
                    />
                    <ProfileInfo
                        label="Email"
                        value={userDetails.user?.email ?? ''}
                    />
                    <ProfileInfo
                        label="Função"
                        value={userDetails.role ?? ''}
                    />
                    {userDetails.profile?.dre && (
                        <ProfileInfo
                            label="DRE"
                            value={userDetails.profile.dre}
                        />
                    )}
                </Box>
            </Box>

            {/* Estatísticas */}
            <Box sx={{ mb: 5 }}>
                <Card>
                    <CardHeader>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Estatísticas de Cursos
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Dados sobre os cursos
                        </Typography>
                    </CardHeader>
                    <CardContent>
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { 
                                xs: '1fr', 
                                sm: '1fr 1fr', 
                                md: '1fr 1fr 1fr' 
                            }, 
                            gap: 3 
                        }}>
                            <StatCard title="Cursos Concluídos" value="2" />
                            <StatCard title="Cursos Inscritos" value="10" />
                            <StatCard title="Progresso Geral" value="75%" />
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Modal */}
            {showModal && (
                <UpdateProfileForm
                    onClose={toggleModal}
                    userFirstName={userDetails.profile?.first_name ?? ''}
                    userLastName={userDetails.profile?.last_name ?? ''}
                    userId={userDetails.user?.id ?? ''}
                />
            )}
        </Container>
    )
}

function ProfileInfo({ label, value }: { label: string; value: string }) {
    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {label}
                </Typography>
                <Typography variant="h6" component="h3" fontWeight="medium">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" component="h3" fontWeight="bold">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    )
}

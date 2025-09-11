'use client'
import { redirect } from 'next/navigation'
import { useUser } from '@/src/common/contexts/UserContext'
import { useState } from 'react'
import { UpdateProfileForm } from './update-profile-form'
import ProfileHeader from './profile-header'
import { ThemeProvider } from 'next-themes'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import { User } from 'lucide-react'

export default function ProfilePage() {
    const userDetails = useUser()
    const [showModal, setShowModal] = useState(false)

    if (userDetails.loading) return <p className="">Carregando perfil...</p>
    if (!userDetails.loggedIn) {
        redirect('/auth/login')
    }

    const toggleModal = async () => {
        setShowModal(!showModal)
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="min-w-[600px] w-4/5 mx-auto">
                {/* Header */}
                <ProfileHeader onUpdate={toggleModal} />

                {/* Imagem de Perfil */}
                <div className="flex flex-col items-center my-6">
                    {/* Avatar customizado */}
                    <div className="flex justify-center mt-4">
                        {userDetails.profile?.user_image ? (
                            <div>
                                <img
                                    src={userDetails.profile?.user_image}
                                    alt="Preview"
                                    className="w-48 h-48 rounded-full object-cover border shadow"
                                />
                            </div>
                        ) : (
                            <User
                                className="w-48 h-48 rounded-full object-cover border shadow text-gray-500"
                                strokeWidth={1.5}
                            />
                        )}
                    </div>
                </div>

                {/* Dados Pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mx-auto px-6 py-8">
                    <ProfileInfo
                        label="Nome"
                        value={`${userDetails.profile?.first_name} ${userDetails.profile?.last_name}`}
                    />
                    <ProfileInfo
                        label="Email"
                        value={userDetails.user?.email ?? ''}
                    />
                    <ProfileInfo
                        label="Função"
                        value={userDetails.role ?? ''}
                    />
                </div>

                {/* Estatísticas */}
                <div className="mb-10 mx-auto px-6 py-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Estaticas de Cursos
                            </CardTitle>
                            <CardDescription>
                                Dados sobre os cursos
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <StatCard title="Cursos Concluidos" value="2" />
                                <StatCard title="Cursos Inscritos" value="10" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Modal */}
                {showModal && (
                    <UpdateProfileForm
                        onClose={toggleModal}
                        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                        userFirstName={userDetails.profile?.first_name ?? ''}
                        userLastName={userDetails.profile?.last_name ?? ''}
                        userId={userDetails.user?.id ?? ''}
                    />
                )}
            </div>
        </ThemeProvider>
    )
}

function ProfileInfo({ label, value }: { label: string; value: string }) {
    return (
        <Card className="p-4">
            <CardDescription className="text-sm">{label}</CardDescription>
            <CardTitle className="text-lg font-semibold">{value}</CardTitle>
        </Card>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <Card className="p-6">
            <CardDescription className="text-sm">{title}</CardDescription>
            <CardTitle className="text-2xl font-semibold">{value}</CardTitle>
        </Card>
    )
}

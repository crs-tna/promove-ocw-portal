'use client'

import { cn } from '../common/lib/utils'
import { Button } from '@/src/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { useState } from 'react'
import { updateUserProfile } from '../common/lib/data'
import { UpdatePasswordProfileForm } from './update-password-profile-form'
import { User } from 'lucide-react'

interface UpdateProfileFormProps extends React.ComponentPropsWithoutRef<'div'> {
    onClose?: () => void
    userFirstName: string
    userLastName: string
    userId: string
}

export function UpdateProfileForm({
    className,
    onClose,
    userFirstName,
    userLastName,
    userId,
    ...props
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
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <div className="flex flex-row justify-between">
                        <CardTitle className="text-2xl">
                            Atualize os dados do perfil
                        </CardTitle>
                        <button onClick={onClose}>X</button>
                    </div>
                    <CardDescription>
                        Atualize seu nome e foto de perfil.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">
                                    Primeiro Nome
                                </Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Sobrenome</Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>

                            {/* Upload da imagem */}
                            <div className="grid gap-2">
                                <Label htmlFor="avatar">Foto de Perfil</Label>
                                <Input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        console.log(
                                            'Arquivo selecionado:',
                                            file
                                        ) // 👈 debug
                                        setAvatarFile(file ?? null)
                                        if (file) {
                                            setPreviewUrl(
                                                URL.createObjectURL(file)
                                            )
                                        }
                                    }}
                                />

                                {/* Preview da imagem */}
                                <div className="flex justify-center mt-4">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-full object-cover border shadow"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border shadow">
                                            <User className="w-12 h-12 text-gray-500" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Atualizando...' : 'Atualizar'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <UpdatePasswordProfileForm />
            </Card>
        </div>
    )
}

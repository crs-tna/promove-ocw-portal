import React from 'react'
import { cn } from '@/src/common/lib/utils'
import { Button } from '@/src/components/ui/button'
import { UserPen, User } from 'lucide-react'

interface ProfileHeaderProps {
    onUpdate: () => void
    className?: string
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    onUpdate,
    className,
}) => {
    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                className
            )}
        >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left side - Title and description */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-foreground sm:text-2xl">
                                    Perfil de Usuario
                                </h1>
                                <p className="hidden text-sm text-muted-foreground sm:block">
                                    Gerencie os seus dados de perfil
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center space-x-3">
                        <Button
                            onClick={onUpdate}
                            className="bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700"
                        >
                            <UserPen className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">
                                Atualizar Perfil
                            </span>
                            <span className="sm:hidden">Novo</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Optional: Breadcrumb or navigation could go here */}
            <div className="w-full border-t border-border/40 bg-muted/30 px-4 py-2 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Perfil</span>
                </div>
            </div>
        </header>
    )
}

export default ProfileHeader

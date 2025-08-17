import React from 'react'
import { cn } from '@/src/common/lib/utils'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import { Edit, Trash2, Users, Clock, Calendar, BookOpen } from 'lucide-react'

interface Course {
    id: number
    title: string
    description: string
    category: string
    duration: string
    students: number
    status: 'Ativo' | 'Rascunho' | 'Arquivado' | 'Pausado'
    created_at: string
}

interface CourseCardProps {
    course: Course
    onEdit: (course: Course) => void
    onDelete: (courseId: number) => void
    className?: string
}

const STATUS_CONFIG = {
    Ativo: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        icon: BookOpen,
    },
    Rascunho: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        icon: Edit,
    },
    Arquivado: {
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        icon: Clock,
    },
    Pausado: {
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        icon: Clock,
    },
} as const

const CourseCard: React.FC<CourseCardProps> = ({
    course,
    onEdit,
    onDelete,
    className,
}) => {
    const handleEdit = () => onEdit(course)
    const handleDelete = () => onDelete(course.id)

    const statusConfig = STATUS_CONFIG[course.status] || STATUS_CONFIG.Rascunho
    const StatusIcon = statusConfig.icon

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    return (
        <Card
            className={cn(
                'group hover:shadow-lg transition-all duration-200 hover:-translate-y-1',
                className
            )}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge
                                variant="secondary"
                                className={cn(
                                    'text-xs font-medium',
                                    statusConfig.color
                                )}
                            >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {course.status}
                            </Badge>
                        </div>
                        <CardTitle className="text-lg leading-6 truncate">
                            {course.title}
                        </CardTitle>
                        <CardDescription className="mt-1 line-clamp-2 text-sm">
                            {course.description}
                        </CardDescription>
                    </div>

                    <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleEdit}
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950"
                            title="Editar curso"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDelete}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                            title="Excluir curso"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-3">
                    {/* Categoria */}
                    <div className="flex items-center justify-between text-sm gap-3">
                        <span className="text-muted-foreground">
                            Categoria:
                        </span>
                        <span className="font-medium text-foreground truncate">
                            {course.category}
                        </span>
                    </div>

                    {/* Duração */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Duração:
                        </span>
                        <span className="font-medium text-foreground">
                            {course.duration} semanas
                        </span>
                    </div>

                    {/* Alunos */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Alunos:
                        </span>
                        <span className="font-medium text-foreground">
                            {course.students}
                        </span>
                    </div>

                    {/* Data de criação */}
                    <div className="flex items-center justify-between text-sm pt-1 border-t">
                        <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Criado em:
                        </span>
                        <span className="font-medium text-foreground">
                            {formatDate(course.created_at)}
                        </span>
                    </div>
                </div>

                {/* Actions (mobile fallback) */}
                <div className="flex gap-2 mt-4 sm:hidden">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                        className="flex-1"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseCard

import React from 'react'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import CourseCard from './course-card'

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

interface CourseListProps {
    courses: Course[]
    onEdit: (course: Course) => void
    onDelete: (courseId: number) => void
    onView: (courseId: number) => void // Adicionei esta prop
    onCreateNew: () => void
}

const CourseList: React.FC<CourseListProps> = ({
    courses,
    onEdit,
    onDelete,
    onView, // Adicionei aqui
    onCreateNew,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Meus Cursos</CardTitle>
                <CardDescription>
                    Gerencie seus cursos e conteúdo educacional
                </CardDescription>
            </CardHeader>

            <CardContent>
                {courses.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-gray-50 rounded-full">
                                <BookOpen className="h-12 w-12 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Nenhum curso criado ainda
                                </h3>
                                <p className="text-gray-600">
                                    Comece criando seu primeiro curso para
                                    oferecer conteúdo aos alunos.
                                </p>
                            </div>
                            <Button onClick={onCreateNew} className="mt-4">
                                <Plus className="h-4 w-4 mr-2" />
                                Criar Primeiro Curso
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onView={onView} // Passo a função para o CourseCard
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default CourseList
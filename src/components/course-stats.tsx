import React from 'react'
import { BookOpen, Users, Calendar, Edit3 } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'

interface Course {
    id: number
    title: string
    description: string
    category: string
    duration: string
    students: number
    status: string
    created_at: string
}

interface CourseStatsProps {
    courses: Course[]
}

const CourseStats: React.FC<CourseStatsProps> = ({ courses }) => {
    const totalStudents = courses.reduce(
        (sum, course) => sum + course.students,
        0
    )
    const activeCourses = courses.filter((c) => c.status === 'Ativo').length
    const draftCourses = courses.filter((c) => c.status === 'Rascunho').length

    const stats = [
        {
            title: 'Total de Cursos',
            value: courses.length,
            icon: BookOpen,
            description: 'Cursos criados',
        },
        {
            title: 'Total de Alunos',
            value: totalStudents,
            icon: Users,
            description: 'Estudantes inscritos',
        },
        {
            title: 'Cursos Ativos',
            value: activeCourses,
            icon: Calendar,
            description: 'Em andamento',
        },
        {
            title: 'Rascunhos',
            value: draftCourses,
            icon: Edit3,
            description: 'Em preparação',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                            <CardDescription className="text-xs text-muted-foreground">
                                {stat.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default CourseStats

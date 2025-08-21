'use client'

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Clock, Users, Calendar, Search } from 'lucide-react'

const categorias = [
    'Ciência de Dados e Engenharia de Dados',
    'Computação Científica',
    'Engenharia de Software',
    'Sistemas Computacionais e Comunicação',
    'Teoria da Computação',
]

type Course = {
    id: string | number
    title: string
    description: string
    category: string
    duration: string
    students?: number
    created_at: string
}

export default function CourseListClient({
    initialCourses,
}: {
    initialCourses: Course[]
}) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCourses = initialCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <>
            <div className="mb-6 space-y-4">
                <div className="relative w-full mx-auto">
                    <Input
                        type="text"
                        placeholder="Buscar curso..."
                        className="w-full bg-card pl-4 pr-10 py-2 h-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex justify-between flex-wrap">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-xs font-medium text-center leading-tight min-w-28 max-w-40"
                        >
                            {categoria}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                    <Card
                        key={course.id}
                        className="hover:shadow-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer"
                    >
                        <CardHeader className="pb-3">
                            <CardTitle className="text-card-foreground text-lg mb-2">
                                {course.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {course.description}
                            </p>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-card-foreground">
                                        Categoria:
                                    </span>
                                    <span className="text-sm text-muted-foreground text-right">
                                        {course.category}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-sm font-medium text-card-foreground">
                                            Duração:
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {course.duration}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-sm font-medium text-card-foreground">
                                            Alunos:
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {course.students || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-sm font-medium text-card-foreground">
                                            Criado em:
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(
                                            course.created_at
                                        ).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center col-span-full py-10">
                    <h2 className="text-xl font-semibold">
                        Nenhum curso encontrado
                    </h2>
                    <p className="text-muted-foreground">
                        Tente ajustar os termos da sua busca.
                    </p>
                </div>
            )}
        </>
    )
}

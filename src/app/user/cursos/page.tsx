'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import { ArrowLeft, Trash2, Users, Clock, Calendar, Tag } from 'lucide-react'
import { getCourseById, deleteCourse } from '@/src/common/lib/course'

interface Task {
    id: number
    title: string
    deadline?: string
}
interface Lesson {
    id: number
    title: string
    duration: string
    isPreview?: boolean
}
interface Course {
    id: number
    title: string
    description: string
    category: string
    duration: string
    status: 'Ativo' | 'Rascunho' | 'Arquivado' | 'Pausado'
    students: number
    created_at: string
    professor_name?: string
    updated_at?: string
    lessons?: Lesson[]
    progress?: number
    tasks: Task[]
}

const CourseViewPage: React.FC = () => {
    const searchParams = useSearchParams()
    const courseId = searchParams.get('courseId')
    const router = useRouter()
    const [course, setCourse] = useState<Course | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const mockActivities: Task[] = [
        {
            id: 1,
            title: 'Atividade de Introdução ao React',
            deadline: '2025-08-30',
        },
        {
            id: 2,
            title: 'Quiz sobre Componentes',
        },
        {
            id: 3,
            title: 'Projeto Final: Mini Aplicação',
            deadline: '2025-09-10',
        },
    ]
    const mockLessons: Lesson[] = [
        { id: 1, title: 'O que é React?', duration: '15 min', isPreview: true },
        { id: 2, title: 'Criando seu primeiro componente', duration: '25 min' },
        { id: 3, title: 'Props e Estado', duration: '30 min' },
        { id: 4, title: 'Ciclo de Vida e Hooks', duration: '40 min' },
    ]

    // Função para buscar o curso específico
    const fetchCourse = async () => {
        if (!courseId) {
            setError('ID do curso não fornecido.')
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const { data, error } = await getCourseById(courseId)

            if (error) {
                console.error('Erro ao buscar curso:', error)
                setError('Não foi possível carregar o curso. Tente novamente.')
            } else {
                setCourse(data[0])
                console.log('Curso carregado:', course, data[0])
                setError(null)
            }
        } catch (err) {
            console.error('Erro inesperado:', err)
            setError('Ocorreu um erro inesperado ao carregar o curso.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (courseId) {
            fetchCourse().then(() => {
                setCourse((prev) =>
                    prev
                        ? {
                              ...prev,
                              total_lessons: mockLessons.length,
                              progress: 60,
                              tasks: mockActivities,
                              lessons: mockLessons,
                          }
                        : null
                )
            })
        } else {
            // fallback inteiro
            setCourse({
                id: 999,
                title: 'Curso de React com Next.js',
                description:
                    'Aprenda os fundamentos do React e do Next.js com exemplos práticos.',
                category: 'Programação',
                duration: '12h',
                status: 'Ativo',
                students: 58,
                created_at: new Date().toISOString(),
                professor_name: 'Prof. João da Silva',
                updated_at: new Date().toISOString(),
                lessons: mockLessons,
                progress: 60,
                tasks: mockActivities,
            })
            setIsLoading(false)
        }
    }, [courseId])

    const handleDelete = async () => {
        if (!course || !confirm('Tem certeza que deseja excluir este curso?')) {
            return
        }

        const { error } = await deleteCourse(course.id)
        if (error) {
            alert('Ocorreu um erro ao excluir o curso.')
        } else {
            router.push('user/painel')
        }
    }

    const handleBack = () => {
        router.back()
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ativo':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            case 'Rascunho':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            case 'Arquivado':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            case 'Pausado':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    if (isLoading) {
        return (
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="min-w-[600px] w-4/5 mx-auto px-6 py-8">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            Carregando curso...
                        </p>
                    </div>
                </div>
            </ThemeProvider>
        )
    }

    if (error || !course) {
        return (
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="min-w-[600px] w-4/5 mx-auto px-6 py-8">
                    <div className="text-center py-20">
                        <p className="text-red-500 text-lg">
                            {error || 'Curso não encontrado'}
                        </p>
                        <button
                            onClick={handleBack}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-w-[600px] w-4/5 mx-auto px-6 py-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                title="Voltar"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div className="display: contents">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {course.title}
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}
                                    >
                                        {course.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                                Excluir
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Details */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Descrição do Curso
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {course.description ||
                                    'Nenhuma descrição disponível.'}
                            </p>
                        </div>

                        {/*Posts do curso */}
                        <div className="mt-6 rounded-xl border bg-card text-card-foreground shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Atividades
                            </h2>
                            <div className="text-gray-600 dark:text-gray-300">
                                {course.tasks ? (
                                    <p>
                                        Este curso contém {course.tasks.length}{' '}
                                        tarefas.
                                    </p>
                                ) : (
                                    <p>
                                        Nunhuma atividade encontrada para o
                                        curso.
                                    </p>
                                )}
                                {course.progress && (
                                    <div className="mt-4 space-y-3">
                                        {mockActivities?.map((act) => (
                                            <div
                                                key={act.id}
                                                className="p-3 border rounded-lg flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {act.title}
                                                    </p>
                                                </div>
                                                {act.deadline && (
                                                    <span className="text-xs text-gray-400">
                                                        Prazo:{' '}
                                                        {formatDate(
                                                            act.deadline
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Content Section */}
                        <div className="mt-6 rounded-xl border bg-card text-card-foreground shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Conteúdo do Curso
                            </h2>
                            <div className="text-gray-600 dark:text-gray-300">
                                {course.lessons?.length ? (
                                    <p>
                                        Este curso contém{' '}
                                        {course.lessons.length} aulas.
                                    </p>
                                ) : (
                                    <p>Conteúdo em desenvolvimento.</p>
                                )}
                                {course.progress && (
                                    <ul className="mt-4 space-y-2">
                                        {mockLessons?.map((lesson) => (
                                            <li
                                                key={lesson.id}
                                                className="flex justify-between items-center border p-2 rounded-lg"
                                            >
                                                <span>
                                                    {lesson.title}
                                                    {lesson.isPreview && (
                                                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                                            Preview
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {lesson.duration}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Stats */}
                        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                Informações do Curso
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Estudantes
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {course.students}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Duração
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {course.duration}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Tag className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Categoria
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {course.category}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Criado em
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {formatDate(course.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {course.updated_at && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Atualizado em
                                            </p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {formatDate(course.updated_at)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Professor Info (if available) */}
                        {course.professor_name && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                    Professor
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {course.professor_name}
                                </p>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                Ações Rápidas
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                    <Users className="h-4 w-4" />
                                    Gerenciar Estudantes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default CourseViewPage

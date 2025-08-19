'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Mudança aqui
import { ThemeProvider } from 'next-themes'
import CourseHeader from '@/src/components/course-header'
import CourseStats from '@/src/components/course-stats'
import CourseList from '@/src/components/course-list'
import CourseModal from '@/src/components/course-modal'
import { getProfessorCourses, deleteCourse } from '@/src/common/lib/course'
import { getUserIdByName } from '@/src/common/lib/users'

interface Course {
    id: number
    title: string
    description: string
    category: string
    duration: string
    status: 'Ativo' | 'Rascunho' | 'Arquivado' | 'Pausado'
    students: number
    created_at: string
}

interface FormData {
    title: string
    description: string
    category: string
    duration: string
    status: string
}

const CursosPage: React.FC = () => {
    const router = useRouter() // Hook do Next.js para navegação
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category: '',
        duration: '',
        status: 'Rascunho',
    })

    // Função para navegar para visualizar o curso
    const handleViewCourse = (courseId: number) => {
        router.push(`/user/cursos?courseId=${courseId}`)
    }

    const fetchCourses = async () => {
        setIsLoading(true)

        try {
            const userId = await getUserIdByName('Vitória')

            if (!userId || !userId.id) {
                setError('Usuário não encontrado.')
                setIsLoading(false)
                return
            }

            const { data, error } = await getProfessorCourses(userId.id)

            if (error) {
                console.error('Erro ao buscar cursos:', error)
                setError(
                    'Não foi possível carregar os cursos. Tente novamente.'
                )
            } else {
                setCourses(data || [])
                setError(null)
            }
        } catch (err) {
            console.error('Erro inesperado:', err)
            setError('Ocorreu um erro inesperado ao carregar os cursos.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: '',
            duration: '',
            status: 'Rascunho',
        })
        setEditingCourse(null)
        setShowModal(false)
    }

    const handleEdit = (course: Course) => {
        setEditingCourse(course)
        setFormData({
            title: course.title,
            description: course.description,
            category: course.category,
            duration: course.duration,
            status: course.status,
        })
        setShowModal(true)
    }

    const handleDelete = async (courseId: number) => {
        console.log(courseId)
        if (confirm('Tem certeza que deseja excluir este curso?')) {
            const { error } = await deleteCourse(courseId)
            if (error) {
                alert('Ocorreu um erro ao excluir o curso.')
            } else {
                await fetchCourses()
            }
        }
    }

    const handleCreateNew = () => {
        setEditingCourse(null)
        setFormData({
            title: '',
            description: '',
            category: '',
            duration: '',
            status: 'Rascunho',
        })
        setShowModal(true)
    }

    const handleModalSubmit = async () => {
        await fetchCourses()
        resetForm()
    }

    if (isLoading) {
        return <div className="text-center py-10">Carregando cursos...</div>
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="min-w-[600px] w-4/5 mx-auto">
                <CourseHeader onCreateNew={handleCreateNew} />

                <main className="w-[100%] mx-auto px-6 py-8">
                    <CourseStats courses={courses} />
                    <CourseList
                        courses={courses}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleViewCourse} // Mudança aqui
                        onCreateNew={handleCreateNew}
                    />
                </main>

                <CourseModal
                    isOpen={showModal}
                    editingCourse={editingCourse}
                    formData={formData}
                    onClose={resetForm}
                    onInputChange={handleInputChange}
                    onSubmit={handleModalSubmit}
                />
            </div>
        </ThemeProvider>
    )
}

export default CursosPage

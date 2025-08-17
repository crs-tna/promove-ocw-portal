'use client'

import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import CourseHeader from '@/src/components/course-header'
import CourseStats from '@/src/components/course-stats'
import CourseList from '@/src/components/course-list'
import CourseModal from '@/src/components/course-modal'
// 1. Importe todas as funções necessárias para as operações CRUD
import { getProfessorCourses, createCourse } from '@/src/common/lib/course'

// A interface do curso deve corresponder à estrutura de dados do Supabase
interface Course {
    id: number // ou string, dependendo do seu banco
    title: string
    description: string
    category: string
    duration: string
    status: string
    students_count?: number // Opcional, caso não tenha
    created_at: string
}

// A interface do formulário continua a mesma
interface FormData {
    title: string
    description: string
    category: string
    duration: string
    status: string
}

const CursosPage: React.FC = () => {
    // 2. O estado inicial dos cursos é um array vazio
    const [courses, setCourses] = useState<Course[]>([])
    // 3. Estados para gerenciar o carregamento e possíveis erros
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

    // 4. Função centralizada para buscar os cursos e atualizar o estado
    const fetchCourses = async () => {
        setIsLoading(true)
        const { data, error } = await getProfessorCourses()
        if (error) {
            console.error('Erro ao buscar cursos:', error)
            setError('Não foi possível carregar os cursos. Tente novamente.')
        } else {
            setCourses(data || [])
            setError(null)
        }
        setIsLoading(false)
    }

    // 5. useEffect para buscar os dados iniciais quando o componente é montado
    useEffect(() => {
        fetchCourses()
    }, []) // O array vazio [] garante que isso rode apenas uma vez

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

    // 6. handleSubmit agora é assíncrono para esperar as operações do banco
    const handleSubmit = async () => {
        if (
            !formData.title ||
            !formData.description ||
            !formData.category ||
            !formData.duration
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        let operationError = null

        if (editingCourse) {
            // Chama a função de update para o Supabase
            const { error } = await updateCourse(editingCourse.id, formData)
            operationError = error
        } else {
            // Chama a função de create para o Supabase
            const { error } = await createCourse(formData)
            operationError = error
        }

        if (operationError) {
            alert('Ocorreu um erro ao salvar o curso.')
        } else {
            // 7. Após sucesso, busca a lista atualizada e fecha o modal
            await fetchCourses()
            resetForm()
        }
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

    // 8. handleDelete também se torna assíncrono
    const handleDelete = async (courseId: number) => {
        if (confirm('Tem certeza que deseja excluir este curso?')) {
            const { error } = await deleteCourse(courseId)
            if (error) {
                alert('Ocorreu um erro ao excluir o curso.')
            } else {
                await fetchCourses() // Atualiza a lista após a exclusão
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

    // 9. Renderização condicional para estados de carregamento e erro
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
                        onCreateNew={handleCreateNew}
                    />
                </main>

                <CourseModal
                    isOpen={showModal}
                    editingCourse={editingCourse}
                    formData={formData}
                    onClose={resetForm}
                    onSubmit={handleSubmit}
                    onInputChange={handleInputChange}
                />
            </div>
        </ThemeProvider>
    )
}

export default CursosPage

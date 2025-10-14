'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
    Box,
    Container,
    CircularProgress,
    Alert
} from '@mui/material'
import { useUser } from '../../common/contexts/user-context'
import { getProfessorCourses, deleteCourse } from '../../common/lib/course'
import {
    Course,
    COURSE_STATUSES
} from '../../common/lib/types'
import CourseHeader from '../course-header'
import CourseStats from '../course-stats'
import CourseList from '../course-list'
import CourseModal from '../course-modal'

// Updated form interface to match database schema
interface FormData {
    title: string
    description: string
    category_ids: string[]
    duration: number
    status_id: number
}

const TeacherHomePage: React.FC = () => {
    const { user, loading: userLoading } = useUser()
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category_ids: [],
        duration: 4,
        status_id: COURSE_STATUSES.RASCUNHO.id,
    })

    // Função centralizada para buscar os cursos e atualizar o estado
    const fetchCourses = useCallback(async () => {
        if (!user?.id) {
            setError('Usuário não autenticado.')
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const { data, error } = await getProfessorCourses(user.id)

            if (error) {
                console.error('Erro ao buscar cursos:', error)
                setError('Não foi possível carregar os cursos. Tente novamente.')
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
    }, [user?.id])

    // useEffect para buscar os dados iniciais quando o componente é montado
    useEffect(() => {
        if (user?.id && !userLoading) {
            fetchCourses()
        }
    }, [user?.id, userLoading, fetchCourses])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | 
        { target: { name: string; value: unknown } }
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
            category_ids: [],
            duration: 4,
            status_id: COURSE_STATUSES.RASCUNHO.id,
        })
        setEditingCourse(null)
        setShowModal(false)
    }

    const handleEdit = (course: Course) => {
        setEditingCourse(course)
        setFormData({
            title: course.title,
            description: course.description || '',
            category_ids: [], // We'd need to fetch category associations
            duration: course.duration,
            status_id: course.status_id || COURSE_STATUSES.RASCUNHO.id,
        })
        setShowModal(true)
    }

    //handleDelete também se torna assíncrono
    const handleDelete = async (courseId: string) => {
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
            category_ids: [],
            duration: 4,
            status_id: COURSE_STATUSES.RASCUNHO.id,
        })
        setShowModal(true)
    }

    const handleModalSubmit = async () => {
        // Refresh the courses list after successful save
        await fetchCourses()

        // Close modal and reset form
        resetForm()
    }

    // Show loading state while user is loading or courses are loading
    if (userLoading || isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress size={60} />
            </Box>
        )
    }

    // Show error state
    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ textAlign: 'center' }}>
                    {error}
                </Alert>
            </Container>
        )
    }

    // Show message if user is not authenticated
    if (!user) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="warning" sx={{ textAlign: 'center' }}>
                    Por favor, faça login para acessar seus cursos.
                </Alert>
            </Container>
        )
    }

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <CourseHeader onCreateNew={handleCreateNew} />
            
            <Box sx={{ mt: 3 }}>
                <CourseStats courses={courses} />
                <CourseList
                    courses={courses}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCreateNew={handleCreateNew}
                />
            </Box>

            <CourseModal
                isOpen={showModal}
                editingCourse={editingCourse}
                formData={formData}
                onClose={resetForm}
                onInputChange={handleInputChange}
                onSubmit={handleModalSubmit}
            />
        </Container>
    )
}

export default TeacherHomePage

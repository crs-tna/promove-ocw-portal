import { randomUUID } from 'crypto'
import { createClient } from './supabase/client'

interface FormData {
    title: string
    description: string
    category: string
    duration: string
    status: string
}

const supabase = createClient()

export async function createCourse(dataCourse: FormData) {
    const { data, error } = await supabase.from('courses').insert({
        id: randomUUID,
        title: dataCourse.title,
        description: dataCourse.description,
        category: dataCourse.category,
        duration: dataCourse.duration,
        status: dataCourse.status,
    })

    if (error) {
        console.error('Erro ao criar curso:', error)
        return { error }
    }

    console.log('Curso criado com sucesso:', data)
    return { data }
}

export async function getAllCourses() {
    const { data, error } = await supabase.from('courses').select()

    if (error) {
        console.error('Erro ao recuperar cursos', error)
        return { error }
    }

    console.log('Cursos disponíveis', data)
    return { data }
}

export async function getProfessorCourses() {
    const { data, error } = await supabase
        .from('teaches')
        .select()
        .eq('teacher_id', 'd8c8aee9-15da-46a8-bb98-aa7d8dc80c75')

    if (error) {
        console.error('Erro ao criar curso:', error)
        return { error }
    }

    console.log('Curso criado com sucesso:', data)
    return { data }
}

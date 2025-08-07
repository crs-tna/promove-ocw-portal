// Create database interactions here and import them in client files

import { randomUUID } from 'crypto'
import { createClient } from './supabase/client'

const supabase = createClient()

export async function createCourse() {
    const { data, error } = await supabase.from('courses').insert({
        id: randomUUID,
        title: 'Modelagem Matemática',
        description:
            'Disciplina obrigatória do vigésimo período de Ciências da Computação',
    })

    if (error) {
        console.error('Erro ao criar curso:', error)
        return { error }
    }

    console.log('Curso criado com sucesso:', data)
    return { data }
}

// TODO: fetchUserDataById

// TODO: fetchCourseList

// TODO: fetchCourseByUser

// TODO: fetchCourseByProfessor

// TODO: fetchCourseById

// TODO: fetchContentByCourse

// TODO: come up with whatever else

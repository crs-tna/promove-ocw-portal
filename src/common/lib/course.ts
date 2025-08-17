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
    try {
        // Primeira consulta: buscar relacionamentos na tabela 'teaches'
        const { data: teachesData, error: teachesError } = await supabase
            .from('teaches')
            .select('course_id, teacher_id, created_at')
            .eq('teacher_id', 'd8c8aee9-15da-46a8-bb98-aa7d8dc80c75')

        if (teachesError) {
            console.error(
                'Erro ao buscar relacionamentos teaches:',
                teachesError
            )
            return { error: teachesError }
        }

        // Verificar se foram encontrados relacionamentos
        if (!teachesData || teachesData.length === 0) {
            console.log('Nenhum curso encontrado para este professor')
            return { data: [] }
        }

        // Extrair os IDs dos cursos
        const courseIds = teachesData.map((relation) => relation.course_id)

        // Segunda consulta: buscar os dados completos dos cursos
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .in('id', courseIds)

        if (error) {
            console.error('Erro ao buscar cursos:', error)
            return { error }
        }

        console.log('Cursos encontrados:', data)
        return { data }
    } catch (error) {
        console.error('Erro geral:', error)
        return { error: { message: 'Erro interno do servidor' } }
    }
}

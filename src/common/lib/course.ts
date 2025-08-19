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

export async function createCourse(dataCourse: FormData, id_professor: string) {
    const { data, error } = await supabase
        .from('courses')
        .insert({
            id: randomUUID,
            title: dataCourse.title,
            description: dataCourse.description,
            category: dataCourse.category,
            duration: dataCourse.duration,
            status: dataCourse.status,
        })
        .select()

    if (error) {
        console.error('Erro ao criar curso:', error)
        return { error }
    }

    // 2. Associar professor ao curso criado
    const { error: linkError } = await supabase
        .from('teaches') // nome da tabela de relacionamento
        .insert({
            course_id: data[0].id,
            teacher_id: id_professor,
        })

    if (linkError) {
        console.error('Erro ao associar professor:', linkError)
        return { error: linkError }
    }

    console.log('Curso criado e professor associado:', data[0].title)
    return { data: data[0] }
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

export async function getProfessorCourses(id_professor: string) {
    try {
        // Primeira consulta: buscar relacionamentos na tabela 'teaches'
        const { data: teachesData, error: teachesError } = await supabase
            .from('teaches')
            .select('course_id, teacher_id, created_at')
            .eq('teacher_id', id_professor) // id-vitoria

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

export async function deleteCourse(id_course: number) {
    const { data, error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id_course)

    if (error) {
        console.error('Erro ao deletar curso:', error)
        return { error }
    }

    console.log('Curso deletado com sucesso:', data)
    return { data }
}

export async function getCourseById(id_course: string) {
    const { data, error } = await supabase
        .from('courses')
        .select()
        .eq('id', id_course)

    if (error) {
        console.error('Erro ao retornar curso:', error)
        return { error }
    }

    console.log('Curso acessado com sucesso:', data)
    return { data }
}

export async function updateCourse(id: number, dataCourse: FormData) {
    const { data, error } = await supabase
        .from('courses')
        .update({
            title: dataCourse.title,
            description: dataCourse.description,
            category: dataCourse.category,
            duration: dataCourse.duration,
            status: dataCourse.status,
        })
        .eq('id', id)

    if (error) {
        console.error('Erro ao editar curso:', error)
        return { error }
    }

    console.log('Curso atualizado com sucesso:', data)
    return { data }
}

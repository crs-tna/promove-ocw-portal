import { randomUUID } from 'crypto'
import { createClient } from './supabase/client'
import { 
    Course, 
    DatabaseCourse, 
    Category,
    CourseStatus,
    CATEGORIES,
    COURSE_STATUSES 
} from './types'

interface CourseFormData {
    title: string
    description?: string
    category_ids: string[] // Array of category UUIDs
    duration: number
    status_id: number
    is_public?: boolean
    enrollment_key?: string
}

const supabase = createClient()

export async function createCourse(dataCourse: CourseFormData, id_professor: string) {
    // Create the course
    const courseData: DatabaseCourse = {
        id: randomUUID(),
        title: dataCourse.title,
        description: dataCourse.description,
        duration: dataCourse.duration,
        students: 0, // Initialize with 0 students
        status_id: dataCourse.status_id,
        is_public: dataCourse.is_public || false,
        enrollment_key: dataCourse.enrollment_key,
    }

    const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select()

    if (error) {
        console.error('Erro ao criar curso:', error)
        return { error }
    }

    const createdCourse = data[0]

    // Associate professor with the course
    const { error: linkError } = await supabase
        .from('teaches')
        .insert({
            course_id: createdCourse.id,
            teacher_id: id_professor,
        })

    if (linkError) {
        console.error('Erro ao associar professor:', linkError)
        return { error: linkError }
    }

    // Associate categories with the course
    if (dataCourse.category_ids && dataCourse.category_ids.length > 0) {
        const categoryAssociations = dataCourse.category_ids.map(categoryId => ({
            course_id: createdCourse.id,
            category_id: categoryId
        }))

        const { error: categoryError } = await supabase
            .from('courses_categories')
            .insert(categoryAssociations)

        if (categoryError) {
            console.error('Erro ao associar categorias:', categoryError)
            return { error: categoryError }
        }
    }

    console.log('Curso criado e professor associado:', createdCourse.title)
    return { data: createdCourse }
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

export async function deleteCourse(id_course: string) {
    // First, delete related records (courses are referenced by other tables)
    
    // Delete course-category associations
    await supabase
        .from('courses_categories')
        .delete()
        .eq('course_id', id_course)
    
    // Delete teacher associations
    await supabase
        .from('teaches')
        .delete()
        .eq('course_id', id_course)
    
    // Delete enrollments
    await supabase
        .from('enrolls')
        .delete()
        .eq('course_id', id_course)
    
    // Finally, delete the course
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

export async function updateCourse(id: string, dataCourse: CourseFormData) {
    // Update the course
    const updateData: Partial<DatabaseCourse> = {
        title: dataCourse.title,
        description: dataCourse.description,
        duration: dataCourse.duration,
        status_id: dataCourse.status_id,
        is_public: dataCourse.is_public,
        enrollment_key: dataCourse.enrollment_key,
    }

    const { data, error } = await supabase
        .from('courses')
        .update(updateData)
        .eq('id', id)
        .select()

    if (error) {
        console.error('Erro ao editar curso:', error)
        return { error }
    }

    // Update category associations if provided
    if (dataCourse.category_ids) {
        // First, delete existing category associations
        await supabase
            .from('courses_categories')
            .delete()
            .eq('course_id', id)

        // Then, insert new category associations
        if (dataCourse.category_ids.length > 0) {
            const categoryAssociations = dataCourse.category_ids.map(categoryId => ({
                course_id: id,
                category_id: categoryId
            }))

            const { error: categoryError } = await supabase
                .from('courses_categories')
                .insert(categoryAssociations)

            if (categoryError) {
                console.error('Erro ao atualizar categorias:', categoryError)
                return { error: categoryError }
            }
        }
    }

    console.log('Curso atualizado com sucesso:', data)
    return { data: data[0] }
}

// Helper functions for categories
export const getAllCategories = (): Category[] => {
  return Object.values(CATEGORIES);
};

export const getCategoryById = (id: string): Category | undefined => {
  return Object.values(CATEGORIES).find(category => category.id === id);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return Object.values(CATEGORIES).find(category => category.name === name);
};

// Helper functions for course statuses
export const getAllCourseStatuses = (): CourseStatus[] => {
  return Object.values(COURSE_STATUSES);
};

export const getCourseStatusById = (id: number): CourseStatus | undefined => {
  return Object.values(COURSE_STATUSES).find(status => status.id === id);
};

export const getCourseStatusByName = (name: string): CourseStatus | undefined => {
  return Object.values(COURSE_STATUSES).find(status => status.name === name);
};

// Additional helper functions for courses with relationships
export async function getCourseWithDetails(courseId: string) {
    const { data: course, error } = await supabase
        .from('courses')
        .select(`
            *,
            courses_status(id, name),
            courses_categories(
                categories(id, name)
            ),
            teaches(
                users(id, first_name, last_name, user_image)
            )
        `)
        .eq('id', courseId)
        .single()

    if (error) {
        console.error('Erro ao buscar detalhes do curso:', error)
        return { error }
    }

    return { data: course }
}

export async function getCoursesByCategory(categoryId: string) {
    const { data, error } = await supabase
        .from('courses_categories')
        .select(`
            courses(
                *,
                courses_status(id, name)
            )
        `)
        .eq('category_id', categoryId)

    if (error) {
        console.error('Erro ao buscar cursos por categoria:', error)
        return { error }
    }

    return { data: data.map(item => item.courses).filter(Boolean) }
}

export async function getCoursesWithEnrollmentCount() {
    const { data, error } = await supabase
        .from('courses')
        .select(`
            *,
            courses_status(id, name),
            enrolls(count)
        `)

    if (error) {
        console.error('Erro ao buscar cursos com contagem de matrículas:', error)
        return { error }
    }

    return { data }
}
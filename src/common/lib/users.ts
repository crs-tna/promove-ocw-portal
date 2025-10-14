import { createClient } from './supabase/client'
import { 
    User, 
    UserWithRole, 
    DatabaseUser, 
    USER_ROLES, 
    UsersRole 
} from './types'

const supabase = createClient()

// User creation and management
export async function createUser(userData: DatabaseUser) {
    const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()

    if (error) {
        console.error('Erro ao criar usuário:', error)
        return { error }
    }

    console.log('Usuário criado com sucesso:', data[0])
    return { data: data[0] }
}

export async function updateUser(userId: string, userData: Partial<DatabaseUser>) {
    const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId)
        .select()

    if (error) {
        console.error('Erro ao atualizar usuário:', error)
        return { error }
    }

    console.log('Usuário atualizado com sucesso:', data[0])
    return { data: data[0] }
}

export async function deleteUser(userId: string) {
    // Delete related records first to avoid foreign key constraints
    
    // Delete teaching assignments
    await supabase
        .from('teaches')
        .delete()
        .eq('teacher_id', userId)
    
    // Delete enrollments
    await supabase
        .from('enrolls')
        .delete()
        .eq('student_id', userId)
    
    // Delete posts
    await supabase
        .from('posts')
        .delete()
        .eq('teacher_id', userId)
    
    // Delete calendar events
    await supabase
        .from('calendar')
        .delete()
        .or(`user_id.eq.${userId},student_id.eq.${userId}`)
    
    // Delete student tasks
    await supabase
        .from('student_tasks')
        .delete()
        .eq('student_id', userId)
    
    // Delete task submissions
    await supabase
        .from('task_submissions')
        .delete()
        .eq('student_id', userId)
    
    // Delete lesson progress
    await supabase
        .from('lesson_progress')
        .delete()
        .eq('student_id', userId)
    
    // Finally delete the user
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

    if (error) {
        console.error('Erro ao deletar usuário:', error)
        return { error }
    }

    console.log('Usuário deletado com sucesso')
    return { data }
}

// User retrieval functions
export async function getUserById(userId: string) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Erro ao buscar usuário:', error)
        return { error }
    }

    return { data }
}

export async function getUserWithRole(userId: string) {
    const { data, error } = await supabase
        .from('users')
        .select(`
            *,
            users_roles(id, name)
        `)
        .eq('id', userId)
        .single()

    if (error) {
        console.error('Erro ao buscar usuário com role:', error)
        return { error }
    }

    return { data }
}

export async function getUserIdByName(userName: string) {
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('first_name', userName)
        .single()

    if (error) {
        console.error('Erro ao buscar usuário:', error)
        return null
    }

    if (!data) return null
    return { id: data.id }
}

export async function getUserByEmail(email: string) {
    // Note: Email is stored in auth.users, not public.users
    // This function would need to use Supabase auth or join with auth.users
    const { data, error } = await supabase.auth.getUser()
    
    if (error) {
        console.error('Erro ao buscar usuário por email:', error)
        return { error }
    }
    
    if (data.user?.email === email) {
        return getUserById(data.user.id)
    }
    
    return { error: { message: 'Usuário não encontrado' } }
}

export async function getUserByDre(dre: string) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('dre', dre)
        .single()

    if (error) {
        console.error('Erro ao buscar usuário por DRE:', error)
        return { error }
    }

    return { data }
}

// Advanced user retrieval functions
export async function getAllUsers() {
    const { data, error } = await supabase
        .from('users')
        .select(`
            *,
            users_roles(id, name)
        `)

    if (error) {
        console.error('Erro ao buscar todos os usuários:', error)
        return { error }
    }

    return { data }
}

export async function getUsersByRole(roleId: number) {
    const { data, error } = await supabase
        .from('users')
        .select(`
            *,
            users_roles(id, name)
        `)
        .eq('role_id', roleId)

    if (error) {
        console.error('Erro ao buscar usuários por role:', error)
        return { error }
    }

    return { data }
}

export async function getProfessors() {
    return getUsersByRole(USER_ROLES.PROFESSOR.id)
}

export async function getStudents() {
    return getUsersByRole(USER_ROLES.ESTUDANTE.id)
}

export async function getGuests() {
    return getUsersByRole(USER_ROLES.CONVIDADO.id)
}

export async function searchUsers(searchTerm: string) {
    const { data, error } = await supabase
        .from('users')
        .select(`
            *,
            users_roles(id, name)
        `)
        .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,dre.ilike.%${searchTerm}%`)

    if (error) {
        console.error('Erro ao buscar usuários:', error)
        return { error }
    }

    return { data }
}

// User enrollment and course management
export async function getStudentCourses(studentId: string) {
    const { data, error } = await supabase
        .from('enrolls')
        .select(`
            *,
            courses(
                *,
                courses_status(id, name)
            )
        `)
        .eq('student_id', studentId)

    if (error) {
        console.error('Erro ao buscar cursos do estudante:', error)
        return { error }
    }

    return { data: data.map(enrollment => enrollment.courses).filter(Boolean) }
}

export async function getProfessorCourses(professorId: string) {
    const { data, error } = await supabase
        .from('teaches')
        .select(`
            *,
            courses(
                *,
                courses_status(id, name)
            )
        `)
        .eq('teacher_id', professorId)

    if (error) {
        console.error('Erro ao buscar cursos do professor:', error)
        return { error }
    }

    return { data: data.map(teaching => teaching.courses).filter(Boolean) }
}

export async function enrollStudentInCourse(studentId: string, courseId: string) {
    const { data, error } = await supabase
        .from('enrolls')
        .insert({
            student_id: studentId,
            course_id: courseId
        })
        .select()

    if (error) {
        console.error('Erro ao matricular estudante:', error)
        return { error }
    }

    // Update student count in course
    const { error: updateError } = await supabase
        .rpc('increment_course_students', { course_id: courseId })

    if (updateError) {
        console.error('Erro ao atualizar contagem de estudantes:', updateError)
    }

    console.log('Estudante matriculado com sucesso:', data[0])
    return { data: data[0] }
}

export async function unenrollStudentFromCourse(studentId: string, courseId: string) {
    const { data, error } = await supabase
        .from('enrolls')
        .delete()
        .eq('student_id', studentId)
        .eq('course_id', courseId)

    if (error) {
        console.error('Erro ao desmatricular estudante:', error)
        return { error }
    }

    // Update student count in course
    const { error: updateError } = await supabase
        .rpc('decrement_course_students', { course_id: courseId })

    if (updateError) {
        console.error('Erro ao atualizar contagem de estudantes:', updateError)
    }

    console.log('Estudante desmatriculado com sucesso')
    return { data }
}

export async function assignProfessorToCourse(professorId: string, courseId: string) {
    const { data, error } = await supabase
        .from('teaches')
        .insert({
            teacher_id: professorId,
            course_id: courseId
        })
        .select()

    if (error) {
        console.error('Erro ao atribuir professor ao curso:', error)
        return { error }
    }

    console.log('Professor atribuído ao curso com sucesso:', data[0])
    return { data: data[0] }
}

export async function removeProfessorFromCourse(professorId: string, courseId: string) {
    const { data, error } = await supabase
        .from('teaches')
        .delete()
        .eq('teacher_id', professorId)
        .eq('course_id', courseId)

    if (error) {
        console.error('Erro ao remover professor do curso:', error)
        return { error }
    }

    console.log('Professor removido do curso com sucesso')
    return { data }
}

// Types for user statistics
interface UserStats {
    user: UserWithRole
    totalCourses: number
    completedTasks?: number
    pendingTasks?: number
    totalStudents?: number
    completedLessons?: number
    totalLessons?: number
}

// User statistics and analytics
export async function getUserStats(userId: string) {
    const userRole = await getUserWithRole(userId)
    
    if (userRole.error || !userRole.data) {
        return { error: userRole.error || { message: 'Usuário não encontrado' } }
    }

    const stats: UserStats = {
        user: userRole.data,
        totalCourses: 0
    }

    if (userRole.data.role_id === USER_ROLES.PROFESSOR.id) {
        // Professor statistics
        const courses = await getProfessorCourses(userId)
        stats.totalCourses = courses.data?.length || 0
        
        // Get total students across all professor's courses
        const { data: enrollmentCount } = await supabase
            .from('enrolls')
            .select('id', { count: 'exact' })
            .in('course_id', courses.data?.map(course => course.id) || [])
        
        stats.totalStudents = enrollmentCount?.length || 0

    } else if (userRole.data.role_id === USER_ROLES.ESTUDANTE.id) {
        // Student statistics
        const courses = await getStudentCourses(userId)
        stats.totalCourses = courses.data?.length || 0
        
        // Get task statistics
        const { data: tasks } = await supabase
            .from('student_tasks')
            .select('completed')
            .eq('student_id', userId)
        
        stats.completedTasks = tasks?.filter(task => task.completed).length || 0
        stats.pendingTasks = tasks?.filter(task => !task.completed).length || 0
        
        // Get lesson progress
        const { data: progress } = await supabase
            .from('lesson_progress')
            .select('completed')
            .eq('student_id', userId)
        
        stats.completedLessons = progress?.filter(p => p.completed).length || 0
        stats.totalLessons = progress?.length || 0
    }

    return { data: stats }
}

// Helper functions for user roles
export const getAllUserRoles = (): UsersRole[] => {
  return Object.values(USER_ROLES);
};

export const getUserRoleById = (id: number): UsersRole | undefined => {
  return Object.values(USER_ROLES).find(role => role.id === id);
};

export const getUserRoleByName = (name: string): UsersRole | undefined => {
  return Object.values(USER_ROLES).find(role => role.name === name);
};

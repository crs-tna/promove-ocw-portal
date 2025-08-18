import { getAllCourses } from '../../../common/lib/course'
import CourseListClient from '../cursos/courseClient'

export default async function UserCursosPage() {
    const { data: courses, error } = await getAllCourses()

    if (error) {
        return (
            <main className="max-w-5xl mx-auto py-10 px-4 text-center">
                <h1 className="text-2xl font-bold text-destructive">
                    Ocorreu um erro ao carregar os cursos.
                </h1>
                <p className="text-muted-foreground">
                    Por favor, tente novamente mais tarde.
                </p>
            </main>
        )
    }

    if (!courses || courses.length === 0) {
        return (
            <main className="max-w-5xl mx-auto py-10 px-4 text-center">
                <h1 className="text-2xl font-bold">Nenhum curso encontrado.</h1>
                <p className="text-muted-foreground">
                    Não há cursos disponíveis no momento.
                </p>
            </main>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-card-foreground">
                    Cursos
                </h1>

                <CourseListClient initialCourses={courses} />
            </main>
        </div>
    )
}

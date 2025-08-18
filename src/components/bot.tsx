'use client'

import { getAllCourses, getProfessorCourses } from '../common/lib/course'

export default function TestButton() {
    const handleClick = async () => {
        const { data } = await getAllCourses()
        if (data) alert('Curso recuperado com sucesso!')
    }

    return <button onClick={handleClick}>Retornar cursos</button>
}

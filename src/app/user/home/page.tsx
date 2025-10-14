'use client'

import { useUser } from '@/common/contexts/user-context'
import { StudentHomePage } from '@/components/user-home-layouts/student-home'
import TeacherHomePage from '@/components/user-home-layouts/teacher-home'

export default function UserHomePage() {
    const { user, role } = useUser()

    if (!user) return null // ou loading/spinner

    if (role === 'Professor') return <TeacherHomePage />
    return <StudentHomePage user={user} />
}

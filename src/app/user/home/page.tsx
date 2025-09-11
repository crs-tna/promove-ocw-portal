'use client'

import { TeacherHomePage } from '@/src/components/user-home-layouts/teacher-home'
import { StudentHomePage } from '@/src/components/user-home-layouts/student-home'
import { useUser } from '@/src/common/contexts/UserContext'

export default function UserHomePage() {
    const { user, role } = useUser()

    if (!user) return null // ou loading/spinner

    if (role === 'professor') return <TeacherHomePage user={user} />
    return <StudentHomePage user={user} />
}

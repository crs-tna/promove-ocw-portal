import { User } from '@supabase/supabase-js'

interface TeacherHomePageProps {
    user?: User
}

export const TeacherHomePage = ({ user }: TeacherHomePageProps) => {
    return <div>{user?.email} Teacher home page</div>
}

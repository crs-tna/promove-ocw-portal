import { User } from '@supabase/supabase-js'

interface StudentHomePageProps {
    user?: User
}

export const StudentHomePage = ({ user }: StudentHomePageProps) => {
    return <div>{user?.email} student home page</div>
}

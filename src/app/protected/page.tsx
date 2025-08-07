'use client'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useUser } from '@/src/common/contexts/UserContext'

export default function ProtectedPage() {
    const userDetails = useUser()

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <div className="w-full">
                <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                    <InfoOutlinedIcon sx={{ fontSize: '16px' }} />
                    Você só vê essa página por estar logado!
                </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
                <p>
                    User name: {userDetails.profile?.first_name}{' '}
                    {userDetails.profile?.last_name}
                </p>
                <p>User role: {userDetails.role}</p>
                <p>User email: {userDetails.user?.email}</p>
            </div>
        </div>
    )
}

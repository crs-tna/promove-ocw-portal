'use client'

import { createClient } from '@/src/common/lib/supabase/client'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
    const router = useRouter()

    const logout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
    }

    return <Button onClick={logout}>Sair</Button>
}

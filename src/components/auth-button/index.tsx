import Link from 'next/link'
import { createClient } from '@/common/lib/supabase/server'
import { LogoutButton } from '../logout-button'
import { Button } from '@mui/material'

export async function AuthButton() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user ? (
        <div className="flex items-center gap-4">
            Olá, {user.email}!
            <LogoutButton />
        </div>
    ) : (
        <div className="flex gap-2">
            <Button variant="outlined">
                <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button variant="contained">
                <Link href="/auth/sign-up">Inscrever-se</Link>
            </Button>
        </div>
    )
}

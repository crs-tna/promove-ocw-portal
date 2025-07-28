import { redirect } from 'next/navigation'
import { createClient } from '@/src/common/lib/supabase/server'

// TODO: implement user profile
// WARN: do not make this a client file, only manipulate states inside components, please.

export default async function PerfilPage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return <div></div>
}

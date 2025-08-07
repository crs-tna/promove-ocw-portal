'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'
import { createClient } from '../lib/supabase/client'
import { User } from '@supabase/supabase-js'

type UserRole = 'professor' | 'student' | 'admin' | 'guest' | null

interface FullUserData {
    id: string
    email: string
    first_name: string
    last_name: string
    dre: string | null
    role: UserRole
    created_at: string
}

interface UserState {
    loggedIn: boolean
    role: UserRole
    user: User | null
    profile: FullUserData | null
    loading: boolean
}

const UserContext = createContext<UserState | undefined>(undefined)

interface ProviderProps {
    children: ReactNode
}

const supabase = createClient()

export function UserContextProvider({ children }: ProviderProps) {
    const [userState, setUserState] = useState<UserState>({
        loggedIn: false,
        role: null,
        user: null,
        profile: null,
        loading: true,
    })

    useEffect(() => {
        const fetchUser = async () => {
            setUserState((prev) => ({ ...prev, loading: true }))
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser()

            if (authError || !user) {
                setUserState({
                    loggedIn: false,
                    role: null,
                    user: null,
                    profile: null,
                    loading: false,
                })
                return
            }

            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single()

            if (profileError || !profile) {
                setUserState({
                    loggedIn: true,
                    role: 'guest',
                    user,
                    profile: null,
                    loading: false,
                })
                return
            }

            setUserState({
                loggedIn: true,
                role: profile.role ?? 'guest',
                user,
                profile,
                loading: false,
            })
        }

        fetchUser()

        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            fetchUser()
        })

        return () => {
            listener?.subscription.unsubscribe()
        }
    }, [])

    return (
        <UserContext.Provider value={userState}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within an UserContextProvider')
    }
    return context
}

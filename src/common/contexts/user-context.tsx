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
import { User as DBUser, UsersRole } from '../lib/types'

type UserRole = 'Professor' | 'Estudante' | 'Convidado' | null

interface UserProfile extends DBUser {
    email?: string // Email comes from auth.users, not public.users
    role?: UsersRole
}

interface UserState {
    loggedIn: boolean
    role: UserRole
    user: User | null
    profile: UserProfile | null
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
                .select(`
                    *,
                    users_roles(id, name)
                `)
                .eq('id', user.id)
                .single()

            if (profileError || !profile) {
                setUserState({
                    loggedIn: true,
                    role: 'Convidado',
                    user,
                    profile: null,
                    loading: false,
                })
                return
            }

            // Map role_id to role name
            let userRole: UserRole = 'Convidado'
            if (profile.users_roles?.name) {
                userRole = profile.users_roles.name as UserRole
            } else if (profile.role_id === 1) {
                userRole = 'Professor'
            } else if (profile.role_id === 2) {
                userRole = 'Estudante'
            } else if (profile.role_id === 3) {
                userRole = 'Convidado'
            }

            const userProfile: UserProfile = {
                ...profile,
                email: user.email || undefined,
                role: profile.users_roles
            }

            setUserState({
                loggedIn: true,
                role: userRole,
                user,
                profile: userProfile,
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

// Helper functions for role checking
export function useUserRole() {
    const { role } = useUser()
    return {
        role,
        isProfessor: role === 'Professor',
        isStudent: role === 'Estudante',
        isGuest: role === 'Convidado',
        isLoggedIn: role !== null
    }
}

export function useUserProfile() {
    const { profile, loading } = useUser()
    return {
        profile,
        loading,
        userId: profile?.id,
        userEmail: profile?.email,
        userName: profile ? `${profile.first_name} ${profile.last_name}` : null,
        userDre: profile?.dre,
        userImage: profile?.user_image,
        roleId: profile?.role_id
    }
}

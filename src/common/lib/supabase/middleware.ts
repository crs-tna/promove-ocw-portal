import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// TODO provisório, deve-se definir rotas, papéis e permissões de maneira exata e completa

enum Roles {
    Teacher = 1,
    Student = 2,
    Guest = 3,
}

type RestrictedRoutes = {
    [route: string]: number[]
}

interface PermissionsConfig {
    restrictedRoutes: RestrictedRoutes
    publicRoutes: string[]
    authRoutes: string[]
    redirects: {
        authenticated: string
        unauthenticated: string
        unauthorized: string
    }
}

const PERMISSIONS_CONFIG: PermissionsConfig = {
    restrictedRoutes: {
        '/user': [Roles.Teacher, Roles.Student],
        '/protected': [Roles.Teacher],
    },
    publicRoutes: ['/unauthorized'],
    authRoutes: ['/auth'],
    redirects: {
        authenticated: '/user/home',
        unauthenticated: '/auth/login',
        unauthorized: '/unauthorized',
    },
}

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    function matchesRoute(routes: string[]): boolean {
        return routes.some((route) => {
            return pathname === route || pathname.startsWith(`${route}/`)
        })
    }

    function redirect(target: string, redirectTo?: string) {
        const url = request.nextUrl.clone()
        url.pathname = target
        if (redirectTo) url.searchParams.set('redirectTo', redirectTo) // Redireciona para a rota original após redirecionamento
        return NextResponse.redirect(url)
    }

    // Hero apenas para usuários não logados
    if (pathname === '/') {
        return user
            ? redirect(PERMISSIONS_CONFIG.redirects.authenticated)
            : supabaseResponse
    }

    // Usuários logados não deveriam acessar as rotas de login
    if (matchesRoute(PERMISSIONS_CONFIG.authRoutes)) {
        if (user) {
            return redirect(PERMISSIONS_CONFIG.redirects.authenticated)
        }
        return supabaseResponse
    }

    // // Rotas públicas
    // if (matchesRoute(PERMISSIONS_CONFIG.publicRoutes)) {
    //     return supabaseResponse
    // }

    // // Usuário não logado tentando acessar alguma rota não pública e não auth
    // if (!user) {
    //     return redirect(PERMISSIONS_CONFIG.redirects.unauthenticated, pathname)
    // }

    // const { data: profile, error: profileError } = await supabase
    //     .from('users')
    //     .select('role_id')
    //     .eq('id', user.id)
    //     .single()

    // // Houve algum erro ao determinar papel do usuário
    // if (!profile || profileError) {
    //     console.error(profileError)
    //     return redirect(PERMISSIONS_CONFIG.redirects.unauthenticated, pathname)
    // }

    // // Usuário logado tenta acessar rotas que ele não tem permissão
    // const restrictedRoute = Object.keys(
    //     PERMISSIONS_CONFIG.restrictedRoutes
    // ).find((route) => pathname === route || pathname.startsWith(`${route}/`))

    // if (restrictedRoute) {
    //     if (
    //         !PERMISSIONS_CONFIG.restrictedRoutes[restrictedRoute].includes(
    //             profile.role_id
    //         )
    //     ) {
    //         return redirect(PERMISSIONS_CONFIG.redirects.unauthorized)
    //     }
    //     return supabaseResponse
    // }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}

export const ENDPOINTS = {
    USER: {
        COURSES: '/user/meus-cursos',
        CALENDAR: '/user/calendario',
        PROFILE: '/user/perfil',
        SETTINGS: '/user/perfil/configuracoes',
        HOMEPAGE: '/user/home'
    },
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/sign-up',
        UPDATE_PASSWORD: '/auth/update-password',
        FORGOT_PASSWORD: '/auth/forgot-password',
        ERROR: '/auth/error',
        CONFIRM: '/auth/confirm',
        SIGN_UP_SUCCESS: '/auth/sign-up-success',
    },
    COURSES: {
        LIST: '/cursos',
    },
} as const

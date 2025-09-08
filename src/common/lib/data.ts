// Create database interactions here and import them in client files

import { randomUUID } from 'crypto'
import { createClient } from './supabase/client'

const supabase = createClient()

export async function createCourse() {
    const { data, error } = await supabase.from('courses').insert({
        id: randomUUID,
        title: 'Modelagem Matemática',
        description:
            'Disciplina obrigatória do vigésimo período de Ciências da Computação',
    })

    if (error) {
        console.error('Erro ao criar curso:', error)
        return { error }
    }

    console.log('Curso criado com sucesso:', data)
    return { data }
}

export async function updateUserProfile(
    first_name: string,
    last_name: string,
    userId: string,
    avatarFile?: File
) {
    let user_image: string | undefined = undefined

    const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('user_image')
        .eq('id', userId)
        .single()

    if (fetchError) throw fetchError

    const oldAvatarUrl = userData?.user_image

    if (oldAvatarUrl) {
        try {
            // extrair o file path do URL pública
            const url = new URL(oldAvatarUrl)
            const filePath = url.pathname.replace(
                '/storage/v1/object/public/users-images/',
                ''
            )

            await supabase.storage.from('users-images').remove([filePath])
        } catch (err) {
            console.warn('Não foi possível deletar a imagem antiga:', err)
        }
    }

    if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop()
        const fileName = `${userId + Date.now()}.${fileExt}`
        const filePath = `images/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('users-images')
            .upload(filePath, avatarFile, {
                upsert: true,
            })

        if (uploadError) throw uploadError

        const {
            data: { publicUrl },
        } = supabase.storage.from('users-images').getPublicUrl(filePath)

        user_image = publicUrl
    }

    const { error } = await supabase
        .from('users')
        .update({
            first_name,
            last_name,
            ...(user_image && { user_image }),
        })
        .eq('id', userId)

    if (error) throw error
}

// TODO: fetchUserDataById

// TODO: fetchCourseList

// TODO: fetchCourseByUser

// TODO: fetchCourseByProfessor

// TODO: fetchCourseById

// TODO: fetchContentByCourse

// TODO: come up with whatever else

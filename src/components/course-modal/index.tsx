'use client'

import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    IconButton,
    Alert
} from '@mui/material'
// Icons will be replaced with text until @mui/icons-material is installed
import { createCourse, updateCourse } from '../../common/lib/course'
import { useUser } from '../../common/contexts/user-context'
import { 
    Course, 
    CATEGORIES, 
    COURSE_STATUSES 
} from '../../common/lib/types'

interface FormData {
    title: string
    description: string
    category_ids: string[]
    duration: number
    status_id: number
}

interface CourseModalProps {
    isOpen: boolean
    editingCourse: Course | null
    formData: FormData
    onClose: () => void
    onSubmit: () => void
    onInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | 
        { target: { name: string; value: unknown } }
    ) => void
}

const CourseModal: React.FC<CourseModalProps> = ({
    isOpen,
    editingCourse,
    formData,
    onClose,
    onSubmit,
    onInputChange,
}) => {
    const { user } = useUser()
    const [error, setError] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const categories = Object.values(CATEGORIES)
    const durations = [4, 8, 12, 16, 20]
    const statuses = Object.values(COURSE_STATUSES)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.title || !formData.description || formData.category_ids.length === 0 || !formData.duration) {
            setError('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        if (!user?.id) {
            setError('Usuário não autenticado.')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            if (editingCourse) {
                const { error: updateError } = await updateCourse(editingCourse.id, {
                    title: formData.title,
                    description: formData.description,
                    duration: formData.duration,
                    status_id: formData.status_id,
                    category_ids: formData.category_ids
                })
                
                if (updateError) {
                    setError('Erro ao atualizar o curso.')
                    return
                }
            } else {
                const { error: createError } = await createCourse({
                    title: formData.title,
                    description: formData.description,
                    duration: formData.duration,
                    status_id: formData.status_id,
                    category_ids: formData.category_ids
                }, user.id)
                
                if (createError) {
                    setError('Erro ao criar o curso.')
                    return
                }
            }
            
            onSubmit()
        } catch (err) {
            console.error('Erro inesperado:', err)
            setError('Ocorreu um erro inesperado.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectChange = (name: string, value: unknown) => {
        onInputChange({ target: { name, value } })
    }

    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {editingCourse ? 'Editar Curso' : 'Novo Curso'}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    ✖️
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {editingCourse 
                            ? 'Atualize as informações do curso' 
                            : 'Crie um novo curso para seus alunos'
                        }
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Título do Curso"
                            name="title"
                            value={formData.title}
                            onChange={onInputChange}
                            required
                            placeholder="Ex: Introdução à Programação"
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Descrição"
                            name="description"
                            value={formData.description}
                            onChange={onInputChange}
                            required
                            placeholder="Descreva o conteúdo e objetivos do curso..."
                        />

                        <FormControl fullWidth required>
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                value={formData.category_ids[0] || ''}
                                label="Categoria"
                                onChange={(e) => handleSelectChange('category_ids', [e.target.value])}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth required>
                            <InputLabel>Duração (horas)</InputLabel>
                            <Select
                                value={formData.duration || ''}
                                label="Duração (horas)"
                                onChange={(e) => handleSelectChange('duration', Number(e.target.value))}
                            >
                                {durations.map((duration) => (
                                    <MenuItem key={duration} value={duration}>
                                        {duration} horas
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={formData.status_id || COURSE_STATUSES.RASCUNHO.id}
                                label="Status"
                                onChange={(e) => handleSelectChange('status_id', Number(e.target.value))}
                            >
                                {statuses.map((status) => (
                                    <MenuItem key={status.id} value={status.id}>
                                        {status.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={onClose} color="inherit">
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={isLoading}
                    >
                        💾 {isLoading ? 'Salvando...' : (editingCourse ? 'Atualizar' : 'Criar')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CourseModal

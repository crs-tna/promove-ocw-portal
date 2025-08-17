import React from 'react'
import { Save, X } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { createCourse } from '../common/lib/course'

interface Course {
    id: number
    title: string
    description: string
    category: string
    duration: string
    students: number
    status: string
    createdAt: string
}

interface FormData {
    title: string
    description: string
    category: string
    duration: string
    status: string
}

interface CourseModalProps {
    isOpen: boolean
    editingCourse: Course | null
    formData: FormData
    onClose: () => void
    onSubmit: () => void
    onInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
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
    const categories = [
        'Ciência de Dados',
        'Computação Científica',
        'Engenharia de Dados',
        'Engenharia de Software',
        'Sistemas Computacionais e Comunicação',
        'Teoria da Computação',
    ]
    const durations = [4, 8, 12, 16, 20]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            // Criar objeto com os dados do form
            const courseData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                duration: formData.duration,
                status: formData.status,
            }

            // Se estiver editando, você pode incluir o ID
            if (editingCourse) {
                // Para edição, você precisaria de uma função updateCourse
                // const { data } = await updateCourse(editingCourse.id, courseData);
                console.log('Editando curso:', editingCourse.id, courseData)
            } else {
                // Para criar novo curso
                const { data } = await createCourse(courseData)
                console.log('Curso criado:', data)
            }

            alert(
                editingCourse
                    ? 'Curso atualizado com sucesso!'
                    : 'Curso criado com sucesso!'
            )

            // Chamar onSubmit para que o componente pai possa atualizar a lista
            onSubmit()

            // Fechar o modal
            onClose()
        } catch (error) {
            console.error('Erro ao salvar curso:', error)
            alert('Erro ao salvar curso. Tente novamente.')
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full max-h-[90vh] overflow-y-auto">
                <Card>
                    <CardHeader className="relative">
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <CardTitle className="text-2xl">
                            {editingCourse ? 'Editar Curso' : 'Novo Curso'}
                        </CardTitle>
                        <CardDescription>
                            {editingCourse
                                ? 'Atualize as informações do curso'
                                : 'Crie um novo curso para seus alunos'}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">
                                        Título do Curso *
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Ex: Introdução à Programação"
                                        required
                                        value={formData.title}
                                        onChange={onInputChange}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Descrição *
                                    </Label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Descreva o conteúdo e objetivos do curso..."
                                        rows={3}
                                        required
                                        value={formData.description}
                                        onChange={onInputChange}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category">
                                        Categoria *
                                    </Label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={onInputChange}
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">
                                            Selecione uma categoria
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duração *</Label>
                                    <select
                                        id="duration"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={onInputChange}
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">
                                            Selecione a duração
                                        </option>
                                        {durations.map((dur) => (
                                            <option key={dur} value={dur}>
                                                {dur}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={onInputChange}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="Rascunho">
                                            Rascunho
                                        </option>
                                        <option value="Ativo">Ativo</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="flex-1">
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingCourse
                                            ? 'Atualizar'
                                            : 'Criar'}{' '}
                                        Curso
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CourseModal

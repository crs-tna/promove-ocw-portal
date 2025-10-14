'use client'

import React from 'react'
import {
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    IconButton,
    Divider
} from '@mui/material'
// Icons will be replaced with text until @mui/icons-material is installed
import { Course, COURSE_STATUSES } from '../../common/lib/types'

interface CourseListProps {
    courses: Course[]
    onEdit: (course: Course) => void
    onDelete: (courseId: string) => void
    onCreateNew: () => void
}

const getStatusColor = (statusId: number | undefined): 'success' | 'warning' | 'error' | 'default' => {
    switch(statusId) {
        case COURSE_STATUSES.ATIVO.id: return 'success'
        case COURSE_STATUSES.RASCUNHO.id: return 'warning'
        case COURSE_STATUSES.ARQUIVADO.id: return 'error'
        case COURSE_STATUSES.PAUSADO.id: return 'default'
        default: return 'default'
    }
}

const getStatusName = (statusId: number | undefined): string => {
    const status = Object.values(COURSE_STATUSES).find(s => s.id === statusId)
    return status ? status.name : 'Desconhecido'
}

const CourseList: React.FC<CourseListProps> = ({
    courses,
    onEdit,
    onDelete,
    onCreateNew,
}) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Meus Cursos ({courses.length})
            </Typography>
            
            {courses.length === 0 ? (
                <Card elevation={2} sx={{ p: 6, textAlign: 'center' }}>
                    <CardContent>
                        <Box sx={{ mb: 3, fontSize: '80px' }}>
                            📚
                        </Box>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            Nenhum curso criado ainda
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Comece criando seu primeiro curso para oferecer conteúdo aos alunos.
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={onCreateNew}
                            size="large"
                        >
                            ➕ Criar Primeiro Curso
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Box 
                    sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { 
                            xs: '1fr',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)'
                        },
                        gap: 3
                    }}
                >
                    {courses.map((course) => (
                        <Card 
                            key={course.id}
                            elevation={3}
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography 
                                        variant="h6" 
                                        component="h3" 
                                        sx={{ 
                                            fontWeight: 600,
                                            flexGrow: 1,
                                            mr: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {course.title}
                                    </Typography>
                                    <Chip 
                                        label={getStatusName(course.status_id)}
                                        color={getStatusColor(course.status_id)}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                                
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    sx={{ 
                                        mb: 3,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        minHeight: '3.6em'
                                    }}
                                >
                                    {course.description || 'Sem descrição disponível'}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        👥 {course.students} estudantes
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ⏰ {course.duration}h
                                    </Typography>
                                </Box>
                            </CardContent>
                            
                            <Divider />
                            
                            <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                                <Button 
                                    size="small" 
                                    onClick={() => onEdit(course)}
                                    color="primary"
                                >
                                    ✏️ Editar
                                </Button>
                                <IconButton 
                                    size="small" 
                                    onClick={() => onDelete(course.id)}
                                    color="error"
                                    sx={{ '&:hover': { bgcolor: 'error.light', color: 'white' } }}
                                >
                                    🗑️
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default CourseList

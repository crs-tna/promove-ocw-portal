'use client'

import React from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip
} from '@mui/material'
// Icons will be replaced with text until @mui/icons-material is installed
import { Course, COURSE_STATUSES } from '../../common/lib/types'

interface CourseStatsProps {
    courses: Course[]
}

const CourseStats: React.FC<CourseStatsProps> = ({ courses }) => {
    const totalCourses = courses.length
    const totalStudents = courses.reduce((sum, course) => sum + course.students, 0)
    
    const activeCourses = courses.filter(course => course.status_id === COURSE_STATUSES.ATIVO.id).length
    const draftCourses = courses.filter(course => course.status_id === COURSE_STATUSES.RASCUNHO.id).length
    const archivedCourses = courses.filter(course => course.status_id === COURSE_STATUSES.ARQUIVADO.id).length
    const pausedCourses = courses.filter(course => course.status_id === COURSE_STATUSES.PAUSADO.id).length

    const stats = [
        {
            title: 'Total de Cursos',
            value: totalCourses,
            icon: '📚',
            color: 'primary' as const
        },
        {
            title: 'Total de Estudantes',
            value: totalStudents,
            icon: '👥',
            color: 'secondary' as const
        },
        {
            title: 'Cursos Ativos',
            value: activeCourses,
            icon: '▶️',
            color: 'success' as const
        },
        {
            title: 'Rascunhos',
            value: draftCourses,
            icon: '📝',
            color: 'warning' as const
        }
    ]

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Estatísticas dos Cursos
            </Typography>
            <Box 
                sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { 
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: 3
                }}
            >
                {stats.map((stat, index) => (
                    <Card 
                        key={index}
                        elevation={2}
                        sx={{ 
                            height: '100%',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4
                            }
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box 
                                    sx={{ 
                                        mr: 2, 
                                        color: `${stat.color}.main`,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                                <Typography 
                                    variant="h4" 
                                    component="div"
                                    sx={{ fontWeight: 700, color: `${stat.color}.main` }}
                                >
                                    {stat.value}
                                </Typography>
                            </Box>
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                            >
                                {stat.title}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            
            {/* Status breakdown */}
            {(archivedCourses > 0 || pausedCourses > 0) && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Status dos Cursos
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {archivedCourses > 0 && (
                            <Chip 
                                label={`📦 ${archivedCourses} Arquivados`}
                                color="default"
                                variant="outlined"
                            />
                        )}
                        {pausedCourses > 0 && (
                            <Chip 
                                label={`⏸️ ${pausedCourses} Pausados`}
                                color="default"
                                variant="outlined"
                            />
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default CourseStats

'use client'

import React, { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    TextField,
    InputAdornment,
    Grid,
    Chip,
    Stack,
    Divider,
} from '@mui/material'
import { Clock, Users, Calendar, Search } from 'lucide-react'

const categorias = [
    'Ciência de Dados e Engenharia de Dados',
    'Computação Científica',
    'Engenharia de Software',
    'Sistemas Computacionais e Comunicação',
    'Teoria da Computação',
]

type Course = {
    id: string | number
    title: string
    description: string
    category: string
    duration: string
    students?: number
    created_at: string
}

export default function CourseListClient({
    initialCourses,
}: {
    initialCourses: Course[]
}) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCourses = initialCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    fullWidth
                    type="text"
                    placeholder="Buscar curso..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                        },
                    }}
                />

                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {categorias.map((categoria) => (
                        <Chip
                            key={categoria}
                            label={categoria}
                            clickable
                            sx={{
                                backgroundColor: 'orange.500',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                minWidth: '112px',
                                maxWidth: '160px',
                                '&:hover': {
                                    backgroundColor: 'orange.600',
                                },
                                '& .MuiChip-label': {
                                    textAlign: 'center',
                                    lineHeight: 1.2,
                                },
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            <Grid container spacing={3}>
                {filteredCourses.map((course) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={course.id}>
                        <Card
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    boxShadow: 4,
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <CardHeader sx={{ pb: 1 }}>
                                <Typography 
                                    variant="h6" 
                                    component="h3"
                                    sx={{ 
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 1
                                    }}
                                >
                                    {course.title}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        lineHeight: 1.4
                                    }}
                                >
                                    {course.description}
                                </Typography>
                            </CardHeader>
                            <CardContent sx={{ pt: 1 }}>
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                            Categoria:
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: 'text.secondary',
                                                textAlign: 'right',
                                                maxWidth: '60%'
                                            }}
                                        >
                                            {course.category}
                                        </Typography>
                                    </Box>
                                    
                                    <Divider sx={{ my: 0.5 }} />
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Clock size={14} />
                                            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                Duração:
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {course.duration}
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Users size={14} />
                                            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                Alunos:
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {course.students || 0}
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Calendar size={14} />
                                            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                Criado em:
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {new Date(course.created_at).toLocaleDateString('pt-BR')}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {filteredCourses.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography 
                        variant="h5" 
                        component="h2"
                        sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            color: 'text.primary'
                        }}
                    >
                        Nenhum curso encontrado
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ color: 'text.secondary' }}
                    >
                        Tente ajustar os termos da sua busca.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

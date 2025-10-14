'use client'

import React from 'react'
import {
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material'
// Icons will be replaced with text until @mui/icons-material is installed

interface CourseHeaderProps {
    onCreateNew: () => void
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ onCreateNew }) => {
    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        📊
                    </IconButton>
                    <Box>
                        <Typography 
                            variant="h4" 
                            component="h1"
                            sx={{ 
                                fontWeight: 600,
                                color: 'inherit'
                            }}
                        >
                            Painel do Professor
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'inherit',
                                opacity: 0.8
                            }}
                        >
                            Gerencie seus cursos e conteúdos
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onCreateNew}
                    sx={{
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: 2
                    }}
                >
                    ➕ Novo Curso
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default CourseHeader

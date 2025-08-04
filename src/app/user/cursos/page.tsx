// TODO: implement user cursos page
// WARN: do not make this a client file, only manipulate states inside components, please.

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { ChevronRight } from 'lucide-react'

const categorias = [
    'Ciência de Dados e Engenharia de Dados',
    'Computação Científica',
    'Engenharia de Software',
    'Sistemas Computacionais e Comunicação',
    'Teoria da Computação',
]

const cursos = [
    {
        nome: 'Álgebra Linear',
        descricao: 'Espaços vetoriais, transformações lineares e matrizes.',
    },
    { nome: 'Cálculo I', descricao: 'Limites, derivadas e aplicações.' },
    {
        nome: 'Estrutura de Dados',
        descricao: 'Listas, pilhas, filas, árvores e grafos.',
    },
    {
        nome: 'Probabilidade',
        descricao: 'Eventos, distribuições e teorema de Bayes.',
    },
    {
        nome: 'Física 2',
        descricao: 'Cinemática 2, dinâmica 2 e leis de Newton 2.',
    },
    {
        nome: 'Física 3',
        descricao: 'Cinemática 3, dinâmica 3 e leis de Newton 3.',
    },
    { nome: 'Biruleibi', descricao: 'Cozinha 1, Sala 11.' },
    {
        nome: 'Tega',
        descricao: 'Mec, Como se preteger da chuva de mec com rajadas de tega.',
    },
]

export default function UserCursosPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="max-w-5xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-card-foreground">
                    Cursos
                </h1>
                <div className="mb-6 space-y-4">
                    <div className="w-4/5 mx-auto">
                        <Input
                            type="text"
                            placeholder="Buscar curso..."
                            className="w-full bg-card"
                        />
                    </div>

                    <div className="flex justify-center gap-4 flex-wrap">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-xs font-medium text-center leading-tight max-w-32"
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cursos.map((curso, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow relative"
                        >
                            <CardHeader>
                                <CardTitle className="text-card-foreground">
                                    {curso.nome}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {curso.descricao}
                                </p>
                                <Button
                                    size="sm"
                                    className="absolute bottom-4 right-4 h-8 w-8 rounded-full p-0 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}

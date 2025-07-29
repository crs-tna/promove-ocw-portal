import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

export function Hero() {
    return (
        <main className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                <div className="flex flex-col justify-center items-start gap-6 lg:gap-8 w-full lg:w-1/2 py-16">
                    <h1 className="text-terciary text-2xl lg:text-4xl font-bold font-['Roboto'] uppercase leading-tight">
                        Acesse e descubra o que você precisa para os seus
                        estudos.
                    </h1>
                    <p className="text-terciary text-lg lg:text-xl font-normal font-['Roboto'] leading-relaxed">
                        O OpenCourseWare da UFRJ é uma iniciativa educacional
                        que disponibiliza gratuitamente materiais de cursos
                        oferecidos por nossos professores e pesquisadores.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <Link href="/auth/sign-up">
                            <Button size="lg" variant={'default'}>
                                CADASTRE-SE
                            </Button>
                        </Link>
                        <Link href="/auth/login">
                            <Button size="lg" variant={'outline'}>
                                ENTRAR
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-shrink-0">
                    <Image
                        src={'/hero-image.png'}
                        alt="hero image"
                        width={600}
                        height={527}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            </div>
        </main>
    )
}

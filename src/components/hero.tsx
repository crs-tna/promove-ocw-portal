import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

export function Hero() {
    return (
        <div className="relative h-[calc(100vh-4rem)]">
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
                <Image
                    src={'/hero-image.png'}
                    alt="hero image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="flex relative container h-full items-center mx-auto self-center px-4">
                <div className="flex flex-col justify-center items-start gap-6 lg:gap-8 w-full lg:w-1/2 bg-background/60 lg:bg-primary/0 p-8 rounded-lg h-1/2 min-h-[335px]">
                    <h1 className="text-terciary text-2xl lg:text-4xl font-bold uppercase leading-tight">
                        Acesse e descubra tudo que você precisa para os seus
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
            </div>
        </div>
    )
}

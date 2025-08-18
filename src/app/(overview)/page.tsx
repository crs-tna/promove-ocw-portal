import { Hero } from '@/src/components/hero'

// TODO: implement general homepage (for non-logged in users)
export default function Home() {
    return (
        <main className="flex flex-col items-center gap-20">
            <Hero />
        </main>
    )
}

import { Hero } from '@/src/components/hero'

import Bot from '../../components/bot'

// TODO: implement general homepage (for non-logged in users)
export default function Home() {
    return (
        <main className="flex flex-col items-center gap-20">
            <Bot />
            <Hero />
        </main>
    )
}

import type { Metadata } from 'next'
import { Readex_Pro, Roboto, Montserrat } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Analytics } from '@vercel/analytics/next'
import Header from '@/src/components/ui/header'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Cursos abertos | UFRJ',
    description:
        'Plataforma de Cursos abertos da Universidade Federal do Rio de Janeiro',
}

const readexPro = Readex_Pro({ subsets: ['latin'], variable: '--font-readex' })
const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-roboto',
})
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-montserrat',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="pt-BR"
            className={`${readexPro.variable} ${roboto.variable} ${montserrat.variable}`}
        >
            <Analytics />

            <body className="font-body antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div>
                        <Header />
                    </div>
                    <div className="flex justify-center">
                        <main className="flex justify-center">
                            {children}
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}

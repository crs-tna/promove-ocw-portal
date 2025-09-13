import type { Metadata } from 'next'
import { Readex_Pro, Roboto, Montserrat } from 'next/font/google'
import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Analytics } from '@vercel/analytics/next'
import Header from '@/src/components/ui/header'
import { UserContextProvider } from '../common/contexts/UserContext'
import { AppThemeProvider } from '../common/contexts/ThemeProvider'

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
    modal,
}: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
}>) {
    return (
        <html
            lang="pt-BR"
            className={`${readexPro.variable} ${roboto.variable} ${montserrat.variable}`}
        >
            <body className="font-body antialiased">
                <Analytics />
                <AppThemeProvider>
                    <div className="min-h-screen flex flex-col">
                        <UserContextProvider>
                            <Header />
                            <main className="flex-1 w-full">
                                {children}
                                {modal}
                                <div id="modal-root" />
                            </main>
                        </UserContextProvider>
                    </div>
                </AppThemeProvider>
            </body>
        </html>
    )
}

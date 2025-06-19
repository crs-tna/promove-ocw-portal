import { EnvVarWarning } from '@/components/env-var-warning'
import { AuthButton } from '@/components/auth-button'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { hasEnvVars } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'
import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen flex flex-col items-center">
            <Analytics />
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                        <div className="flex gap-5 items-center font-semibold">
                            <Link href={'/'}>Cursos abertos UFRJ</Link>
                        </div>
                        <div className="flex gap-5 items-center font-semibold">
                            <ThemeSwitcher />
                            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
                        </div>
                    </div>
                </nav>
                <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
                    {children}
                </div>

                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                    <p>Powered by PROMOVE</p>
                    <span className="border-l h-6" />
                    <p>
                        <a
                            href="mailto:promove.ufrj@gmail.com"
                            target="_blank"
                            className="font-bold hover:underline"
                            rel="noreferrer"
                        >
                            <EmailIcon
                                sx={{ fontSize: '16px', marginRight: '.1rem' }}
                            />
                            promove.ufrj@gmail.com
                        </a>
                    </p>
                    <p>
                        <a
                            href="mailto:promove.ufrj@gmail.com"
                            target="_blank"
                            className="font-bold hover:underline flex gap-1 "
                            rel="noreferrer"
                        >
                            <InstagramIcon
                                sx={{ fontSize: '16px', marginRight: '.1rem' }}
                            />
                            @promove.ufrj
                        </a>
                    </p>
                </footer>
            </div>
        </main>
    )
}

import Link from 'next/link'
import { ThemeSwitcher } from '../theme-switcher'
import { EnvVarWarning } from '../env-var-warning'
import { AuthButton } from '../auth-button'
import { hasEnvVars } from '@/src/common/lib/utils'

export default function Header() {
    return (
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
        </div>
    )
}

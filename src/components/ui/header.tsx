import Link from 'next/link'
import { ThemeSwitcher } from '../theme-switcher'
import { PromoveLogo } from '../promove-logo'

export default function Header() {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-[calc(100vw-10rem)] flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={'/'}>
                        <PromoveLogo />
                    </Link>
                </div>
                <div className="flex gap-5 items-center font-semibold">
                    <ThemeSwitcher />
                    {/* {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />} */}
                </div>
            </div>
        </nav>
    )
}

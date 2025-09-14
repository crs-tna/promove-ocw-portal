'use client'
import Link from 'next/link'
import { PromoveLogo } from '../promove-logo'
import { useUser } from '@/src/common/contexts/UserContext'
import { UserDropdown } from '../user-dropdown'
import { DropdownMenu } from './dropdown-menu'

export default function Header() {
    const { loggedIn } = useUser()
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-[calc(100vw-10rem)] flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={'/'}>
                        <PromoveLogo />
                    </Link>
                </div>
                <div className="flex gap-5 items-center font-semibold">
                    {loggedIn ? <UserDropdown /> : null}
                    <DropdownMenu />
                </div>
            </div>
        </nav>
    )
}

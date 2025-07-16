'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { HomeIcon, UsersIcon, FoldersIcon } from 'lucide-react'

const links = [
    { name: 'Home', href: '/user/home', icon: HomeIcon },
    { name: 'Perfil', href: '/user/perfil', icon: FoldersIcon },
    { name: 'Cursos', href: '/user/cursos', icon: FoldersIcon },
    { name: 'Calendário', href: '/user/calendario', icon: FoldersIcon },
    { name: 'Amigos', href: '/user/amigos', icon: UsersIcon },
    { name: 'Fóruns', href: '/user/foruns', icon: UsersIcon },
]

export default function NavLinks({ isOpen }: { isOpen: boolean }) {
    const pathname = usePathname()

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                const isActive = pathname === link.href

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] items-center rounded-md transition-colors p-3 text-sm font-medium',
                            isActive
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary',
                            isOpen
                                ? 'justify-start gap-2 px-3'
                                : 'justify-center'
                        )}
                    >
                        <LinkIcon className="w-6" />
                        {isOpen && <p className="font-body">{link.name}</p>}
                    </Link>
                )
            })}
        </>
    )
}

'use client'

import NavLinks from './ui/protected/nav-links'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

export default function SideNav() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div
            className={clsx(
                'flex h-full flex-col bg-background py-4 transition-all duration-300 ease-in-out',
                isOpen ? 'w-64 px-4' : 'w-20 px-2'
            )}
        >
            {/* TOGGLE BUTTON */}
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded p-1 text-muted-foreground hover:bg-accent"
                >
                    {isOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>

            {/* NAV LINKS */}
            <div className="flex grow flex-col justify-between space-y-2">
                <NavLinks isOpen={isOpen} />
            </div>
        </div>
    )
}

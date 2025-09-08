'use client'
import { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        if (
            typeof window !== 'undefined' &&
            !document.getElementById('modal-root')
        ) {
            const modalRoot = document.createElement('div')
            modalRoot.id = 'modal-root'
            document.body.appendChild(modalRoot)
        }
    }, [])

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    // Fecha se clicar fora do modal
    useEffect(() => {
        if (!mounted) return

        const dialog = dialogRef.current
        if (!dialog) return

        if (!dialog.open) {
            dialog.showModal()
        }

        const handleClick = (e: MouseEvent) => {
            if (e.target === dialog) {
                onDismiss()
            }
        }

        dialog.addEventListener('click', handleClick)

        return () => {
            dialog.removeEventListener('click', handleClick)
        }
    }, [onDismiss, mounted])

    if (!mounted) return null

    const modalRoot = document.getElementById('modal-root')
    if (!modalRoot) return null

    return createPortal(
        <dialog
            ref={dialogRef}
            className="backdrop:bg-black backdrop:bg-opacity-70 rounded-lg relative text-xl font-medium max-w-none p-0 border-none"
            onClose={onDismiss}
        >
            <div className="p-20 relative">
                {children}
                <button
                    onClick={onDismiss}
                    className="absolute top-2 right-2 w-12 h-12 bg-transparent border-none rounded-full flex items-center justify-center text-2xl font-medium cursor-pointer"
                    aria-label="Close modal"
                >
                    ×
                </button>
            </div>
        </dialog>,
        modalRoot
    )
}

'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const ICON_SIZE = 16

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={'sm'}>
                    {theme === 'light' ? (
                        <LightModeOutlinedIcon
                            key="light"
                            sx={{ fontSize: ICON_SIZE }}
                            className={'text-muted-foreground'}
                        />
                    ) : theme === 'dark' ? (
                        <DarkModeOutlinedIcon
                            key="dark"
                            sx={{ fontSize: ICON_SIZE }}
                            className={'text-muted-foreground'}
                        />
                    ) : (
                        <LaptopOutlinedIcon
                            key="system"
                            sx={{ fontSize: ICON_SIZE }
                            className={'text-muted-foreground'}
                        />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-content" align="start">
                <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(e) => setTheme(e)}
                >
                    <DropdownMenuRadioItem className="flex gap-2" value="light">
                        <LightModeOutlinedIcon
                            key="light"
                            sx={{ fontSize: ICON_SIZE }}
                            className={'text-muted-foreground'}
                        />{' '}
                        <span>Claro</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className="flex gap-2" value="dark">
                        <DarkModeOutlinedIcon
                            key="dark"
                            sx={{ fontSize: ICON_SIZE }}
                            className={'text-muted-foreground'}
                        />{' '}
                        <span>Escuro</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        className="flex gap-2"
                        value="system"
                    >
                        <LaptopOutlinedIcon
                            key="system"
                            sx={{ fontSize: ICON_SIZE }}
                            className={'text-muted-foreground'}
                        />{' '}
                        <span>Sistema</span>

                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { ThemeSwitcher }

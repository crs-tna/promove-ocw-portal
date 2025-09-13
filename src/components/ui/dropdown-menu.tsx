'use client'

import { useState } from 'react'
import {
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    Checkbox,
    Radio,
    ListSubheader,
} from '@mui/material'
import { Check } from 'lucide-react'

export function DropdownMenuDemo() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <div>
            <button onClick={handleOpen}>Abrir menu</button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <ListSubheader>Opções</ListSubheader>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Checkbox size="small" />
                    </ListItemIcon>
                    Tema escuro
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Radio checked size="small" />
                    </ListItemIcon>
                    Tema claro
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Check size={16} />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </div>
    )
}

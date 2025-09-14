'use client'

import * as React from 'react'
import { Checkbox as MUICheckbox } from '@mui/material'
import { Check } from 'lucide-react'

export interface CheckboxProps {
    id: string
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => void
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    ({ ...props }, ref) => {
        return (
            <MUICheckbox
                ref={ref}
                checkedIcon={
                    <Check className="h-4 w-4 text-primary-foreground" />
                }
                icon={<span className="h-4 w-4" />}
                {...props}
            />
        )
    }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }

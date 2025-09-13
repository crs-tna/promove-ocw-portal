'use client'

import * as React from 'react'
import { Checkbox as MUICheckbox } from '@mui/material'
import { Check } from 'lucide-react'

import { cn } from '@/src/common/lib/utils'

export interface CheckboxProps {
    className?: string
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => void
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    ({ className, ...props }, ref) => {
        return (
            <MUICheckbox
                ref={ref}
                className={cn(
                    'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow ' +
                        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ' +
                        'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
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

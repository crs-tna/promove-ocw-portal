'use client'

import * as React from 'react'
import { FormLabel } from '@mui/material'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/src/common/lib/utils'

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
    HTMLLabelElement,
    React.ComponentProps<typeof FormLabel> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <FormLabel
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    />
))

Label.displayName = 'Label'

export { Label }

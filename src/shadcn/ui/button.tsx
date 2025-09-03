import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shadcn/lib/utils'
import Link from "next/link";
import ToolTip from '@/components/ToolTip'
import { SheetClose } from './sheet'
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        close:
          'absolute top-0 shadow-sm hover:bg-close-hover bg-close group-hover:h-6 group-hover:items-end group-hover:pb-1 [&_svg]:size-3 text-white p-2',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        close: 'max-h-8 h-4 w-4 rounded-none rounded-b-[30px]',
        add: 'h-8 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  method?: string
  toolTip?: string
  onSheet?: boolean
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, href, method, toolTip, onSheet, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : href ? Link : 'button'

    const buttonProps = {
      className: cn(buttonVariants({ variant, size, className })),
      ref: ref as any, // TypeScript workaround for ref compatibility
      method: method as any,
      ...(href ? { href: href as string } : {}),
      ...props,
    }
    //@ts-ignore ( dont think very important )
    const buttonContent = <Comp {...buttonProps} />

    if (toolTip) {
      return <ToolTip toolTipContent={toolTip}>{buttonContent}</ToolTip>
    }

    if (onSheet) {
      return <SheetClose asChild>{buttonContent}</SheetClose>
    }

    return buttonContent
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }

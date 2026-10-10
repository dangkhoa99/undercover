import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import React from 'react'

/**
 * Capsule "liquid glass" buttons. Like iOS, a pressed button grows (springy overshoot easing)
 * instead of shrinking; icon-only sizes grow more because they are small.
 */
const buttonVariants = cva(
  cn(
    'group/button inline-flex shrink-0 items-center justify-center',
    'rounded-full text-sm font-medium whitespace-nowrap',
    'transition-[transform,background,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
    'outline-none select-none',
    'focus-visible:ring-3 focus-visible:ring-ring/50',
    'active:scale-[1.04]',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-invalid:ring-3 aria-invalid:ring-destructive/40',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: 'glass-prominent text-primary-foreground',
        outline: 'glass',
        secondary: 'glass text-secondary-foreground',
        ghost: 'hover:bg-subtle hover:text-foreground aria-expanded:bg-subtle',
        destructive: 'glass-destructive text-destructive focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: cn(
          'h-8 gap-1.5 px-3',
          'has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
        ),
        xs: cn(
          'h-6 gap-1 px-2.5 text-xs',
          'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
          "[&_svg:not([class*='size-'])]:size-3",
        ),
        sm: cn(
          'h-7 gap-1 px-3 text-[0.8rem]',
          'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
          "[&_svg:not([class*='size-'])]:size-3.5",
        ),
        lg: cn(
          'h-9 gap-1.5 px-3',
          'has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
        ),
        icon: 'size-8 active:scale-110',
        'icon-xs': "size-6 active:scale-110 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-7 active:scale-110',
        'icon-lg': 'size-9 active:scale-110',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

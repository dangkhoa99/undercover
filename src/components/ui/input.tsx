import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from 'cn'
import React from 'react'

/**
 * Text inputs here are names and guesses: browser autofill, spell-check and autocorrect only get
 * in the way (and password managers pop up on any text field), so they are off unless overridden.
 */
const Input: React.FC<React.ComponentProps<'input'>> = ({ className, type, ...props }) => {
  return (
    <InputPrimitive
      type={type}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      data-1p-ignore
      data-lpignore="true"
      data-form-type="other"
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-xl px-3 py-1 text-base md:text-sm',
        'glass-inset transition-shadow outline-none',
        'file:inline-flex file:h-6 file:border-0 file:bg-transparent',
        'file:text-sm file:font-medium file:text-foreground',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-3 focus-visible:ring-ring/50',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-3 aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  )
}

export { Input }

import React from 'react'

import { motion, type HTMLMotionProps } from 'motion/react'

import { PRESS_SCALE } from '@/const/motion'
import { cn } from '@/helpers/utils'

/**
 * Round "liquid glass" icon button (see `.glass` in index.css). Like iOS it grows under the
 * finger with a springy overshoot rather than shrinking.
 */
export const GlassButton: React.FC<HTMLMotionProps<'button'>> = ({ className, ...props }) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: PRESS_SCALE.SCALE }}
      transition={PRESS_SCALE.SPRING}
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full',
        'text-foreground glass',
        'outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg:not([class*="size-"])]:size-5',
        className,
      )}
      {...props}
    />
  )
}

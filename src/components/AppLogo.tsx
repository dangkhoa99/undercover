import React from 'react'

import { APP_LOGO_SRC } from '@/const/ui'
import { cn } from '@/helpers/utils'

interface AppLogoProps {
  className?: string
}

/** The app icon (hat over a mask) shown large on the home page. */
export const AppLogo: React.FC<AppLogoProps> = ({ className }) => {
  return (
    <img
      src={APP_LOGO_SRC}
      alt=""
      aria-hidden
      className={cn('size-28 rounded-3xl object-cover glass', className)}
    />
  )
}

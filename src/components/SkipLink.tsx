import React from 'react'
import { useTranslation } from 'react-i18next'

import { MAIN_CONTENT_ID } from '@/const/ui'
import { cn } from '@/helpers/utils'

/** First focusable element: hidden until focused, then jumps past the header to `<main>`. */
export const SkipLink: React.FC = () => {
  const { t } = useTranslation()

  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100',
        'focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:glass-heavy',
        'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
      )}
    >
      {t('a11y.skipToContent')}
    </a>
  )
}

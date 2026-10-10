import React from 'react'
import { useTranslation } from 'react-i18next'

import { TriangleAlert } from 'lucide-react'

import { cn } from '@/helpers/utils'

/** Alert shown when the new word pair repeats a recent one. */
export const RepeatWarning: React.FC = () => {
  const { t } = useTranslation()

  return (
    <p
      role="alert"
      className={cn(
        'flex items-start gap-2 rounded-lg px-3 py-2',
        'text-sm',
        'bg-warning/15 text-warning',
      )}
    >
      <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />

      {t('play.cards.wordRepeated')}
    </p>
  )
}

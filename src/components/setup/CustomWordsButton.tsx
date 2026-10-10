import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/const/routes'
import { cn } from '@/helpers/utils'
import type { Language } from '@/i18n'
import { useGameStore } from '@/store/gameStore'

interface CustomWordsButtonProps {
  className?: string
}

export const CustomWordsButton: React.FC<CustomWordsButtonProps> = ({ className }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const customCount = useGameStore((s) => s.customWords[i18n.resolvedLanguage as Language].length)

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn('h-12 justify-between px-5', className)}
      onClick={() => void navigate(ROUTES.WORDS)}
    >
      {t('words.custom.button')}

      <span className="text-muted-foreground">{t('words.count', { count: customCount })}</span>
    </Button>
  )
}

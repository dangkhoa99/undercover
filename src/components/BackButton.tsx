import React from 'react'
import { useTranslation } from 'react-i18next'

import { ChevronLeft } from 'lucide-react'

import { GlassButton } from '@/components/GlassButton'

interface BackButtonProps {
  onClick: () => void
}

/** Round glass "go back" chevron shared by every page that has a previous screen. */
export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <GlassButton aria-label={t('common.back')} onClick={onClick}>
      <ChevronLeft className="-ml-0.5 size-6" />
    </GlassButton>
  )
}

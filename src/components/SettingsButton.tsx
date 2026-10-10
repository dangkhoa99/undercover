import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Settings } from 'lucide-react'

import { GlassButton } from '@/components/GlassButton'
import { ROUTES } from '@/const/routes'

/** Header shortcut to the settings page. */
export const SettingsButton: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <GlassButton aria-label={t('settings.open')} onClick={() => void navigate(ROUTES.SETTINGS)}>
      <Settings />
    </GlassButton>
  )
}

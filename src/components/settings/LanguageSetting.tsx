import React from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SettingRow } from '@/components/settings/SettingRow'

export const LanguageSetting: React.FC = () => {
  const { t } = useTranslation()

  return (
    <SettingRow label={t('language.label')}>
      <LanguageSwitcher />
    </SettingRow>
  )
}

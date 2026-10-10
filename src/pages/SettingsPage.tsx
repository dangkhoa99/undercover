import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Frame } from '@/components/Frame'
import { ClearDataSection } from '@/components/settings/ClearDataSection'
import { LanguageSetting } from '@/components/settings/LanguageSetting'
import { SoundSetting } from '@/components/settings/SoundSetting'
import { ThemeSetting } from '@/components/settings/ThemeSetting'
import { TimerSetting } from '@/components/settings/TimerSetting'
import { Card, CardContent } from '@/components/ui/card'

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Frame onBack={() => void navigate(-1)} title={t('settings.title')}>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <LanguageSetting />

          <ThemeSetting />

          <TimerSetting />

          <SoundSetting />
        </CardContent>
      </Card>

      <ClearDataSection />
    </Frame>
  )
}

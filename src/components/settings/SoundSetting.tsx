import React from 'react'
import { useTranslation } from 'react-i18next'

import { Volume2, VolumeX } from 'lucide-react'

import { SettingRow } from '@/components/settings/SettingRow'
import { Button } from '@/components/ui/button'
import { useSettingsStore } from '@/store/settingsStore'

export const SoundSetting: React.FC = () => {
  const { t } = useTranslation()

  const sound = useSettingsStore((s) => s.sound)
  const setSound = useSettingsStore((s) => s.setSound)

  return (
    <SettingRow label={t('settings.sound')}>
      <Button
        variant="outline"
        size="lg"
        aria-pressed={sound}
        aria-label={t('settings.sound')}
        onClick={() => setSound(!sound)}
      >
        {sound ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}

        {sound ? t('settings.on') : t('settings.off')}
      </Button>
    </SettingRow>
  )
}

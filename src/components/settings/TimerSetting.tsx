import React from 'react'
import { useTranslation } from 'react-i18next'

import { SettingRow } from '@/components/settings/SettingRow'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GAME } from '@/const/game'
import { useSettingsStore } from '@/store/settingsStore'

export const TimerSetting: React.FC = () => {
  const { t } = useTranslation()

  const seconds = useSettingsStore((s) => s.describeSeconds)
  const setSeconds = useSettingsStore((s) => s.setDescribeSeconds)

  const labels = Object.fromEntries(
    GAME.TIMER_OPTIONS.map((s) => [
      String(s),
      s === 0 ? t('settings.timer.off') : t('settings.timer.seconds', { count: s }),
    ]),
  )

  return (
    <SettingRow label={t('settings.timer.label')}>
      <Select
        items={labels}
        value={String(seconds)}
        onValueChange={(value) => setSeconds(Number(value))}
      >
        <SelectTrigger aria-label={t('settings.timer.label')}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {GAME.TIMER_OPTIONS.map((s) => (
            <SelectItem key={s} value={String(s)}>
              {labels[String(s)]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingRow>
  )
}

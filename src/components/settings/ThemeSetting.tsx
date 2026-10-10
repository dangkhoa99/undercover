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
import { THEME, type Theme } from '@/const/theme'
import { useSettingsStore } from '@/store/settingsStore'

export const ThemeSetting: React.FC = () => {
  const { t } = useTranslation()

  const theme = useSettingsStore((s) => s.theme)
  const setTheme = useSettingsStore((s) => s.setTheme)

  const labels: Record<Theme, string> = {
    [THEME.DARK]: t('settings.theme.dark'),
    [THEME.LIGHT]: t('settings.theme.light'),
  }

  return (
    <SettingRow label={t('settings.theme.label')}>
      <Select items={labels} value={theme} onValueChange={(value) => setTheme(value as Theme)}>
        <SelectTrigger aria-label={t('settings.theme.label')}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {Object.values(THEME).map((value) => (
            <SelectItem key={value} value={value}>
              {labels[value]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingRow>
  )
}

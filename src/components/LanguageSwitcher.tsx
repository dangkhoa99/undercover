import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Language } from '@/i18n'
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from '@/const/languages'

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation()

  return (
    <Select
      items={LANGUAGE_LABELS}
      value={i18n.resolvedLanguage as Language}
      onValueChange={(lng) => void i18n.changeLanguage(lng as Language)}
    >
      <SelectTrigger aria-label={t('language.label')} className="data-[size=default]:h-10">
        <SelectValue translate="no" />
      </SelectTrigger>

      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lng) => (
          <SelectItem key={lng} value={lng} translate="no">
            {LANGUAGE_LABELS[lng]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

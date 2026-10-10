import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { SUPPORTED_LANGUAGES } from '@/const/languages'
import { STORAGE } from '@/const/storage'

import en from './locales/en.json'
import vi from './locales/vi.json'

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, vi: { translation: vi } },
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    // Locale files are flat ("a.b.c": "text"), so dots are part of the key, not nesting.
    keySeparator: false,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE.LANGUAGE_KEY,
      caches: ['localStorage'],
    },
  })

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})
document.documentElement.lang = i18n.resolvedLanguage ?? 'en'

export default i18n

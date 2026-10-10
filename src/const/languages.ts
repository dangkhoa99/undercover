export const SUPPORTED_LANGUAGES = ['en', 'vi'] as const

export const LANGUAGE_LABELS: Record<(typeof SUPPORTED_LANGUAGES)[number], string> = {
  en: 'English',
  vi: 'Tiếng Việt',
}

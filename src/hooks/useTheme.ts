import { useEffect } from 'react'

import { APP_BG_VAR, DARK_CLASS, THEME, THEME_COLOR_META } from '@/const/theme'
import { useSettingsStore } from '@/store/settingsStore'

/** Applies the chosen theme to <html> and keeps the browser's theme-color meta in sync. */
export const useTheme = () => {
  const theme = useSettingsStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle(DARK_CLASS, theme === THEME.DARK)

    const appBg = getComputedStyle(root).getPropertyValue(APP_BG_VAR).trim()
    const meta = document.querySelector(THEME_COLOR_META)

    if (meta && appBg) {
      meta.setAttribute('content', appBg)
    }

    return () => {}
  }, [theme])
}

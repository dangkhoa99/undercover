export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const

export type Theme = (typeof THEME)[keyof typeof THEME]

export const DEFAULT_THEME: Theme = THEME.DARK

/** Class on <html> that switches the CSS variables to the dark palette. */
export const DARK_CLASS = 'dark'

export const THEME_COLOR_META = 'meta[name="theme-color"]'
export const APP_BG_VAR = '--app-bg'

export const ROUTES = {
  HOME: '/',
  SETUP: '/setup',
  PLAY: '/play',
  GROUPS: '/groups',
  GROUP_NEW: '/groups/new',
  GROUP_EDIT: '/groups/:id',
  WORDS: '/words',
  RULES: '/rules',
  SETTINGS: '/settings',
} as const

/** Path of the edit page for one group. */
export const groupEditPath = (id: string) => `/groups/${id}`

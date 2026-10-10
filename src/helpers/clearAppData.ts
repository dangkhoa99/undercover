import { clear } from 'idb-keyval'

import { ROUTES } from '@/const/routes'

/** Wipes every saved game, group, custom word and setting, then reloads the app from the home page. */
export const clearAppData = async () => {
  await clear()
  localStorage.clear()
  window.location.assign(ROUTES.HOME)
}

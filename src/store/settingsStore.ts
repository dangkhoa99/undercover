import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { GAME } from '@/const/game'
import { STORAGE } from '@/const/storage'
import { DEFAULT_THEME, type Theme } from '@/const/theme'

interface SettingsStore {
  /** Seconds each player gets to describe their word; 0 = no timer. */
  describeSeconds: number
  sound: boolean
  theme: Theme
  setDescribeSeconds: (seconds: number) => void
  setSound: (on: boolean) => void
  setTheme: (theme: Theme) => void
}

/** Small preferences that survive reloads; independent from the game itself. */
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      describeSeconds: GAME.DEFAULT_DESCRIBE_SECONDS,
      sound: GAME.DEFAULT_SOUND,
      theme: DEFAULT_THEME,
      setDescribeSeconds: (describeSeconds) => set({ describeSeconds }),
      setSound: (sound) => set({ sound }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: STORAGE.SETTINGS_KEY },
  ),
)

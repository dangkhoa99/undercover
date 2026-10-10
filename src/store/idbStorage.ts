import type { StateStorage } from 'zustand/middleware'

import { del, get, set } from 'idb-keyval'

/** Async Zustand storage backed by IndexedDB. */
export const idbStorage: StateStorage = {
  getItem: async (name) => (await get<string>(name)) ?? null,
  setItem: (name, value) => set(name, value),
  removeItem: (name) => del(name),
}

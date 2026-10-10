import { useSyncExternalStore } from 'react'

import { useGameStore } from '@/store/gameStore'

const subscribe = (onChange: () => void) => useGameStore.persist.onFinishHydration(onChange)
const getSnapshot = () => useGameStore.persist.hasHydrated()

/** False until the persisted game state has been read from IndexedDB. */
export const useHydrated = (): boolean => useSyncExternalStore(subscribe, getSnapshot)

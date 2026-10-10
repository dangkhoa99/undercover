import { useEffect, useState } from 'react'

import { GAME } from '@/const/game'

/** Counts down once per second from `seconds`, restarting whenever `resetKey` changes. */
export const useCountdown = (seconds: number, resetKey: unknown) => {
  const [state, setState] = useState({ key: resetKey, left: seconds })

  // Restart during render when the speaker (key) changes, so no stale frame shows the old value.
  if (state.key !== resetKey) {
    setState({ key: resetKey, left: seconds })
  }

  useEffect(() => {
    if (state.left <= 0) {
      return () => {}
    }

    const id = setTimeout(
      () => setState({ key: state.key, left: state.left - 1 }),
      GAME.COUNTDOWN_TICK_MS,
    )

    return () => clearTimeout(id)
  }, [state])

  return state.left
}

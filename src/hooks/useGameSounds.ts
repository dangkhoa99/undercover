import { useEffect, useRef } from 'react'

import { SOUND } from '@/const/audio'
import { PHASE } from '@/const/phases'
import { playSound } from '@/helpers/sound'
import { useGameStore } from '@/store/gameStore'

/** Plays a sound when a card is revealed, when someone is voted out and when the game ends. */
export const useGameSounds = () => {
  const phase = useGameStore((s) => s.game?.phase)
  const revealed = useGameStore((s) => s.game?.players.filter((p) => p.revealed).length ?? 0)
  const previous = useRef({ phase, revealed })

  useEffect(() => {
    const before = previous.current
    previous.current = { phase, revealed }

    if (revealed > before.revealed) {
      playSound(SOUND.FLIP)
    }
    if (phase === before.phase) {
      return () => {}
    }
    if (phase === PHASE.ELIMINATION) {
      playSound(SOUND.ELIMINATE)
    }
    if (phase === PHASE.FINISHED) {
      playSound(SOUND.WIN)
    }

    return () => {}
  }, [phase, revealed])
}

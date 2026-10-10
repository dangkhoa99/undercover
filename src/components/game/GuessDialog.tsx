import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PlayerDialog } from '@/components/game/PlayerDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGameStore } from '@/store/gameStore'

/** Mr. White's last chance: guess the Civilian word. */
export const GuessDialog: React.FC = () => {
  const { t } = useTranslation()
  const game = useGameStore((s) => s.game)
  const send = useGameStore((s) => s.send)
  const [guess, setGuess] = useState('')
  const guessRef = useRef<HTMLInputElement>(null)

  if (!game) {
    return null
  }

  const seat = game.players.findIndex((p) => p.id === game.pendingGuesser)
  const guesser = game.players[seat]

  if (!guesser) {
    return null
  }

  const submit = () => {
    send({ type: 'SUBMIT_GUESS', guess })
  }

  return (
    <PlayerDialog
      open
      initialFocus={guessRef}
      name={guesser.name}
      seat={seat}
      title={t('play.guess.title')}
      description={t('play.guess.hint', { name: guesser.name })}
      body={
        <Input
          ref={guessRef}
          name="guess"
          aria-label={t('play.guess.title')}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={t('play.guess.placeholder')}
          className="h-11 text-center text-base"
        />
      }
      actions={
        <Button size="lg" className="h-11" onClick={submit}>
          {t('play.guess.submit')}
        </Button>
      }
    />
  )
}

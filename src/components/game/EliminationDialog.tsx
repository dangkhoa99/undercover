import React from 'react'
import { useTranslation } from 'react-i18next'

import { PlayerDialog } from '@/components/game/PlayerDialog'
import { Button } from '@/components/ui/button'
import { ROLE_COLOR } from '@/const/roleColor'
import { cn } from '@/helpers/utils'
import { useGameStore } from '@/store/gameStore'

/** Announces who was ousted and which role they held. */
export const EliminationDialog: React.FC = () => {
  const { t } = useTranslation()
  const game = useGameStore((s) => s.game)
  const send = useGameStore((s) => s.send)

  const last = game?.history.at(-1)

  if (!game || !last) {
    return null
  }

  const seat = game.players.findIndex((p) => p.id === last.playerId)
  const ousted = game.players[seat]

  if (!ousted) {
    return null
  }

  const handleNext = () => {
    send({ type: 'NEXT_ROUND' })
  }

  return (
    <PlayerDialog
      open
      outRole={last.role}
      name={ousted.name}
      seat={seat}
      title={t(`play.elimination.${last.role}`)}
      description={
        last.guess !== null && t('play.elimination.wrongGuess', { guess: last.guess.trim() || '—' })
      }
      body={
        <>
          <p className="text-xl font-bold">{ousted.name}</p>

          <p className={cn('font-semibold', ROLE_COLOR[last.role])}>{t(`roles.${last.role}`)}</p>
        </>
      }
      actions={
        <Button size="lg" className="h-11" onClick={handleNext}>
          {t('play.elimination.next')}
        </Button>
      }
    />
  )
}

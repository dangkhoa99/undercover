import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EliminationDialog } from '@/components/game/EliminationDialog'
import { GuessDialog } from '@/components/game/GuessDialog'
import { PlayerCard } from '@/components/game/PlayerCard'
import { PlayerDialog } from '@/components/game/PlayerDialog'
import { Screen } from '@/components/game/Screen'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GAME_PHASE } from '@/const/gameUi'
import { seatingOrder } from '@/game/engine'
import type { GameState } from '@/game/types'
import { cn } from '@/helpers/utils'
import { useGameStore } from '@/store/gameStore'

interface VoteScreenContentProps {
  game: GameState
}

const VoteScreenContent: React.FC<VoteScreenContentProps> = ({ game }) => {
  const { t } = useTranslation()
  const send = useGameStore((s) => s.send)
  const [targetId, setTargetId] = useState<string | null>(null)

  const targetSeat = game.players.findIndex((p) => p.id === targetId)
  const target = game.players[targetSeat]
  const voting = game.phase === GAME_PHASE.VOTE

  const badge = useMemo(
    () => (
      <Badge
        aria-hidden
        className={cn(
          'absolute top-0 left-1/2 z-10 -translate-x-1/2',
          'bg-eliminate text-on-eliminate',
        )}
      >
        {t('play.vote.eliminate')}
      </Badge>
    ),
    [t],
  )

  const handleSelect = useCallback((id: string) => {
    setTargetId(id)
  }, [])

  const handleDescribeAgain = () => {
    send({ type: 'DESCRIBE_AGAIN' })
  }

  const handleEliminate = () => {
    if (!target) {
      return
    }

    send({ type: 'ELIMINATE', playerId: target.id })
    setTargetId(null)
  }

  return (
    <Screen
      title={t('play.vote.title')}
      subtitle={t('play.vote.hint')}
      footer={
        <Button
          size="lg"
          variant="secondary"
          className="h-12 w-full text-base"
          disabled={!voting}
          onClick={handleDescribeAgain}
        >
          {t('play.vote.describeAgain')}
        </Button>
      }
    >
      <ul className="grid grid-cols-3 gap-3">
        {seatingOrder(game).map((p) => (
          <PlayerCard
            key={p.id}
            player={p}
            seat={game.players.indexOf(p)}
            onSelect={voting ? handleSelect : undefined}
            badge={badge}
          />
        ))}
      </ul>

      <PlayerDialog
        open={voting && target !== undefined}
        onDismiss={() => setTargetId(null)}
        name={target?.name ?? ''}
        seat={targetSeat}
        title={t('play.vote.confirm', { name: target?.name })}
        actions={
          <>
            <Button variant="outline" size="lg" className="h-11" onClick={() => setTargetId(null)}>
              {t('common.cancel')}
            </Button>

            <Button variant="destructive" size="lg" className="h-11" onClick={handleEliminate}>
              {t('play.vote.eliminate')}
            </Button>
          </>
        }
      />

      {game.phase === GAME_PHASE.GUESS && <GuessDialog />}

      {game.phase === GAME_PHASE.ELIMINATION && <EliminationDialog />}
    </Screen>
  )
}

/**
 * Open vote: the group points fingers together, the host ousts the chosen player.
 * Also the backdrop for the elimination and Mr. White guess dialogs, so the
 * grid stays put while the outcome is announced.
 */
export const VoteScreen: React.FC = () => {
  const game = useGameStore((s) => s.game)

  if (!game) {
    return null
  }

  return <VoteScreenContent game={game} />
}

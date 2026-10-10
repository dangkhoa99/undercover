import React from 'react'

import { ScoreRow } from '@/components/game/result/ScoreRow'
import { computeScores } from '@/game/engine'
import { memberScore, type Group } from '@/game/groups'
import type { GameState } from '@/game/types'
import { cn } from '@/helpers/utils'

interface ScoreBoardProps {
  game: GameState
  /** When set, totals are the group's running scores instead of this game's gains. */
  group?: Group
  /** While true the rows stay hidden (splash still showing). */
  hidden: boolean
  className?: string
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ game, group, hidden, className }) => {
  const gains = computeScores(game)
  const totals = Object.fromEntries(
    game.players.map((p) => [p.id, group ? memberScore(group, p.name) : gains[p.id]]),
  )
  const ranked = [...game.players].sort((a, b) => totals[b.id] - totals[a.id])
  const best = Math.max(1, ...Object.values(totals))

  return (
    <ul className={cn('flex flex-col gap-2', className)}>
      {ranked.map((p, rank) => (
        <ScoreRow
          key={p.id}
          player={p}
          index={game.players.indexOf(p)}
          rank={rank}
          total={totals[p.id]}
          gain={gains[p.id]}
          best={best}
          outRound={game.history.find((e) => e.playerId === p.id)?.round}
          hidden={hidden}
        />
      ))}
    </ul>
  )
}

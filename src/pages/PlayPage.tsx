import React from 'react'
import { Navigate } from 'react-router-dom'

import { CardsScreen } from '@/components/game/CardsScreen'
import { DescribeScreen } from '@/components/game/DescribeScreen'
import { ResultScreen } from '@/components/game/ResultScreen'
import { VoteScreen } from '@/components/game/VoteScreen'
import { PHASE } from '@/const/phases'
import { ROUTES } from '@/const/routes'
import { useGameSounds } from '@/hooks/useGameSounds'
import type { GameState, Phase } from '@/game/types'
import { useGameStore } from '@/store/gameStore'

const SCREENS: Record<Phase, (game: GameState) => React.ReactElement> = {
  [PHASE.REVEAL]: () => <CardsScreen />,
  // Fresh state per ordering so a re-described round starts clean.
  [PHASE.DESCRIBE]: (game) => <DescribeScreen key={game.speakingOrder.join()} />,
  [PHASE.VOTE]: () => <VoteScreen />,
  [PHASE.GUESS]: () => <VoteScreen />,
  [PHASE.ELIMINATION]: () => <VoteScreen />,
  [PHASE.FINISHED]: () => <ResultScreen />,
}

export const PlayPage: React.FC = () => {
  const game = useGameStore((s) => s.game)

  useGameSounds()

  if (!game) {
    return <Navigate to={ROUTES.SETUP} replace />
  }

  return SCREENS[game.phase](game)
}

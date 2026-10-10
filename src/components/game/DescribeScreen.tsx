import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PlayerCard } from '@/components/game/PlayerCard'
import { Screen } from '@/components/game/Screen'
import { SpeakerBar } from '@/components/game/SpeakerBar'
import { TurnBadge } from '@/components/game/TurnBadge'
import { Button } from '@/components/ui/button'
import { seatingOrder } from '@/game/engine'
import type { GameState } from '@/game/types'
import { useGameStore } from '@/store/gameStore'
import { useSettingsStore } from '@/store/settingsStore'

interface DescribeScreenContentProps {
  game: GameState
}

const DescribeScreenContent: React.FC<DescribeScreenContentProps> = ({ game }) => {
  const { t } = useTranslation()
  const send = useGameStore((s) => s.send)
  const seconds = useSettingsStore((s) => s.describeSeconds)
  const [current, setCurrent] = useState(0)

  const speakers = game.speakingOrder.flatMap((id) => game.players.find((p) => p.id === id) ?? [])
  const speaker = speakers[current]

  const cards = useMemo(
    () =>
      seatingOrder(game).map((p, turn) => (
        <PlayerCard
          key={p.id}
          player={p}
          seat={game.players.indexOf(p)}
          badge={<TurnBadge turn={turn} active={turn === current} />}
        />
      )),
    [game, current],
  )

  const handleNext = useCallback(() => {
    setCurrent((c) => c + 1)
  }, [])

  const handleStartVote = () => {
    send({ type: 'START_VOTE' })
  }

  return (
    <Screen
      title={t('play.describe.title')}
      subtitle={t('play.describe.rule')}
      footer={
        <Button size="lg" className="h-12 w-full text-base" onClick={handleStartVote}>
          {t('play.describe.goToVote')}
        </Button>
      }
    >
      {seconds > 0 && speaker && (
        <SpeakerBar
          name={speaker.name}
          turn={current}
          seconds={seconds}
          isLast={current >= speakers.length - 1}
          onNext={handleNext}
        />
      )}

      <ul className="grid grid-cols-3 gap-3">{cards}</ul>
    </Screen>
  )
}

/** Grid stays in seat order all game; the badge shows each living player's speaking turn. */
export const DescribeScreen: React.FC = () => {
  const game = useGameStore((s) => s.game)

  if (!game) {
    return null
  }

  return <DescribeScreenContent game={game} />
}

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ArrowRight, House } from 'lucide-react'

import { ScoreBoard } from '@/components/game/result/ScoreBoard'
import { WinnerSplash } from '@/components/game/result/WinnerSplash'
import { Screen } from '@/components/game/Screen'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/const/routes'
import type { GameState, Team } from '@/game/types'
import type { Language } from '@/i18n'
import { useGameStore } from '@/store/gameStore'

interface ResultScreenContentProps {
  game: GameState
  winner: Team
}

const ResultScreenContent: React.FC<ResultScreenContentProps> = ({ game, winner }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const group = useGameStore((s) => s.groups.find((g) => g.id === s.groupId))
  const startGame = useGameStore((s) => s.startGame)
  const endGame = useGameStore((s) => s.endGame)
  const [splash, setSplash] = useState(true)

  const title = t(`play.result.${winner}`)

  const handleHome = () => {
    endGame()
    void navigate(ROUTES.HOME)
  }

  const handlePlayAgain = () => {
    startGame(i18n.resolvedLanguage as Language)
  }

  return (
    <Screen
      title={title}
      hideStatus
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" variant="outline" className="h-12 text-base" onClick={handleHome}>
            <House aria-hidden data-icon="inline-start" />
            {t('play.result.home')}
          </Button>

          <Button size="lg" className="h-12 text-base" onClick={handlePlayAgain}>
            {t('play.result.playAgain')}
            <ArrowRight aria-hidden data-icon="inline-end" />
          </Button>
        </div>
      }
    >
      <Card size="sm">
        <CardContent className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">{t('play.result.civilianWord')}</p>

            <p className="text-xl font-bold break-words text-civilian">{game.civilianWord}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">{t('play.result.undercoverWord')}</p>

            <p className="text-xl font-bold break-words text-undercover">{game.undercoverWord}</p>
          </div>
        </CardContent>
      </Card>

      <ScoreBoard game={game} group={group} hidden={splash} />

      <WinnerSplash winner={winner} title={title} open={splash} onOpenChange={setSplash} />
    </Screen>
  )
}

export const ResultScreen: React.FC = () => {
  const game = useGameStore((s) => s.game)

  if (!game?.winner) {
    return null
  }

  return <ResultScreenContent game={game} winner={game.winner} />
}

import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CardGrid } from '@/components/game/CardGrid'
import { ChangeWordButton } from '@/components/game/ChangeWordButton'
import { PickDialog, type Picked } from '@/components/game/PickDialog'
import { PlayerDialog } from '@/components/game/PlayerDialog'
import { RepeatWarning } from '@/components/game/RepeatWarning'
import { Screen } from '@/components/game/Screen'
import { Button } from '@/components/ui/button'
import { PICK_STEP } from '@/const/gameUi'
import { unclaimedNames } from '@/game/groups'
import { validatePlayerName } from '@/game/names'
import type { GameState, Player } from '@/game/types'
import type { Language } from '@/i18n'
import { useGameStore } from '@/store/gameStore'

interface CardsScreenContentProps {
  game: GameState
}

const CardsScreenContent: React.FC<CardsScreenContentProps> = ({ game }) => {
  const { t, i18n } = useTranslation()
  const send = useGameStore((s) => s.send)
  const pickQueue = useGameStore((s) => s.pickQueue)
  const wordRepeated = useGameStore((s) => s.wordRepeated)
  const startGame = useGameStore((s) => s.startGame)
  const [picked, setPicked] = useState<Picked | null>(null)
  const [announced, setAnnounced] = useState<string | null>(null)

  const taken = game.players.filter((p) => p.revealed).map((p) => p.name)
  const pickedIndex = game.players.findIndex((p) => p.id === picked?.playerId)
  const player = pickedIndex >= 0 ? game.players[pickedIndex] : null
  const nameError = picked ? validatePlayerName(picked.name, taken) : null
  // Group games call members up in a random order, so nobody types a name.
  const nextName = unclaimedNames(pickQueue, taken)[0]
  const announcing = nextName !== undefined && announced !== nextName && picked === null
  const nextSeat = game.players.findIndex((p) => !p.revealed)

  const handlePick = useCallback(
    (p: Player) => {
      setPicked({
        playerId: p.id,
        step: nextName ? PICK_STEP.WORD : PICK_STEP.NAME,
        name: nextName ?? '',
      })
    },
    [nextName],
  )

  const confirm = () => {
    if (!picked) {
      return
    }

    send({ type: 'CONFIRM_CARD', playerId: picked.playerId, name: picked.name })
    setPicked(null)
  }

  const changeWord = () => {
    startGame(i18n.resolvedLanguage as Language)
    setPicked(null)
    setAnnounced(null)
  }

  return (
    <Screen
      title={nextName ?? t('play.cards.player', { n: taken.length + 1 })}
      subtitle={t('play.cards.pick')}
      footer={
        <div className="flex flex-col gap-2">
          {wordRepeated && taken.length === 0 && <RepeatWarning />}

          <ChangeWordButton onConfirm={changeWord} />
        </div>
      }
    >
      <CardGrid players={game.players} onPick={handlePick} />

      <PlayerDialog
        open={announcing}
        name={nextName ?? ''}
        seat={nextSeat}
        title={nextName}
        description={t('play.cards.pick')}
        actions={
          <Button size="lg" className="h-11" onClick={() => setAnnounced(nextName)}>
            OK
          </Button>
        }
      />

      <PickDialog
        picked={picked}
        player={player}
        seat={pickedIndex}
        nameError={nameError}
        onChange={setPicked}
        onDismiss={() => setPicked(null)}
        onConfirm={confirm}
      />
    </Screen>
  )
}

/**
 * Each player takes one face-down card, enters their name and sees their word.
 * Nothing is committed to the game until the word dialog is dismissed with OK.
 */
export const CardsScreen: React.FC = () => {
  const game = useGameStore((s) => s.game)

  if (!game) {
    return null
  }

  return <CardsScreenContent game={game} />
}

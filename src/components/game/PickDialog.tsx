import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { NameInput } from '@/components/game/NameInput'
import { PlayerDialog } from '@/components/game/PlayerDialog'
import { Button } from '@/components/ui/button'
import { PICK_STEP } from '@/const/gameUi'
import type { NameError } from '@/game/names'
import type { Player } from '@/game/types'
import { cn } from '@/helpers/utils'

export interface Picked {
  playerId: string
  step: (typeof PICK_STEP)[keyof typeof PICK_STEP]
  name: string
}

interface PickDialogProps {
  picked: Picked | null
  player: Player | null
  seat: number
  nameError: NameError | null
  onChange: (picked: Picked) => void
  onDismiss: () => void
  onConfirm: () => void
}

/** Two-step dialog: enter a name, then see the secret word. */
export const PickDialog: React.FC<PickDialogProps> = ({
  picked,
  player,
  seat,
  nameError,
  onChange,
  onDismiss,
  onConfirm,
}) => {
  const { t } = useTranslation()
  const nameRef = useRef<HTMLInputElement>(null)

  const isNameStep = picked?.step === PICK_STEP.NAME

  const submitName = () => {
    if (!picked || nameError) {
      return
    }

    onChange({ ...picked, step: PICK_STEP.WORD })
  }

  const description = (() => {
    if (isNameStep) {
      return t('play.cards.nameHint')
    }

    return player?.word ? t('play.cards.yourWord') : t('play.cards.noWord')
  })()

  return (
    <PlayerDialog
      open={picked !== null}
      onDismiss={onDismiss}
      initialFocus={nameRef}
      name={picked?.name.trim() ?? ''}
      seat={seat}
      title={isNameStep ? t('play.cards.enterName') : picked?.name.trim()}
      description={description}
      body={
        isNameStep ? (
          <NameInput
            inputRef={nameRef}
            value={picked?.name ?? ''}
            error={nameError}
            onChange={(name) => picked && onChange({ ...picked, name })}
            onSubmit={submitName}
          />
        ) : (
          <p
            className={cn('rounded-2xl bg-subtle px-4 py-5', 'text-3xl font-extrabold break-words')}
          >
            {player?.word ?? t('play.cards.youAreMrWhite')}
          </p>
        )
      }
      actions={
        isNameStep ? (
          <Button size="lg" className="h-11" disabled={nameError !== null} onClick={submitName}>
            {t('play.cards.getWord')}
          </Button>
        ) : (
          <Button size="lg" className="h-11" onClick={onConfirm}>
            OK
          </Button>
        )
      }
    />
  )
}

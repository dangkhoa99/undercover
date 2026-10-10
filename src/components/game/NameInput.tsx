import React from 'react'
import { useTranslation } from 'react-i18next'

import { Input } from '@/components/ui/input'
import { PLAYER_NAME_MAX_LENGTH } from '@/const/gameUi'
import type { NameError } from '@/game/names'

interface NameInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  /** Shown under the field; the empty-name error stays silent (the submit button is disabled). */
  error: NameError | null
  /** Lets the surrounding dialog focus the field when it opens. */
  inputRef?: React.Ref<HTMLInputElement>
}

/** Body of every "enter a player name" dialog; the error line has a fixed height. */
export const NameInput: React.FC<NameInputProps> = ({
  value,
  onChange,
  onSubmit,
  error,
  inputRef,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Input
        ref={inputRef}
        name="playerName"
        aria-label={t('play.cards.enterName')}
        value={value}
        maxLength={PLAYER_NAME_MAX_LENGTH}
        placeholder={t('play.cards.namePlaceholder')}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        className="h-11 text-center text-base"
      />

      <p role="alert" className="min-h-5 text-sm text-destructive">
        {error === 'duplicateName' && t('play.cards.duplicateName')}
      </p>
    </>
  )
}

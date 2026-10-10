import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SOUND } from '@/const/audio'
import { SPEAKER_WARNING_SECONDS } from '@/const/gameUi'
import { playSound } from '@/helpers/sound'
import { cn } from '@/helpers/utils'
import { useCountdown } from '@/hooks/useCountdown'

interface SpeakerBarProps {
  /** Name of the player whose turn it is. */
  name: string
  /** Turn index; changing it restarts the countdown. */
  turn: number
  seconds: number
  isLast: boolean
  onNext: () => void
}

/** Shows whose turn it is, a countdown for that turn and a button to pass to the next speaker. */
export const SpeakerBar: React.FC<SpeakerBarProps> = ({ name, turn, seconds, isLast, onNext }) => {
  const { t } = useTranslation()
  const left = useCountdown(seconds, turn)

  useEffect(() => {
    if (left === 0) {
      playSound(SOUND.TIME_UP)
    } else if (left <= SPEAKER_WARNING_SECONDS && left < seconds) {
      playSound(SOUND.TICK)
    }

    return () => {}
  }, [left, seconds])

  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{t('play.describe.speaking')}</p>

          <p className="truncate text-lg font-bold">{name}</p>
        </div>

        <span
          aria-live="off"
          className={cn(
            'w-14 text-center text-2xl font-extrabold tabular-nums',
            left <= SPEAKER_WARNING_SECONDS && 'text-undercover',
          )}
        >
          {left}
        </span>

        <output className="sr-only">{left === 0 && t('play.describe.timeUp', { name })}</output>

        <Button disabled={isLast} onClick={onNext}>
          {t('play.describe.next')}
        </Button>
      </CardContent>
    </Card>
  )
}

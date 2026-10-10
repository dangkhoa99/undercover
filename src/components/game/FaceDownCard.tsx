import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import type { Player } from '@/game/types'
import { cn } from '@/helpers/utils'

interface FaceDownCardProps {
  /** Zero-based seat index; displayed as index + 1. */
  index: number
  player: Player
  onPick: (player: Player) => void
  className?: string
}

/** A face-down card a player taps to take their seat. */
const FaceDownCardView: React.FC<FaceDownCardProps> = ({ index, player, onPick, className }) => {
  const { t } = useTranslation()

  const handleClick = useCallback(() => {
    onPick(player)
  }, [onPick, player])

  return (
    <Button
      variant="ghost"
      aria-label={t('play.cards.card', { n: index + 1 })}
      className={cn(
        'relative aspect-[4/5] h-auto w-full rounded-2xl',
        'card-face hover:text-on-card',
        className,
      )}
      onClick={handleClick}
    >
      <span aria-hidden className="absolute top-2 left-3 text-sm font-bold opacity-70">
        {index + 1}
      </span>

      <span aria-hidden className="text-5xl leading-none font-black">
        ?
      </span>
    </Button>
  )
}

export const FaceDownCard = React.memo(FaceDownCardView)

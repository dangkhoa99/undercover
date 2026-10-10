import React from 'react'
import { useTranslation } from 'react-i18next'

import { motion } from 'motion/react'

import { TURN_BADGE } from '@/const/gameUi'
import { cn } from '@/helpers/utils'

interface TurnBadgeProps {
  /** Zero-based speaking turn; displayed as turn + 1. */
  turn: number
  /** Highlights the player currently speaking. */
  active: boolean
}

/** Numbered badge on an avatar showing the player's speaking turn. */
const TurnBadgeView: React.FC<TurnBadgeProps> = ({ turn, active }) => {
  const { t } = useTranslation()

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ...TURN_BADGE.SPRING, delay: turn * TURN_BADGE.STAGGER }}
      className={cn(
        TURN_BADGE.POSITION,
        'flex size-9 items-center justify-center rounded-full',
        'text-base font-extrabold tabular-nums ring-2 ring-background',
        active ? 'bg-primary text-primary-foreground' : 'bg-zinc-700 text-white',
      )}
    >
      <span className="sr-only">{t('play.turn', { n: turn + 1 })}</span>

      <span aria-hidden>{turn + 1}</span>
    </motion.span>
  )
}

export const TurnBadge = React.memo(TurnBadgeView)

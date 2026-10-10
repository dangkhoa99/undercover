import React from 'react'
import { useTranslation } from 'react-i18next'

import { motion } from 'motion/react'

import { Avatar } from '@/components/game/Avatar'
import { Badge } from '@/components/ui/badge'
import { PERCENT } from '@/const/app'
import { SCORE_ROW } from '@/const/gameUi'
import { ROLE_COLOR } from '@/const/roleColor'
import type { Player } from '@/game/types'
import { cn } from '@/helpers/utils'

interface ScoreRowProps {
  player: Player
  /** Seat index, used for the avatar colour. */
  index: number
  /** Position in the ranking; staggers the entrance animation. */
  rank: number
  total: number
  gain: number
  /** Highest total on the board; the bar is scaled against it. */
  best: number
  /** Round the player was voted out, if any. */
  outRound?: number
  /** While true the row stays hidden (splash still showing). */
  hidden: boolean
  className?: string
}

const ScoreRowView: React.FC<ScoreRowProps> = ({
  player,
  index,
  rank,
  total,
  gain,
  best,
  outRound,
  hidden,
  className,
}) => {
  const { t } = useTranslation()

  const hiddenState = { opacity: 0, y: SCORE_ROW.HIDDEN_Y }

  return (
    // Rows rise in one after another once the splash is dismissed.
    <motion.li
      initial={hiddenState}
      animate={hidden ? hiddenState : { opacity: 1, y: 0 }}
      transition={{ delay: rank * SCORE_ROW.STAGGER, duration: SCORE_ROW.DURATION }}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2',
        player.alive ? 'bg-alive/25' : 'bg-sunken',
        className,
      )}
    >
      <Avatar
        name={player.name}
        index={index}
        outRole={player.alive ? undefined : player.role}
        compact
        className="w-11 shrink-0 text-lg"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="min-w-0 truncate font-semibold">{player.name}</p>

          <p className={cn('shrink-0 text-xs', ROLE_COLOR[player.role])}>
            {t(`roles.${player.role}`)}
            {outRound !== undefined && (
              <span className="text-muted-foreground">
                {' · '}
                {t('play.result.outRound', { n: outRound })}
              </span>
            )}
          </p>
        </div>

        <div aria-hidden className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-civilian"
            initial={{ width: 0 }}
            animate={{ width: hidden ? 0 : `${(total / best) * PERCENT}%` }}
            transition={{
              duration: SCORE_ROW.BAR_DURATION,
              delay: SCORE_ROW.BAR_DELAY + rank * SCORE_ROW.STAGGER,
              ease: SCORE_ROW.BAR_EASE,
            }}
          />
        </div>
      </div>

      <div className="flex w-16 shrink-0 flex-col items-end">
        <span className="text-lg leading-none font-bold tabular-nums">{total}</span>

        <span className="text-xs text-muted-foreground">
          {gain > 0 ? (
            <Badge className="h-4 bg-gain px-1.5 text-on-card tabular-nums">+{gain}</Badge>
          ) : (
            t('play.result.pts')
          )}
        </span>
      </div>
    </motion.li>
  )
}

export const ScoreRow = React.memo(ScoreRowView)

import React, { useCallback, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar } from '@/components/game/Avatar'
import type { Player } from '@/game/types'
import { cn } from '@/helpers/utils'

interface PlayerCardProps {
  player: Player
  /** Fixed seat index: keeps colour and grid position stable for the whole game. */
  seat: number
  /** Overlay shown on the avatar of living players. */
  badge?: ReactNode
  /** Makes the card tappable (living players only). Receives the player's id. */
  onSelect?: (playerId: string) => void
}

/** One grid cell. Ousted players are greyed out and show their role. */
const PlayerCardView: React.FC<PlayerCardProps> = ({ player, seat, badge, onSelect }) => {
  const { t } = useTranslation()
  const out = !player.alive

  const handleSelect = useCallback(() => {
    onSelect?.(player.id)
  }, [onSelect, player.id])

  const body = (
    <>
      <div className="relative w-full">
        <Avatar
          name={player.name}
          index={seat}
          outRole={out ? player.role : undefined}
          className={cn('w-full', out && 'opacity-80')}
        />

        {!out && badge}
      </div>

      <span
        className={cn(
          'w-full min-w-0 truncate rounded-md bg-subtle',
          'px-2 py-1 text-center text-sm',
        )}
      >
        {player.name}
      </span>

      {out && (
        <span className="sr-only">{t('play.vote.outAs', { role: t(`roles.${player.role}`) })}</span>
      )}
    </>
  )

  if (onSelect && !out) {
    return (
      <li>
        <button
          type="button"
          aria-label={t('play.vote.select', { name: player.name })}
          onClick={handleSelect}
          className={cn(
            'relative flex w-full flex-col items-center gap-1',
            'rounded-xl outline-none',
            'focus-visible:ring-3 focus-visible:ring-ring/50',
          )}
        >
          {body}
        </button>
      </li>
    )
  }

  return (
    <li>
      <div className="relative flex w-full flex-col items-center gap-1">{body}</div>
    </li>
  )
}

export const PlayerCard = React.memo(PlayerCardView)

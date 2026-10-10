import React from 'react'

import { Avatar } from '@/components/game/Avatar'
import { FaceDownCard } from '@/components/game/FaceDownCard'
import type { Player } from '@/game/types'
import { cn } from '@/helpers/utils'

interface CardGridProps {
  players: Player[]
  onPick: (player: Player) => void
  className?: string
}

/** Grid of seats: revealed players show avatar and name, others a face-down card. */
export const CardGrid: React.FC<CardGridProps> = ({ players, onPick, className }) => {
  return (
    <ul className={cn('grid grid-cols-3 gap-3', className)}>
      {players.map((p, i) => (
        <li key={p.id} className="flex flex-col items-center gap-1">
          {p.revealed ? (
            <>
              <Avatar name={p.name} index={i} className="w-full" />

              <span
                className={cn(
                  'w-full truncate rounded-md bg-subtle',
                  'px-2 py-1 text-center text-sm',
                )}
              >
                {p.name}
              </span>
            </>
          ) : (
            <FaceDownCard index={i} player={p} onPick={onPick} />
          )}
        </li>
      ))}
    </ul>
  )
}

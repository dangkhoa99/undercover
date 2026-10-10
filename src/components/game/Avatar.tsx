import React from 'react'
import { useTranslation } from 'react-i18next'

import { Crosshair } from 'lucide-react'

import { AVATAR_COLORS } from '@/const/gameUi'
import { ROLE_COLOR } from '@/const/roleColor'
import type { Role } from '@/game/types'
import { cn } from '@/helpers/utils'

interface AvatarProps {
  name: string
  /** Seat index; picks a stable colour. */
  index: number
  /** Set for ousted players: greyed out, crosshair, and their role in the role's colour. */
  outRole?: Role
  /** Ousted avatars show only the crosshair, for small sizes. */
  compact?: boolean
  className?: string
}

/** Decorative: the player's name and role are always rendered as text next to it. */
const AvatarView: React.FC<AvatarProps> = ({
  name,
  index,
  outRole,
  compact = false,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <div
      aria-hidden
      className={cn(
        'flex aspect-square items-center justify-center rounded-full',
        'text-4xl font-extrabold',
        outRole
          ? 'bg-muted text-foreground'
          : cn('text-on-avatar', AVATAR_COLORS[index % AVATAR_COLORS.length]),
        className,
      )}
    >
      {outRole ? (
        <div className="flex flex-col items-center gap-1 px-2">
          <Crosshair aria-hidden className={cn('size-1/3 min-w-6', ROLE_COLOR[outRole])} />

          {!compact && (
            <span className={cn('max-w-full truncate text-xs font-bold', ROLE_COLOR[outRole])}>
              {t(`roles.${outRole}`)}
            </span>
          )}
        </div>
      ) : (
        name.trim().charAt(0).toLocaleUpperCase()
      )}
    </div>
  )
}

export const Avatar = React.memo(AvatarView)

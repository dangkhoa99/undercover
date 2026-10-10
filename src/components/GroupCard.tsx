import React, { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Avatar } from '@/components/game/Avatar'
import { WORDS } from '@/data/words'
import type { Group } from '@/game/groups'
import { usedIdsFor } from '@/game/words'
import { GROUP_COLOR_CLASS } from '@/const/groups'
import { cn } from '@/helpers/utils'
import type { Language } from '@/i18n'
import { useGameStore } from '@/store/gameStore'

interface GroupCardProps {
  group: Group
  label: string
  subtitle: string
  /** Top-right control in the coloured header (edit / deselect). */
  headerAction?: ReactNode
  /** Members scroll sideways in a single row instead of wrapping into a grid. */
  scroll?: boolean
  children?: ReactNode
}

/** Coloured header + member avatars, shared by the group list and the setup page. */
export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  label,
  subtitle,
  headerAction,
  scroll = false,
  children,
}) => {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage as Language
  const customCount = useGameStore((s) => s.customWords[language].length)

  const total = WORDS[language].length + customCount
  const used = usedIdsFor(group.usedWords, language).length

  return (
    <article className="overflow-hidden rounded-2xl glass">
      <header
        className={cn(
          'relative px-10 py-2 text-center text-on-group',
          GROUP_COLOR_CLASS[group.color],
        )}
      >
        <h2 className="truncate text-lg font-bold">{label}</h2>

        <p className="text-sm opacity-90">{subtitle}</p>

        {headerAction && <div className="absolute top-2 right-2">{headerAction}</div>}
      </header>

      <ul
        className={cn(
          'p-3',
          scroll ? 'flex gap-3 overflow-x-auto' : 'grid grid-cols-4 gap-x-3 gap-y-2',
        )}
      >
        {group.members.map((name, i) => (
          <li
            key={name}
            className={cn('flex w-14 shrink-0 flex-col items-center gap-1', 'justify-self-center')}
          >
            <Avatar name={name} index={i} className="w-12 text-xl" />

            <span className="w-full truncate text-center text-xs">{name}</span>
          </li>
        ))}
      </ul>

      <p className="px-3 pb-3 text-center text-xs text-muted-foreground">
        {t('groups.words', { used, left: Math.max(0, total - used) })}
      </p>

      {children}
    </article>
  )
}

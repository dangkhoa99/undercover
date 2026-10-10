import React, { type ReactNode } from 'react'

import { BackButton } from '@/components/BackButton'

interface AppHeaderProps {
  /** Shows the back arrow in the left slot. Omit on screens with nothing to go back to. */
  onBack?: () => void
  /** Centred page title; truncates instead of wrapping so the bar never changes height. */
  title?: ReactNode
  /** Right slot: badges, shortcuts, add buttons. */
  actions?: ReactNode
}

/**
 * The one top bar of the app. Fixed height and a three-column grid keep the back arrow, title and
 * actions in the same place on every screen, so navigating never shifts the layout.
 */
export const AppHeader: React.FC<AppHeaderProps> = ({ onBack, title, actions }) => {
  return (
    <header className="grid h-12 grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div className="flex justify-start">{onBack && <BackButton onClick={onBack} />}</div>

      {title ? (
        <h1 className="max-w-56 truncate text-xl font-extrabold tracking-tight">{title}</h1>
      ) : (
        <span />
      )}

      <div className="flex items-center justify-end gap-2">{actions}</div>
    </header>
  )
}

import React, { type ReactNode } from 'react'

import { AppHeader } from '@/components/AppHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MAIN_CONTENT_ID } from '@/const/ui'

interface FrameProps {
  /** Back arrow in the top bar. */
  onBack?: () => void
  /** Title in the top bar. */
  title?: ReactNode
  /** Top-bar actions, right-aligned. */
  actions?: ReactNode
  /** Extra pinned block under the bar (status panels, name field…). */
  header?: ReactNode
  /** Stays pinned at the bottom: the primary action is never scrolled out of reach. */
  footer?: ReactNode
  /** Scrolls when it does not fit between header and footer. */
  children: ReactNode
}

/** Full-height page: fixed-height top bar, optional pinned header/footer, scrolling middle. */
export const Frame: React.FC<FrameProps> = ({
  onBack,
  title,
  actions,
  header,
  footer,
  children,
}) => {
  return (
    <main id={MAIN_CONTENT_ID} className="mx-auto flex h-dvh w-full max-w-md flex-col">
      <div className="flex shrink-0 flex-col gap-3 px-5 pt-3 pb-3">
        <AppHeader onBack={onBack} title={title} actions={actions} />

        {header}
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 px-5 py-2">{children}</div>
      </ScrollArea>

      {footer && <footer className="shrink-0 px-5 pt-3 pb-5">{footer}</footer>}
    </main>
  )
}

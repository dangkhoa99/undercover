import React, { type ReactNode } from 'react'

import { Avatar } from '@/components/game/Avatar'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import type { Role } from '@/game/types'
import { cn } from '@/helpers/utils'

interface PlayerDialogProps {
  open: boolean
  /** Omit for dialogs that can only be left through their action buttons. */
  onDismiss?: () => void
  name: string
  seat: number
  /** Role of an ousted player; shows the greyed-out avatar. */
  outRole?: Role
  title: ReactNode
  description?: ReactNode
  /** Fixed-height slot so switching steps never resizes the dialog. */
  body?: ReactNode
  /** Override the body's minimum height (same value on every step of a flow). */
  bodyClassName?: string
  actions: ReactNode
  /** Element focused when the dialog opens (e.g. the name field); defaults to the first control. */
  initialFocus?: React.RefObject<HTMLElement | null>
}

/** Shared layout for every dialog: avatar, title, description, body, buttons. */
export const PlayerDialog: React.FC<PlayerDialogProps> = ({
  open,
  onDismiss,
  name,
  seat,
  outRole,
  title,
  description,
  body,
  bodyClassName = 'min-h-20',
  actions,
  initialFocus,
}) => {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onDismiss?.()}>
      <DialogContent
        showCloseButton={false}
        initialFocus={initialFocus}
        className="items-center gap-3 p-5 text-center"
      >
        <Avatar name={name || '?'} index={seat} outRole={outRole} className="mx-auto w-24" />

        <div className="flex flex-col gap-1">
          <DialogTitle
            className={cn(
              'flex min-h-12 items-center justify-center',
              'text-lg leading-snug font-bold text-balance',
            )}
          >
            {title}
          </DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </div>

        {body && (
          <div className={cn('flex w-full flex-col justify-center gap-1', bodyClassName)}>
            {body}
          </div>
        )}

        <div className="grid w-full auto-cols-fr grid-flow-col gap-2">{actions}</div>
      </DialogContent>
    </Dialog>
  )
}

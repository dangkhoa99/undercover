import React, { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'

interface ConfirmDialogProps {
  open: boolean
  /** Cancel button, Escape and outside click. */
  onCancel: () => void
  onConfirm: () => void
  title: ReactNode
  /** Warning about what the confirmed action throws away. */
  description?: ReactNode
  confirmLabel: string
}

/** Cancel / destructive-confirm dialog for actions that lose progress. */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel,
}) => {
  const { t } = useTranslation()

  const handleOpenChange = (next: boolean) => {
    if (next) {
      return
    }

    onCancel()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="gap-4 p-5 text-center">
        <DialogTitle className="text-lg font-bold">{title}</DialogTitle>

        {description && <DialogDescription>{description}</DialogDescription>}

        <DialogFooter className="mx-0 mb-0 grid grid-cols-2 border-0 bg-transparent p-0">
          <Button variant="outline" size="lg" className="h-11" onClick={onCancel}>
            {t('common.cancel')}
          </Button>

          <Button variant="destructive" size="lg" className="h-11" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

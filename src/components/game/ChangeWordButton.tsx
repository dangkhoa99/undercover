import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RefreshCw } from 'lucide-react'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/helpers/utils'

interface ChangeWordButtonProps {
  onConfirm: () => void
  className?: string
}

/** Button that asks for confirmation before drawing a new word pair. */
export const ChangeWordButton: React.FC<ChangeWordButtonProps> = ({ onConfirm, className }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOpen(false)
    onConfirm()
  }

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className={cn('h-12 w-full text-base', className)}
        onClick={() => setOpen(true)}
      >
        <RefreshCw aria-hidden data-icon="inline-start" />
        {t('play.cards.changeWord')}
      </Button>

      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={t('play.cards.changeWordTitle')}
        description={t('play.cards.changeWordWarning')}
        confirmLabel={t('play.cards.changeWordConfirm')}
      />
    </>
  )
}

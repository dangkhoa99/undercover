import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Trash2 } from 'lucide-react'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { clearAppData } from '@/helpers/clearAppData'

/** Lets players wipe every piece of data the app keeps on their device. */
export const ClearDataSection: React.FC = () => {
  const { t } = useTranslation()

  const [confirming, setConfirming] = useState(false)

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div>
          <h2 className="font-semibold">{t('settings.data.title')}</h2>

          <p className="text-xs text-muted-foreground">{t('settings.data.hint')}</p>
        </div>

        <Button variant="destructive" size="lg" onClick={() => setConfirming(true)}>
          <Trash2 aria-hidden="true" />

          {t('settings.data.clear')}
        </Button>
      </CardContent>

      <ConfirmDialog
        open={confirming}
        onCancel={() => setConfirming(false)}
        onConfirm={() => void clearAppData()}
        title={t('settings.data.confirmTitle')}
        description={t('settings.data.confirmBody')}
        confirmLabel={t('settings.data.confirm')}
      />
    </Card>
  )
}

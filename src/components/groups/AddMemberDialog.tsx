import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NameInput } from '@/components/game/NameInput'
import { PlayerDialog } from '@/components/game/PlayerDialog'
import { Button } from '@/components/ui/button'
import { validatePlayerName } from '@/game/names'

interface AddMemberDialogProps {
  open: boolean
  members: string[]
  onAdd: (name: string) => void
  onClose: () => void
}

export const AddMemberDialog: React.FC<AddMemberDialogProps> = ({
  open,
  members,
  onAdd,
  onClose,
}) => {
  const { t } = useTranslation()
  const [newMember, setNewMember] = useState('')

  const memberError = validatePlayerName(newMember, members)

  const close = () => {
    onClose()
    setNewMember('')
  }

  const add = () => {
    if (memberError) {
      return
    }

    onAdd(newMember)
    close()
  }

  return (
    <PlayerDialog
      open={open}
      onDismiss={close}
      name={newMember.trim()}
      seat={members.length}
      title={t('groups.newPlayer')}
      description={t('groups.newPlayerHint')}
      body={
        <NameInput value={newMember} error={memberError} onChange={setNewMember} onSubmit={add} />
      }
      actions={
        <>
          <Button variant="outline" size="lg" className="h-11" onClick={close}>
            {t('common.cancel')}
          </Button>

          <Button size="lg" className="h-11" disabled={memberError !== null} onClick={add}>
            {t('groups.addPlayer')}
          </Button>
        </>
      }
    />
  )
}

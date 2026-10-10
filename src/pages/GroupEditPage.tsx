import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Plus } from 'lucide-react'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Frame } from '@/components/Frame'
import { AddMemberDialog } from '@/components/groups/AddMemberDialog'
import { GroupColorPicker } from '@/components/groups/GroupColorPicker'
import { GroupNameField } from '@/components/groups/GroupNameField'
import { MemberList } from '@/components/groups/MemberList'
import { Button } from '@/components/ui/button'
import { GROUP_NEW_ID } from '@/const/pages'
import { ROUTES } from '@/const/routes'
import { newGroup, withMember, withoutMember, type Group } from '@/game/groups'
import { groupLabel } from '@/helpers/groupLabel'
import { GROUP_COLOR_CLASS } from '@/const/groups'
import { cn } from '@/helpers/utils'
import { useUnloadWarning } from '@/hooks/useUnloadWarning'
import { useGameStore } from '@/store/gameStore'

/** Edits a draft copy; nothing is stored until "Save changes". `/groups/new` starts an empty group. */
export const GroupEditPage: React.FC = () => {
  const { id } = useParams()
  const groups = useGameStore((s) => s.groups)

  const [initial] = useState(() =>
    id === GROUP_NEW_ID ? newGroup(groups) : groups.find((g) => g.id === id),
  )

  if (!initial) {
    return <Navigate to={ROUTES.GROUPS} replace />
  }

  return <GroupEditor initial={initial} />
}

// --------------------------------------------------

interface GroupEditorProps {
  initial: Group
}

const GroupEditor: React.FC<GroupEditorProps> = ({ initial }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const saveGroup = useGameStore((s) => s.saveGroup)

  const [draft, setDraft] = useState(initial)
  const [name, setName] = useState(groupLabel(initial, t))
  const [leaving, setLeaving] = useState(false)
  const [adding, setAdding] = useState(false)

  const dirty =
    name.trim() !== groupLabel(initial, t) ||
    draft.color !== initial.color ||
    draft.members.join('\n') !== initial.members.join('\n')

  useUnloadWarning(dirty)

  const reorder = useCallback((members: string[]) => {
    setDraft((d) => ({ ...d, members }))
  }, [])

  const remove = useCallback((member: string) => {
    setDraft((d) => withoutMember(d, member))
  }, [])

  const save = () => {
    saveGroup({ ...draft, name: name.trim() || null })
    void navigate(ROUTES.GROUPS, { replace: true })
  }

  const back = () => {
    if (dirty) {
      setLeaving(true)
      return
    }

    void navigate(-1)
  }

  return (
    <Frame
      onBack={back}
      title={t('groups.edit')}
      header={
        <div className="flex flex-col gap-4">
          <GroupNameField value={name} onChange={setName} />

          <GroupColorPicker
            value={draft.color}
            onChange={(color) => setDraft({ ...draft, color })}
          />
        </div>
      }
      footer={
        <Button size="lg" className="h-12 w-full text-base" disabled={!dirty} onClick={save}>
          {t('groups.save')}
        </Button>
      }
    >
      <section className="overflow-hidden rounded-2xl glass">
        <p
          className={cn(
            'px-4 py-3 text-center',
            'font-semibold text-on-group',
            GROUP_COLOR_CLASS[draft.color],
          )}
        >
          {t('groups.editHint')}
        </p>

        <MemberList members={draft.members} onReorder={reorder} onRemove={remove} />

        <Button
          variant="ghost"
          size="lg"
          className="h-12 w-full rounded-none border-t"
          onClick={() => setAdding(true)}
        >
          <Plus aria-hidden="true" data-icon="inline-start" />
          {t('groups.addPlayer')}
        </Button>
      </section>

      <AddMemberDialog
        open={adding}
        members={draft.members}
        onAdd={(member) => setDraft(withMember(draft, member))}
        onClose={() => setAdding(false)}
      />

      <ConfirmDialog
        open={leaving}
        onCancel={() => setLeaving(false)}
        onConfirm={() => void navigate(-1)}
        title={t('groups.discardTitle')}
        description={t('groups.discardWarning')}
        confirmLabel={t('groups.discard')}
      />
    </Frame>
  )
}

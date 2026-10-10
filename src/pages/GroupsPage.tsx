import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Pencil, Plus, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Frame } from '@/components/Frame'
import { GlassButton } from '@/components/GlassButton'
import { GroupCard } from '@/components/GroupCard'
import { Button } from '@/components/ui/button'
import { GROUP_ITEM_MOTION } from '@/const/pages'
import { groupEditPath, ROUTES } from '@/const/routes'
import { groupLabel } from '@/helpers/groupLabel'
import { useGameStore } from '@/store/gameStore'

export const GroupsPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const groups = useGameStore((s) => s.groups)
  const selectGroup = useGameStore((s) => s.selectGroup)
  const deleteGroup = useGameStore((s) => s.deleteGroup)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const doomed = groups.find((g) => g.id === deleteId)
  const dateFormat = new Intl.DateTimeFormat(i18n.resolvedLanguage, { dateStyle: 'medium' })

  const confirmDelete = () => {
    if (doomed) {
      deleteGroup(doomed.id)
    }

    setDeleteId(null)
  }

  return (
    <Frame
      onBack={() => void navigate(-1)}
      title={t('groups.title')}
      actions={
        <GlassButton
          aria-label={t('groups.create')}
          onClick={() => void navigate(ROUTES.GROUP_NEW)}
        >
          <Plus aria-hidden="true" />
        </GlassButton>
      }
    >
      <p className="text-center text-muted-foreground">
        {groups.length > 0 ? t('groups.hint') : t('groups.empty')}
      </p>

      <ConfirmDialog
        open={doomed !== undefined}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title={doomed && t('groups.confirmDelete', { name: groupLabel(doomed, t) })}
        confirmLabel={t('groups.delete')}
      />

      <ul className="flex flex-col gap-4">
        {[...groups]
          .sort((a, b) => (b.lastPlayed ?? 0) - (a.lastPlayed ?? 0))
          .map((g, i) => (
            <motion.li
              key={g.id}
              initial={{ opacity: 0, y: GROUP_ITEM_MOTION.OFFSET_Y }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * GROUP_ITEM_MOTION.STAGGER,
                duration: GROUP_ITEM_MOTION.DURATION,
              }}
            >
              <GroupCard
                group={g}
                label={groupLabel(g, t)}
                subtitle={
                  g.lastPlayed === null
                    ? t('groups.neverPlayed')
                    : t('groups.lastPlayed', { date: dateFormat.format(g.lastPlayed) })
                }
                headerAction={
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={t('groups.edit')}
                    onClick={() => void navigate(groupEditPath(g.id))}
                  >
                    <Pencil aria-hidden="true" />
                  </Button>
                }
              >
                <div className="flex items-center justify-between gap-3 px-3 pb-3">
                  <span aria-hidden="true" className="size-9" />

                  <Button
                    variant="outline"
                    size="lg"
                    className="h-10 rounded-full px-6"
                    onClick={() => {
                      selectGroup(g.id)
                      void navigate(ROUTES.SETUP)
                    }}
                  >
                    {t('groups.choose')}
                  </Button>

                  <Button
                    size="icon-lg"
                    variant="ghost"
                    aria-label={t('groups.delete')}
                    onClick={() => setDeleteId(g.id)}
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </div>
              </GroupCard>
            </motion.li>
          ))}
      </ul>
    </Frame>
  )
}

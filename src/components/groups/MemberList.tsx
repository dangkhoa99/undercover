import React, { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Modifier,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { AnimatePresence } from 'motion/react'

import { SortableMemberRow } from '@/components/groups/SortableMemberRow'
import { cn } from '@/helpers/utils'

interface MemberListProps {
  members: string[]
  onReorder: (members: string[]) => void
  onRemove: (member: string) => void
  className?: string
}

/** Drag-sortable member list; drags are clamped to the list's vertical bounds. */
export const MemberList: React.FC<MemberListProps> = ({
  members,
  onReorder,
  onRemove,
  className,
}) => {
  const { t } = useTranslation()
  const listRef = useRef<HTMLUListElement>(null)

  const accessibility = useMemo(
    () => ({ screenReaderInstructions: { draggable: t('groups.dragInstructions') } }),
    [t],
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const keepInList: Modifier = useCallback(({ transform, draggingNodeRect }) => {
    const list = listRef.current?.getBoundingClientRect()

    if (!list || !draggingNodeRect) {
      return transform
    }

    const min = list.top - draggingNodeRect.top
    const max = list.bottom - draggingNodeRect.bottom

    return { ...transform, y: Math.min(Math.max(transform.y, min), max) }
  }, [])

  const reorder = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return
    }

    onReorder(
      arrayMove(members, members.indexOf(String(active.id)), members.indexOf(String(over.id))),
    )
  }

  return (
    <DndContext
      sensors={sensors}
      accessibility={accessibility}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, keepInList]}
      onDragEnd={reorder}
    >
      <SortableContext items={members} strategy={verticalListSortingStrategy}>
        <ul ref={listRef} className={cn('flex flex-col', className)}>
          <AnimatePresence initial={false}>
            {members.map((member, i) => (
              <SortableMemberRow key={member} member={member} index={i} onRemove={onRemove} />
            ))}
          </AnimatePresence>
        </ul>
      </SortableContext>
    </DndContext>
  )
}

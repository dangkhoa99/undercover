import React from 'react'
import { useTranslation } from 'react-i18next'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'

import { Avatar } from '@/components/game/Avatar'
import { Button } from '@/components/ui/button'
import { MEMBER_ROW_MOTION } from '@/const/pages'
import { cn } from '@/helpers/utils'

interface SortableMemberRowProps {
  member: string
  /** Seat colour of the avatar; follows the member's current position. */
  index: number
  onRemove: (member: string) => void
  className?: string
}

/**
 * The drag handle sits before the avatar and is the only drag activator, so the rest of the row
 * keeps scrolling the list on touch screens. Motion animates entering and leaving rows; the
 * sortable transform lives on an inner element so the two never fight over `transform`.
 */
const SortableMemberRowView: React.FC<SortableMemberRowProps> = ({
  member,
  index,
  onRemove,
  className,
}) => {
  const { t } = useTranslation()

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member })

  return (
    <motion.li
      initial={MEMBER_ROW_MOTION.HIDDEN}
      animate={MEMBER_ROW_MOTION.SHOWN}
      exit={MEMBER_ROW_MOTION.HIDDEN}
      transition={{ duration: MEMBER_ROW_MOTION.DURATION }}
      className={cn(isDragging && 'relative z-10', className)}
    >
      <div
        ref={setNodeRef}
        style={{ transform: CSS.Translate.toString(transform), transition }}
        className={cn(
          'flex items-center gap-2',
          'rounded-xl px-2 py-2',
          isDragging && 'bg-subtle-strong',
        )}
      >
        <button
          type="button"
          ref={setActivatorNodeRef}
          aria-label={t('groups.drag', { name: member })}
          className={cn(
            'flex size-8 shrink-0 touch-none items-center justify-center',
            'rounded-md text-muted-foreground outline-none',
            'hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
          )}
          {...attributes}
          {...listeners}
        >
          <GripVertical aria-hidden="true" className="size-5" />
        </button>

        <Avatar name={member} index={index} className="w-10 text-lg" />

        <span className="min-w-0 flex-1 truncate">{member}</span>

        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={t('groups.remove', { name: member })}
          onClick={() => onRemove(member)}
        >
          <Trash2 aria-hidden="true" />
        </Button>
      </div>
    </motion.li>
  )
}

export const SortableMemberRow = React.memo(SortableMemberRowView)

import React from 'react'
import { useTranslation } from 'react-i18next'

import { type Group } from '@/game/groups'
import { GROUP_COLORS } from '@/const/groups'
import { GROUP_COLOR_CLASS } from '@/const/groups'
import { cn } from '@/helpers/utils'

interface GroupColorPickerProps {
  value: Group['color']
  onChange: (color: Group['color']) => void
  className?: string
}

export const GroupColorPicker: React.FC<GroupColorPickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <fieldset
      aria-label={t('groups.color')}
      className={cn('flex items-center justify-center gap-3', className)}
    >
      <span aria-hidden="true" className="text-sm text-muted-foreground">
        {t('groups.color')}
      </span>

      {GROUP_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          aria-label={color}
          aria-pressed={value === color}
          onClick={() => onChange(color)}
          className={cn(
            'size-8 rounded-full outline-none',
            'focus-visible:ring-3 focus-visible:ring-ring/50',
            GROUP_COLOR_CLASS[color],
            value === color && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
          )}
        />
      ))}
    </fieldset>
  )
}

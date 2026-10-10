import React from 'react'
import { useTranslation } from 'react-i18next'

import { Input } from '@/components/ui/input'
import { INPUT_LIMIT } from '@/const/pages'
import { cn } from '@/helpers/utils'

interface GroupNameFieldProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const GroupNameField: React.FC<GroupNameFieldProps> = ({ value, onChange, className }) => {
  const { t } = useTranslation()

  return (
    <Input
      name="groupName"
      autoComplete="off"
      spellCheck={false}
      aria-label={t('groups.nameLabel')}
      value={value}
      maxLength={INPUT_LIMIT.GROUP_NAME}
      onChange={(e) => onChange(e.target.value)}
      className={cn('h-12 text-center text-2xl font-bold', className)}
    />
  )
}

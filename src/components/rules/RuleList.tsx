import React from 'react'
import { useTranslation } from 'react-i18next'

import { RULE_BULLET } from '@/const/pages'
import { cn } from '@/helpers/utils'

interface RuleItem {
  /** i18n key of the text. */
  key: string
  /** Optional lead-in label (role name) shown before the text. */
  label?: string
  /** Colour class for the label. */
  labelClass?: string
}

interface RuleListProps {
  items: RuleItem[]
  /** Numbered steps instead of bullets. */
  ordered?: boolean
}

/** Bulleted or numbered list of translated rule lines. */
export const RuleList: React.FC<RuleListProps> = ({ items, ordered = false }) => {
  const { t } = useTranslation()

  return (
    <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
      {items.map((item, i) => (
        <li key={item.key} className="flex gap-3">
          <span className="w-5 shrink-0 text-right font-semibold text-foreground">
            {ordered ? i + 1 : RULE_BULLET}
          </span>

          <span>
            {item.label && (
              <strong className={cn('mr-1 font-semibold', item.labelClass)}>{item.label}</strong>
            )}
            {t(item.key)}
          </span>
        </li>
      ))}
    </ul>
  )
}

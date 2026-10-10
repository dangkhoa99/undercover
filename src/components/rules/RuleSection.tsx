import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

interface RuleSectionProps {
  title: string
  children: React.ReactNode
}

/** Titled glass card holding one block of the rules. */
export const RuleSection: React.FC<RuleSectionProps> = ({ title, children }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{title}</h2>

        {children}
      </CardContent>
    </Card>
  )
}

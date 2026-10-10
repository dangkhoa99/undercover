import React from 'react'

import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { STEPPER_MIN } from '@/const/pages'
import { cn } from '@/helpers/utils'

interface StepperProps {
  label: string
  value: number
  onChange: (value: number) => void
  max: number
  labelClass?: string
  className?: string
}

export const Stepper: React.FC<StepperProps> = ({
  label,
  value,
  onChange,
  max,
  labelClass,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <span className={labelClass}>{label}</span>

      <div className="flex w-30 items-center justify-between">
        <Button
          size="icon-lg"
          variant="outline"
          aria-label={`− ${label}`}
          disabled={value <= STEPPER_MIN}
          onClick={() => onChange(value - 1)}
        >
          <Minus aria-hidden="true" />
        </Button>

        <span className="w-6 text-center text-lg font-semibold tabular-nums">{value}</span>

        <Button
          size="icon-lg"
          variant="outline"
          aria-label={`+ ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}

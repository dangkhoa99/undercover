import React from 'react'
import { useTranslation } from 'react-i18next'

import { Stepper } from '@/components/setup/Stepper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ROLE } from '@/const/roles'
import { defaultRoleConfig, roleLimits } from '@/game/roles'
import { useGameStore } from '@/store/gameStore'

interface RoleSettingsProps {
  className?: string
}

export const RoleSettings: React.FC<RoleSettingsProps> = ({ className }) => {
  const { t } = useTranslation()

  const count = useGameStore((s) => s.playerCount)
  const storedRoles = useGameStore((s) => s.roleConfig)
  const setRoleConfig = useGameStore((s) => s.setRoleConfig)

  const roles = storedRoles ?? defaultRoleConfig(count)
  const limits = roleLimits(count)
  // "+" is disabled once either the per-role cap or the shared infiltrator cap is reached.
  const maxUndercover = Math.min(limits.perRole, limits.infiltrators - roles.mrWhite)
  const maxMrWhite = Math.min(limits.perRole, limits.infiltrators - roles.undercover)
  const civilians = count - roles.undercover - roles.mrWhite

  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-civilian">{t('setup.civilians')}</span>

          <span className="w-30 text-center text-lg font-semibold tabular-nums">{civilians}</span>
        </div>

        <Stepper
          label={t(`roles.${ROLE.UNDERCOVER}`)}
          labelClass="text-undercover"
          value={roles.undercover}
          max={maxUndercover}
          onChange={(undercover) => setRoleConfig({ ...roles, undercover })}
        />

        <Stepper
          label={t(`roles.${ROLE.MR_WHITE}`)}
          labelClass="text-mrwhite"
          value={roles.mrWhite}
          max={maxMrWhite}
          onChange={(mrWhite) => setRoleConfig({ ...roles, mrWhite })}
        />

        {storedRoles && (
          <Button variant="ghost" size="sm" onClick={() => setRoleConfig(null)}>
            {t('setup.auto')}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

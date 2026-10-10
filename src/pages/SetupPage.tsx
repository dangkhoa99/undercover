import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Users, X } from 'lucide-react'

import { Frame } from '@/components/Frame'
import { GlassButton } from '@/components/GlassButton'
import { GroupCard } from '@/components/GroupCard'
import { SettingsButton } from '@/components/SettingsButton'
import { CustomWordsButton } from '@/components/setup/CustomWordsButton'
import { RoleSettings } from '@/components/setup/RoleSettings'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { GAME } from '@/const/game'
import { SETUP_PLAYER_STEP } from '@/const/pages'
import { ROUTES } from '@/const/routes'
import { defaultRoleConfig, validateRoleConfig } from '@/game/roles'
import { groupLabel } from '@/helpers/groupLabel'
import type { Language } from '@/i18n'
import { useGameStore } from '@/store/gameStore'

export const SetupPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const count = useGameStore((s) => s.playerCount)
  const storedRoles = useGameStore((s) => s.roleConfig)
  const setPlayerCount = useGameStore((s) => s.setPlayerCount)
  const startGame = useGameStore((s) => s.startGame)
  const group = useGameStore((s) => s.groups.find((g) => g.id === s.groupId))
  const selectGroup = useGameStore((s) => s.selectGroup)

  const error = validateRoleConfig(count, storedRoles ?? defaultRoleConfig(count))

  const start = () => {
    startGame(i18n.resolvedLanguage as Language)
    void navigate(ROUTES.PLAY)
  }

  return (
    <Frame
      onBack={() => void navigate(ROUTES.HOME)}
      actions={
        <>
          <GlassButton aria-label={t('groups.button')} onClick={() => void navigate(ROUTES.GROUPS)}>
            <Users aria-hidden="true" />
          </GlassButton>

          <SettingsButton />
        </>
      }
      footer={
        <div className="flex flex-col gap-2">
          {error && (
            <p role="alert" className="text-center text-sm text-destructive">
              {t(`setup.errors.${error}`)}
            </p>
          )}

          <Button size="lg" className="h-12 text-base" disabled={error !== null} onClick={start}>
            {t('setup.start')}
          </Button>
        </div>
      }
    >
      {group && (
        <GroupCard
          scroll
          group={group}
          label={groupLabel(group, t)}
          subtitle={t('groups.players', { count: group.members.length })}
          headerAction={
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label={t('groups.deselect')}
              onClick={() => selectGroup(null)}
            >
              <X aria-hidden="true" />
            </Button>
          }
        />
      )}

      <section className="flex flex-col gap-4 pt-4">
        <h1 className="text-center text-3xl font-extrabold">{t('setup.players', { count })}</h1>

        <Slider
          aria-label={t('setup.playersLabel')}
          min={GAME.MIN_PLAYERS}
          max={GAME.MAX_PLAYERS}
          step={SETUP_PLAYER_STEP}
          value={[count]}
          onValueChange={(value) => setPlayerCount(Array.isArray(value) ? value[0] : value)}
        />
      </section>

      <RoleSettings />

      <CustomWordsButton />
    </Frame>
  )
}

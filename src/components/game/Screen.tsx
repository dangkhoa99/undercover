import React, { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Frame } from '@/components/Frame'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { GAME_PHASE } from '@/const/gameUi'
import { ROLE } from '@/const/roles'
import { ROUTES } from '@/const/routes'
import { remainingInfiltrators } from '@/game/engine'
import { useGameStore } from '@/store/gameStore'

interface ScreenProps {
  title: string
  /** Rule / hint line; scrolls with the content so the pinned header stays small. */
  subtitle?: string
  /** Hide the "remaining infiltrators" panel (e.g. on the result screen). */
  hideStatus?: boolean
  /** Pinned primary action(s). */
  footer?: ReactNode
  children: ReactNode
}

/**
 * Common frame for every in-game phase. Back button, title and the infiltrator count stay pinned,
 * the player grid scrolls, and the action buttons stay pinned at the bottom.
 */
export const Screen: React.FC<ScreenProps> = ({
  title,
  subtitle,
  hideStatus = false,
  footer,
  children,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const game = useGameStore((s) => s.game)
  const endGame = useGameStore((s) => s.endGame)
  const [leaving, setLeaving] = useState(false)

  const remaining = game ? remainingInfiltrators(game) : null
  // Once the game is over, the result screen has its own Home button.
  const canLeave = game !== null && game.phase !== GAME_PHASE.FINISHED

  const handleLeave = () => {
    endGame()
    void navigate(ROUTES.SETUP, { replace: true })
  }

  return (
    <Frame
      title={title}
      onBack={canLeave ? () => setLeaving(true) : undefined}
      actions={
        game && game.round > 0 ? (
          <Badge variant="secondary">{t('play.round', { n: game.round })}</Badge>
        ) : undefined
      }
      header={
        remaining &&
        !hideStatus && (
          <Card size="sm">
            <CardContent className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm text-muted-foreground">{t('play.remaining')}</p>

              <p className="flex gap-4 font-semibold">
                <span className="text-undercover">
                  {t(`roles.${ROLE.UNDERCOVER}`)}: {remaining.undercover}
                </span>

                <span className="text-mrwhite">
                  {t(`roles.${ROLE.MR_WHITE}`)}: {remaining.mrWhite}
                </span>
              </p>
            </CardContent>
          </Card>
        )
      }
      footer={footer}
    >
      {subtitle !== undefined && (
        <p className="min-h-12 text-center text-muted-foreground">{subtitle}</p>
      )}

      {children}

      <ConfirmDialog
        open={leaving}
        onCancel={() => setLeaving(false)}
        onConfirm={handleLeave}
        title={t('play.leave.title')}
        description={t('play.leave.warning')}
        confirmLabel={t('play.leave.confirm')}
      />
    </Frame>
  )
}

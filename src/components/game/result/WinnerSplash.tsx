import React, { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Ghost, Trophy, Users, VenetianMask } from 'lucide-react'
import { motion } from 'motion/react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { SPLASH_BG, SPLASH_TROPHY } from '@/const/gameUi'
import { TEAM } from '@/const/phases'
import type { Team } from '@/game/types'
import { cn } from '@/helpers/utils'

const SPLASH_ICONS: Record<Team, ReactNode> = {
  [TEAM.CIVILIANS]: <Users aria-hidden className="size-20" />,
  [TEAM.INFILTRATORS]: (
    <>
      <VenetianMask aria-hidden className="size-20" />
      <Ghost aria-hidden className="size-20" />
    </>
  ),
  [TEAM.MR_WHITE]: <Ghost aria-hidden className="size-20" />,
}

interface WinnerSplashProps {
  winner: Team
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const WinnerSplash: React.FC<WinnerSplashProps> = ({
  winner,
  title,
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="overflow-hidden p-0">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className={cn(
            'flex flex-col items-center gap-6 bg-gradient-to-b',
            'px-6 pt-10 pb-8',
            'text-zinc-900/85 outline-none',
            'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset',
            SPLASH_BG[winner],
          )}
        >
          <motion.div
            initial={SPLASH_TROPHY.INITIAL}
            animate={SPLASH_TROPHY.ANIMATE}
            transition={SPLASH_TROPHY.TRANSITION}
          >
            <Trophy aria-hidden className="size-16 text-trophy drop-shadow" />
          </motion.div>

          <div className="flex gap-4 drop-shadow">{SPLASH_ICONS[winner]}</div>

          <DialogTitle
            className={cn(
              'w-full rounded-lg px-4 py-3 text-balance shadow-lg',
              'text-2xl leading-tight font-extrabold',
              'bg-card-front text-on-card',
            )}
          >
            {title}
          </DialogTitle>

          <span className="text-sm opacity-90">{t('play.result.tapToContinue')}</span>
        </button>
      </DialogContent>
    </Dialog>
  )
}

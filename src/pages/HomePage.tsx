import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { PHASE } from '@/const/phases'
import { AppHeader } from '@/components/AppHeader'
import { AppLogo } from '@/components/AppLogo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SettingsButton } from '@/components/SettingsButton'
import { buttonVariants } from '@/components/ui/button'
import { ROUTES } from '@/const/routes'
import { MAIN_CONTENT_ID } from '@/const/ui'
import { useGameStore } from '@/store/gameStore'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()

  const hasGame = useGameStore((s) => s.game !== null && s.game.phase !== PHASE.FINISHED)

  return (
    <main id={MAIN_CONTENT_ID} className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pt-3 pb-6">
      <AppHeader
        actions={
          <>
            <LanguageSwitcher />

            <SettingsButton />
          </>
        }
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col items-center gap-5">
          <AppLogo />

          <h1 className="text-5xl font-extrabold tracking-tight">{t('app.title')}</h1>
        </div>

        <nav className="flex w-full flex-col gap-3">
          {hasGame && (
            <Link
              to={ROUTES.PLAY}
              className={buttonVariants({ size: 'lg', className: 'h-12 text-base' })}
            >
              {t('home.resume')}
            </Link>
          )}

          <Link
            to={ROUTES.SETUP}
            className={buttonVariants({
              size: 'lg',
              variant: hasGame ? 'outline' : 'default',
              className: 'h-12 text-base',
            })}
          >
            {t('home.play')}
          </Link>

          <Link
            to={ROUTES.RULES}
            className={buttonVariants({
              size: 'lg',
              variant: 'ghost',
              className: 'h-12 text-base',
            })}
          >
            {t('home.rules')}
          </Link>
        </nav>
      </div>
    </main>
  )
}

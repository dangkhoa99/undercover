import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Trash2 } from 'lucide-react'

import { Frame } from '@/components/Frame'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AddWordForm } from '@/components/words/AddWordForm'
import { ROUTES } from '@/const/routes'
import type { Language } from '@/i18n'
import { useGameStore } from '@/store/gameStore'

/** Full-page editor for the player-written word pairs of the current language. */
export const WordsPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const language = i18n.resolvedLanguage as Language
  const words = useGameStore((s) => s.customWords[language])
  const addCustomWord = useGameStore((s) => s.addCustomWord)
  const removeCustomWord = useGameStore((s) => s.removeCustomWord)

  const add = useCallback(
    (a: string, b: string) => addCustomWord(language, a, b),
    [addCustomWord, language],
  )

  return (
    <Frame onBack={() => void navigate(ROUTES.SETUP)} title={t('words.custom.title')}>
      <p className="text-center text-muted-foreground">{t('words.custom.description')}</p>

      <AddWordForm onAdd={add} />

      {words.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">{t('words.custom.empty')}</p>
      ) : (
        <Card>
          <CardContent>
            <ul className="flex flex-col gap-1">
              {words.map((w) => (
                <li key={w.id} className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate">
                    {w.a} · {w.b}
                  </span>

                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={t('words.custom.delete')}
                    onClick={() => removeCustomWord(language, w.id)}
                  >
                    <Trash2 aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </Frame>
  )
}

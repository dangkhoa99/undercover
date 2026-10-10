import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { INPUT_LIMIT } from '@/const/pages'

interface AddWordFormProps {
  onAdd: (a: string, b: string) => void
}

/** Owns the typing state so keystrokes never re-render the page or the word list. */
export const AddWordForm: React.FC<AddWordFormProps> = ({ onAdd }) => {
  const { t } = useTranslation()
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const firstInput = useRef<HTMLInputElement>(null)

  const first = a.trim()
  const second = b.trim()
  const same = first !== '' && first.toLowerCase() === second.toLowerCase()
  const canAdd = first !== '' && second !== '' && !same

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!canAdd) {
      return
    }

    onAdd(first, second)
    setA('')
    setB('')
    firstInput.current?.focus()
  }

  return (
    <Card>
      <CardContent>
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <Input
            ref={firstInput}
            name="wordA"
            autoComplete="off"
            spellCheck={false}
            className="h-12 text-lg"
            aria-label={t('words.custom.a')}
            placeholder={t('words.custom.a')}
            maxLength={INPUT_LIMIT.WORD}
            value={a}
            onChange={(e) => setA(e.target.value)}
          />

          <Input
            name="wordB"
            autoComplete="off"
            spellCheck={false}
            className="h-12 text-lg"
            aria-label={t('words.custom.b')}
            placeholder={t('words.custom.b')}
            maxLength={INPUT_LIMIT.WORD}
            value={b}
            onChange={(e) => setB(e.target.value)}
          />

          {same && (
            <p role="alert" className="text-sm text-destructive">
              {t('words.custom.same')}
            </p>
          )}

          <Button type="submit" size="lg" className="h-11" disabled={!canAdd}>
            {t('words.custom.add')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

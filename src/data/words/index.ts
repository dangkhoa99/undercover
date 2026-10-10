import { DIFFICULTY } from '@/const/words'
import type { Difficulty, WordEntry } from '@/game/words'
import type { Language } from '@/i18n'

interface RawPair {
  id: string
  a: string
  b: string
}

const modules = import.meta.glob<RawPair[]>('./*/*/*.json', { eager: true, import: 'default' })

const isDifficulty = (value: string): value is Difficulty =>
  (Object.values(DIFFICULTY) as string[]).includes(value)

const PATH_PARTS = /^\.\/([^/]+)\/([^/]+)\/([^/]+)\.json$/

const collect = () => {
  const words: Record<string, WordEntry[]> = {}

  for (const [path, pairs] of Object.entries(modules)) {
    const match = PATH_PARTS.exec(path)

    if (!match || !isDifficulty(match[3])) {
      continue
    }

    const [, language, category, difficulty] = match
    const target = (words[language] ??= [])

    for (const pair of pairs) {
      target.push({ ...pair, category, difficulty })
    }
  }

  return words as Record<Language, WordEntry[]>
}

/** Every built-in pair per language; category and difficulty come from the file path. */
export const WORDS = collect()

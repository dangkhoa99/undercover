import { GAME } from '@/const/game'
import type { DIFFICULTY } from '@/const/words'

import type { Rng, WordPair } from './types'

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY]

export interface WordEntry {
  id: string
  category: string
  difficulty: Difficulty
  /** Becomes the civilian or undercover word at random (see `createGame`). */
  a: string
  b: string
}

export interface PickedWord {
  entry: WordEntry
  pair: WordPair
  /** Every entry had been used, so this pair was already played before. */
  repeated: boolean
}

const prefixFor = (language: string) => `${language}${GAME.WORD_KEY_SEPARATOR}`

/**
 * Picks a random entry that is not in `usedIds`. When every entry has been used the history
 * restarts (and the pick is flagged `repeated`), so a long session never runs dry.
 */
export const pickWord = (
  entries: readonly WordEntry[],
  usedIds: readonly string[],
  rng: Rng = Math.random,
): PickedWord => {
  if (entries.length === 0) {
    throw new RangeError('No words available')
  }

  const fresh = entries.filter((e) => !usedIds.includes(e.id))
  const repeated = fresh.length === 0
  const pool = repeated ? entries : fresh
  const entry = pool[Math.floor(rng() * pool.length)]

  return {
    entry,
    pair: { civilian: entry.a, undercover: entry.b },
    repeated,
  }
}

/** Used-word history is stored as `${language}:${entryId}` so one list serves every language. */
export const usedIdsFor = (history: readonly string[], language: string): string[] => {
  const prefix = prefixFor(language)

  return history.filter((id) => id.startsWith(prefix)).map((id) => id.slice(prefix.length))
}

/**
 * Adds a finished game's word to one language's history. `repeated` means the pick came after
 * every entry had been used, so the history restarts from this word.
 */
export const recordWord = (
  history: readonly string[],
  language: string,
  entryId: string,
  repeated: boolean,
): string[] => {
  const prefix = prefixFor(language)
  const kept = history.filter((id) => !id.startsWith(prefix))
  const same = repeated
    ? []
    : history.filter((id) => id.startsWith(prefix) && id !== prefix + entryId)

  return [...kept, ...same, prefix + entryId]
}

import { describe, expect, it } from 'vitest'

import { DIFFICULTY, WORD_CATEGORY } from '@/const/words'

import { WORDS } from './index'

const MAX_WORD_LENGTH = 20
const MAX_WORD_USES = 2

describe.each(Object.entries(WORDS))('%s word list', (_language, entries) => {
  it('has unique ids and distinct, short words', () => {
    expect(new Set(entries.map((e) => e.id)).size).toBe(entries.length)

    for (const e of entries) {
      expect(e.a.toLowerCase()).not.toBe(e.b.toLowerCase())
      expect(e.a.length).toBeLessThanOrEqual(MAX_WORD_LENGTH)
      expect(e.b.length).toBeLessThanOrEqual(MAX_WORD_LENGTH)
    }
  })

  it('has no repeated pair and reuses a word at most twice', () => {
    const pairs = entries.map((e) => [e.a.toLowerCase(), e.b.toLowerCase()].sort().join('|'))
    expect(new Set(pairs).size).toBe(entries.length)

    const uses = new Map<string, number>()
    for (const e of entries) {
      for (const w of [e.a, e.b]) {
        uses.set(w.toLowerCase(), (uses.get(w.toLowerCase()) ?? 0) + 1)
      }
    }
    expect(Math.max(...uses.values())).toBeLessThanOrEqual(MAX_WORD_USES)
  })

  it('only uses known categories and difficulties', () => {
    const categories: string[] = Object.values(WORD_CATEGORY)
    const difficulties: string[] = Object.values(DIFFICULTY)

    for (const e of entries) {
      expect(categories).toContain(e.category)
      expect(difficulties).toContain(e.difficulty)
    }
  })
})

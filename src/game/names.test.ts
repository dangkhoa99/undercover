import { describe, expect, it } from 'vitest'

import { DIFFICULTY } from '@/const/words'

import { validatePlayerName } from './names'
import { pickWord, recordWord, usedIdsFor } from './words'

describe('validatePlayerName', () => {
  it('accepts a fresh name', () => {
    expect(validatePlayerName('Anna', ['Bob'])).toBeNull()
  })

  it('rejects blank names, ignoring surrounding whitespace', () => {
    expect(validatePlayerName('   ', [])).toBe('emptyName')
  })

  it('rejects duplicates regardless of case and whitespace', () => {
    expect(validatePlayerName(' anna ', ['Anna'])).toBe('duplicateName')
  })
})

describe('pickWord', () => {
  const entries = [
    { id: 'x', category: 'c', difficulty: DIFFICULTY.EASY, a: 'A1', b: 'B1' },
    { id: 'y', category: 'c', difficulty: DIFFICULTY.EASY, a: 'A2', b: 'B2' },
  ]

  it('never repeats an entry until all were used', () => {
    expect(pickWord(entries, ['x'], () => 0).entry.id).toBe('y')
  })

  it('maps a to civilian and b to undercover', () => {
    expect(pickWord(entries, [], () => 0).pair).toEqual({ civilian: 'A1', undercover: 'B1' })
  })

  it('throws when there are no entries', () => {
    expect(() => pickWord([], [])).toThrow(RangeError)
  })
  it('flags a pick as repeated only when every entry was already used', () => {
    expect(pickWord(entries, ['x'], () => 0).repeated).toBe(false)
    expect(pickWord(entries, ['x', 'y'], () => 0).repeated).toBe(true)
  })
})

describe('used-word history', () => {
  const history = ['en:a', 'vi:b', 'en:c']

  it('keeps each language in its own slice of one list', () => {
    expect(usedIdsFor(history, 'en')).toEqual(['a', 'c'])
  })

  it('appends a finished word without duplicating it', () => {
    expect(recordWord(history, 'en', 'z', false)).toEqual(['vi:b', 'en:a', 'en:c', 'en:z'])
    expect(recordWord(history, 'en', 'a', false)).toEqual(['vi:b', 'en:c', 'en:a'])
  })

  it('restarts that language when the pick was a repeat', () => {
    expect(recordWord(history, 'en', 'a', true)).toEqual(['vi:b', 'en:a'])
  })
})

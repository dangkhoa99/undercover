import { describe, expect, it } from 'vitest'

import { GAME } from '@/const/game'

import { defaultRoleConfig, validateRoleConfig } from './roles'

// Combos observed in the original app (players, undercover, mrWhite).
const ALLOWED: [number, number, number][] = [
  [3, 1, 0],
  [3, 0, 1],
  [4, 1, 0],
  [4, 1, 1],
  [4, 0, 1],
  [5, 1, 1],
  [5, 0, 2],
  [5, 2, 0],
  [6, 0, 1],
  [6, 0, 2],
  [6, 1, 2],
  [6, 2, 1],
  [6, 2, 0],
  [8, 3, 0],
  [8, 0, 3],
  [8, 3, 1],
  [8, 1, 3],
]

const BLOCKED: [number, number, number][] = [
  [7, 2, 2],
  [7, 4, 0],
  [6, 3, 0],
  [6, 0, 3],
  [3, 1, 1],
]

describe('validateRoleConfig', () => {
  it.each(ALLOWED)('%i players, %i undercover, %i Mr. White is allowed', (n, u, w) => {
    expect(validateRoleConfig(n, { undercover: u, mrWhite: w })).toBeNull()
  })

  it.each(BLOCKED)('%i players, %i undercover, %i Mr. White is rejected', (n, u, w) => {
    expect(validateRoleConfig(n, { undercover: u, mrWhite: w })).not.toBeNull()
  })

  it('requires at least one infiltrator', () => {
    expect(validateRoleConfig(5, { undercover: 0, mrWhite: 0 })).toBe('noInfiltrator')
  })

  it('rejects fractional or negative counts', () => {
    expect(validateRoleConfig(5, { undercover: 1.5, mrWhite: 0 })).toBe('invalidNumber')
    expect(validateRoleConfig(5, { undercover: -1, mrWhite: 2 })).toBe('invalidNumber')
  })

  it('rejects player counts outside 3..20', () => {
    expect(validateRoleConfig(2, { undercover: 1, mrWhite: 0 })).toBe('playerCount')
    expect(validateRoleConfig(21, { undercover: 1, mrWhite: 0 })).toBe('playerCount')
  })
})

describe('defaultRoleConfig', () => {
  it('is playable for every supported player count', () => {
    for (let n = GAME.MIN_PLAYERS; n <= GAME.MAX_PLAYERS; n++) {
      expect(validateRoleConfig(n, defaultRoleConfig(n)), `n=${n}`).toBeNull()
    }
  })

  it('has no Mr. White below 5 players and at least one above', () => {
    expect(defaultRoleConfig(4).mrWhite).toBe(0)
    expect(defaultRoleConfig(5).mrWhite).toBe(1)
  })

  it('throws outside the supported range', () => {
    expect(() => defaultRoleConfig(2)).toThrow(RangeError)
  })
})

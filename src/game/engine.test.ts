import { describe, expect, it } from 'vitest'

import { ACTION, PHASE, TEAM } from '@/const/phases'
import { ROLE } from '@/const/roles'

import {
  alivePlayers,
  checkWinner,
  computeScores,
  createGame,
  normalizeGuess,
  reduce,
  remainingInfiltrators,
  seatingOrder,
} from './engine'
import type { GameState, Player, Role } from './types'

const PAIR = { civilian: 'Coffee', undercover: 'Tea' }
const rng = () => 0

/** Game with fixed roles by seat (p0..), every card picked, in the describe phase of round 1. */
const describeState = (roles: Role[]): GameState => {
  let state = createGame({
    playerCount: roles.length,
    roleConfig: { undercover: 1, mrWhite: 0 },
    wordPair: PAIR,
    rng,
  })
  state = {
    ...state,
    players: state.players.map((p, i) => ({
      ...p,
      role: roles[i],
      word: roles[i] === ROLE.CIVILIAN ? 'Coffee' : roles[i] === ROLE.UNDERCOVER ? 'Tea' : null,
    })),
  }
  for (let i = 0; i < roles.length; i++) {
    state = reduce(state, { type: ACTION.CONFIRM_CARD, playerId: `p${i}`, name: `P${i}` }, rng)
  }
  return state
}

const voteState = (roles: Role[]) => reduce(describeState(roles), { type: ACTION.START_VOTE })
const oust = (state: GameState, playerId: string) =>
  reduce(state, { type: ACTION.ELIMINATE, playerId })

describe('createGame', () => {
  it('assigns roles and words according to the config', () => {
    const state = createGame({
      playerCount: 8,
      roleConfig: { undercover: 2, mrWhite: 1 },
      wordPair: PAIR,
    })
    const by = (role: Role) => state.players.filter((p) => p.role === role)
    expect(by(ROLE.CIVILIAN)).toHaveLength(5)
    expect(by(ROLE.UNDERCOVER)).toHaveLength(2)
    expect(by(ROLE.MR_WHITE)).toHaveLength(1)
    expect(by(ROLE.MR_WHITE)[0].word).toBeNull()
    expect(new Set(by(ROLE.CIVILIAN).map((p) => p.word)).size).toBe(1)
    expect(new Set(by(ROLE.UNDERCOVER).map((p) => p.word)).size).toBe(1)
    expect(by(ROLE.CIVILIAN)[0].word).not.toBe(by(ROLE.UNDERCOVER)[0].word)
    expect(state.phase).toBe(PHASE.REVEAL)
    expect(state.players.every((p) => !p.revealed)).toBe(true)
  })

  it('can give either word of the pair to the civilians', () => {
    const civilianWords = new Set<string>()
    for (const r of [0, 0.9]) {
      civilianWords.add(
        createGame({
          playerCount: 3,
          roleConfig: { undercover: 1, mrWhite: 0 },
          wordPair: PAIR,
          rng: () => r,
        }).civilianWord,
      )
    }
    expect(civilianWords).toEqual(new Set(['Coffee', 'Tea']))
  })

  it('rejects invalid player counts and role configs', () => {
    const base = { wordPair: PAIR, roleConfig: { undercover: 1, mrWhite: 0 } }
    expect(() => createGame({ ...base, playerCount: 2 })).toThrow(RangeError)
    expect(() =>
      createGame({ ...base, playerCount: 3, roleConfig: { undercover: 2, mrWhite: 0 } }),
    ).toThrow(RangeError)
  })
})

describe('card reveal', () => {
  const fresh = () =>
    createGame({ playerCount: 4, roleConfig: { undercover: 1, mrWhite: 0 }, wordPair: PAIR })

  it('lets cards be picked in any order and starts describing after the last one', () => {
    let state = fresh()
    for (const id of ['p2', 'p0', 'p3']) {
      state = reduce(state, { type: ACTION.CONFIRM_CARD, playerId: id, name: id.toUpperCase() })
      expect(state.phase).toBe(PHASE.REVEAL)
    }
    state = reduce(state, { type: ACTION.CONFIRM_CARD, playerId: 'p1', name: 'One' }, () => 0.5)
    expect(state.phase).toBe(PHASE.DESCRIBE)
    expect(state.round).toBe(1)
    expect(state.players[2].name).toBe('P2')
    expect(state.speakingOrder).toEqual(['p2', 'p3', 'p0', 'p1'])
  })

  it('trims names and rejects empty or duplicate ones', () => {
    let state = reduce(fresh(), { type: ACTION.CONFIRM_CARD, playerId: 'p0', name: '  Anna ' })
    expect(state.players[0].name).toBe('Anna')
    expect(() =>
      reduce(state, { type: ACTION.CONFIRM_CARD, playerId: 'p1', name: '   ' }),
    ).toThrow()
    expect(() =>
      reduce(state, { type: ACTION.CONFIRM_CARD, playerId: 'p1', name: 'ANNA' }),
    ).toThrow()
    state = reduce(state, { type: ACTION.CONFIRM_CARD, playerId: 'p1', name: 'Player 3' })
    expect(state.players[1].name).toBe('Player 3')
  })

  it('rejects picking the same card twice or an unknown card', () => {
    const state = reduce(fresh(), { type: ACTION.CONFIRM_CARD, playerId: 'p0', name: 'A' })
    expect(() => reduce(state, { type: ACTION.CONFIRM_CARD, playerId: 'p0', name: 'B' })).toThrow()
    expect(() => reduce(state, { type: ACTION.CONFIRM_CARD, playerId: 'p9', name: 'B' })).toThrow()
  })

  it('rejects other actions while cards are being picked', () => {
    expect(() => reduce(fresh(), { type: ACTION.START_VOTE })).toThrow()
  })
})

describe('describe and vote', () => {
  it('rejects actions outside their phase', () => {
    const state = describeState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER])
    expect(() => oust(state, 'p0')).toThrow()
    expect(() => reduce(state, { type: ACTION.DESCRIBE_AGAIN })).toThrow()
    expect(() => reduce(state, { type: ACTION.NEXT_ROUND })).toThrow()
    const vote = reduce(state, { type: ACTION.START_VOTE })
    expect(() => reduce(vote, { type: ACTION.START_VOTE })).toThrow()
  })

  it('ousts the chosen player and announces it', () => {
    const state = oust(
      voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER]),
      'p1',
    )
    expect(state.phase).toBe(PHASE.ELIMINATION)
    expect(state.players[1].alive).toBe(false)
    expect(state.history).toEqual([{ round: 1, playerId: 'p1', role: ROLE.CIVILIAN, guess: null }])
  })

  it('rejects ousting unknown or already ousted players', () => {
    const state = voteState([
      ROLE.CIVILIAN,
      ROLE.CIVILIAN,
      ROLE.CIVILIAN,
      ROLE.CIVILIAN,
      ROLE.UNDERCOVER,
    ])
    expect(() => oust(state, 'nobody')).toThrow()
    const next = reduce(oust(state, 'p1'), { type: ACTION.NEXT_ROUND })
    expect(() => oust(reduce(next, { type: ACTION.START_VOTE }), 'p1')).toThrow()
  })

  it('describe-again returns to describing in the same round without ousting anyone', () => {
    const before = voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER])
    const state = reduce(before, { type: ACTION.DESCRIBE_AGAIN })
    expect(state.phase).toBe(PHASE.DESCRIBE)
    expect(state.round).toBe(1)
    expect(alivePlayers(state)).toHaveLength(3)
    expect(state.speakingOrder).toEqual(before.speakingOrder)
    expect(state.history).toEqual([])
  })

  it('leaves ousted players out of later rounds', () => {
    let state = oust(
      voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER]),
      'p1',
    )
    state = reduce(state, { type: ACTION.NEXT_ROUND }, rng)
    expect(state.phase).toBe(PHASE.DESCRIBE)
    expect(state.round).toBe(2)
    expect(state.speakingOrder).toEqual(['p0', 'p2', 'p3', 'p4'])
  })
})

describe('Mr. White guess', () => {
  const mrWhiteOusted = () =>
    oust(
      voteState([
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.MR_WHITE,
        ROLE.UNDERCOVER,
      ]),
      'p4',
    )

  it('gives the ousted Mr. White a guess before anything else happens', () => {
    const state = mrWhiteOusted()
    expect(state.phase).toBe(PHASE.GUESS)
    expect(state.pendingGuesser).toBe('p4')
    expect(state.winner).toBeNull()
  })

  it('wins immediately on a correct guess, ignoring case and extra spaces', () => {
    const state = reduce(mrWhiteOusted(), { type: ACTION.SUBMIT_GUESS, guess: '  cOFFee ' })
    expect(state.phase).toBe(PHASE.FINISHED)
    expect(state.winner).toBe(TEAM.MR_WHITE)
    expect(state.history.at(-1)?.guess).toBe('  cOFFee ')
  })

  it('is accent-sensitive', () => {
    expect(normalizeGuess('Mắt')).not.toBe(normalizeGuess('Mất'))
    expect(normalizeGuess('Mắt')).toBe(normalizeGuess('  mắt '))
  })

  it('continues the game after a wrong guess', () => {
    const state = reduce(mrWhiteOusted(), { type: ACTION.SUBMIT_GUESS, guess: 'Tea' })
    expect(state.phase).toBe(PHASE.ELIMINATION)
    expect(state.winner).toBeNull()
    expect(state.players[4].alive).toBe(false)
  })

  it('still ends the game after a wrong guess if that completes a win condition', () => {
    const state = reduce(oust(voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.MR_WHITE]), 'p2'), {
      type: ACTION.SUBMIT_GUESS,
      guess: 'nope',
    })
    expect(state.phase).toBe(PHASE.ELIMINATION)
    expect(state.winner).toBe(TEAM.CIVILIANS)
    expect(reduce(state, { type: ACTION.NEXT_ROUND }).phase).toBe(PHASE.FINISHED)
  })
})

describe('win conditions', () => {
  const p = (id: string, role: Role, alive = true): Player => ({
    id,
    name: id,
    role,
    word: role === ROLE.MR_WHITE ? null : 'x',
    alive,
    revealed: true,
  })

  it('civilians win when the last infiltrator is ousted', () => {
    const state = oust(
      voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER]),
      'p3',
    )
    expect(state.phase).toBe(PHASE.ELIMINATION)
    expect(state.winner).toBe(TEAM.CIVILIANS)
    expect(reduce(state, { type: ACTION.NEXT_ROUND }).phase).toBe(PHASE.FINISHED)
  })

  it('infiltrators win when only one civilian is left', () => {
    const state = oust(voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER]), 'p0')
    expect(state.phase).toBe(PHASE.ELIMINATION)
    expect(state.winner).toBe(TEAM.INFILTRATORS)
    expect(reduce(state, { type: ACTION.NEXT_ROUND }).phase).toBe(PHASE.FINISHED)
  })

  it('undercover and Mr. White win together when one civilian remains', () => {
    expect(
      checkWinner([
        p('a', ROLE.CIVILIAN),
        p('b', ROLE.UNDERCOVER),
        p('c', ROLE.MR_WHITE),
        p('d', ROLE.CIVILIAN, false),
      ]),
    ).toBe(TEAM.INFILTRATORS)
  })

  it('keeps playing while two civilians face one infiltrator', () => {
    expect(
      checkWinner([p('a', ROLE.CIVILIAN), p('b', ROLE.CIVILIAN), p('c', ROLE.UNDERCOVER)]),
    ).toBeNull()
  })
})

describe('remainingInfiltrators', () => {
  it('counts only alive infiltrators per role', () => {
    const state = oust(
      voteState([
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.UNDERCOVER,
        ROLE.UNDERCOVER,
        ROLE.MR_WHITE,
      ]),
      'p3',
    )
    expect(remainingInfiltrators(state)).toEqual({ undercover: 1, mrWhite: 1 })
  })
})

describe('computeScores', () => {
  it('gives 3 points to every civilian, ousted or not, when civilians win', () => {
    let state = oust(
      voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER]),
      'p0',
    )
    state = oust(
      reduce(reduce(state, { type: ACTION.NEXT_ROUND }), { type: ACTION.START_VOTE }),
      'p4',
    )
    expect(state.winner).toBe(TEAM.CIVILIANS)
    expect(computeScores(state)).toEqual({ p0: 3, p1: 3, p2: 3, p3: 3, p4: 0 })
  })

  it('gives undercover 9 and Mr. White 7 when infiltrators win', () => {
    const state = oust(
      voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER, ROLE.MR_WHITE]),
      'p0',
    )
    expect(state.winner).toBe(TEAM.INFILTRATORS)
    expect(computeScores(state)).toEqual({ p0: 0, p1: 0, p2: 9, p3: 7 })
  })

  it('gives only Mr. White points on a successful guess', () => {
    const ousted = oust(
      voteState([
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.CIVILIAN,
        ROLE.MR_WHITE,
        ROLE.UNDERCOVER,
      ]),
      'p4',
    )
    const state = reduce(ousted, { type: ACTION.SUBMIT_GUESS, guess: 'Coffee' })
    expect(computeScores(state)).toEqual({ p0: 0, p1: 0, p2: 0, p3: 0, p4: 7, p5: 0 })
  })

  it('scores nothing before the game is finished', () => {
    const scores = computeScores(voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER]))
    expect(Object.values(scores).every((n) => n === 0)).toBe(true)
  })
})

describe('seatingOrder', () => {
  const ids = (state: GameState) => seatingOrder(state).map((p) => p.id)

  it('follows the speaking order and keeps a player ousted mid-round in place', () => {
    const state = voteState([ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.CIVILIAN, ROLE.UNDERCOVER])
    const before = ids(state)
    expect(before).toEqual(state.speakingOrder)
    expect(ids(oust(state, before[1]))).toEqual(before)
  })

  it('moves players ousted in earlier rounds behind the living ones', () => {
    const state = voteState([
      ROLE.CIVILIAN,
      ROLE.CIVILIAN,
      ROLE.CIVILIAN,
      ROLE.CIVILIAN,
      ROLE.UNDERCOVER,
    ])
    const ousted = state.speakingOrder[0]
    const next = reduce(oust(state, ousted), { type: ACTION.NEXT_ROUND }, rng)
    expect(ids(next).at(-1)).toBe(ousted)
    expect(ids(next).slice(0, -1)).toEqual(next.speakingOrder)
  })
})

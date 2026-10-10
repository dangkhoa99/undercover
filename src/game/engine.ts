import { GAME, POINTS } from '@/const/game'
import { ACTION, PHASE, TEAM } from '@/const/phases'
import { ROLE } from '@/const/roles'

import { validatePlayerName } from './names'
import { isValidPlayerCount, validateRoleConfig } from './roles'
import type {
  Action,
  GameState,
  Phase,
  Player,
  Rng,
  Role,
  RoleConfig,
  Team,
  WordPair,
} from './types'

export { POINTS }

export interface CreateGameOptions {
  playerCount: number
  roleConfig: RoleConfig
  wordPair: WordPair
  rng?: Rng
}

export const shuffle = <T>(items: readonly T[], rng: Rng): T[] => {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export const createGame = ({
  playerCount,
  roleConfig,
  wordPair,
  rng = Math.random,
}: CreateGameOptions): GameState => {
  if (!isValidPlayerCount(playerCount)) {
    throw new RangeError(`Invalid player count: ${playerCount}`)
  }

  const error = validateRoleConfig(playerCount, roleConfig)
  if (error) {
    throw new RangeError(`Invalid role config: ${error}`)
  }

  // Either word of the pair may end up as the civilian word.
  const [civilianWord, undercoverWord] =
    rng() < GAME.CIVILIAN_WORD_CHANCE
      ? [wordPair.civilian, wordPair.undercover]
      : [wordPair.undercover, wordPair.civilian]

  const roles: Role[] = shuffle(
    [
      ...Array<Role>(roleConfig.undercover).fill(ROLE.UNDERCOVER),
      ...Array<Role>(roleConfig.mrWhite).fill(ROLE.MR_WHITE),
      ...Array<Role>(playerCount - roleConfig.undercover - roleConfig.mrWhite).fill(ROLE.CIVILIAN),
    ],
    rng,
  )

  const players: Player[] = roles.map((role, i) => ({
    id: `${GAME.PLAYER_ID_PREFIX}${i}`,
    name: `${GAME.PLAYER_NAME_PREFIX} ${i + 1}`,
    role,
    word: role === ROLE.CIVILIAN ? civilianWord : role === ROLE.UNDERCOVER ? undercoverWord : null,
    alive: true,
    revealed: false,
  }))

  return {
    players,
    civilianWord,
    undercoverWord,
    phase: PHASE.REVEAL,
    round: 0,
    speakingOrder: [],
    pendingGuesser: null,
    history: [],
    winner: null,
  }
}

export const alivePlayers = (state: GameState): Player[] => {
  return state.players.filter((p) => p.alive)
}

/**
 * Grid order for the current round: speaking order first (fixed until the next round starts,
 * so players ousted mid-round keep their cell), then players ousted in earlier rounds.
 */
export const seatingOrder = (state: GameState): Player[] => {
  const byId = new Map(state.players.map((p) => [p.id, p]))
  const speaking = state.speakingOrder.flatMap((id) => byId.get(id) ?? [])
  return [...speaking, ...state.players.filter((p) => !state.speakingOrder.includes(p.id))]
}

/** Infiltrators still in the game; shown to everyone during play. */
export const remainingInfiltrators = (
  state: GameState,
): { undercover: number; mrWhite: number } => {
  const alive = alivePlayers(state)
  return {
    undercover: alive.filter((p) => p.role === ROLE.UNDERCOVER).length,
    mrWhite: alive.filter((p) => p.role === ROLE.MR_WHITE).length,
  }
}

/** Lenient on case and whitespace, strict on accents (Vietnamese tones change the word). */
export const normalizeGuess = (text: string): string => {
  return text.normalize(GAME.GUESS_NORMAL_FORM).trim().replace(/\s+/g, ' ').toLocaleLowerCase()
}

export const checkWinner = (players: readonly Player[]): Team | null => {
  const alive = players.filter((p) => p.alive)
  const infiltrators = alive.filter((p) => p.role !== ROLE.CIVILIAN).length
  if (infiltrators === 0) {
    return TEAM.CIVILIANS
  }
  if (alive.length - infiltrators <= 1) {
    return TEAM.INFILTRATORS
  }

  return null
}

/**
 * Points per player id once the game is finished. Every player of the winning side scores
 * (alive or not); infiltrators win together, so Undercover and Mr. White both score.
 */
export const computeScores = (state: GameState): Record<string, number> => {
  const winnerRoles: Record<Team, Role[]> = {
    [TEAM.CIVILIANS]: [ROLE.CIVILIAN],
    [TEAM.INFILTRATORS]: [ROLE.UNDERCOVER, ROLE.MR_WHITE],
    [TEAM.MR_WHITE]: [ROLE.MR_WHITE],
  }
  const winners: Role[] = state.winner ? winnerRoles[state.winner] : []
  return Object.fromEntries(
    state.players.map((p) => [p.id, winners.includes(p.role) ? POINTS[p.role] : 0]),
  )
}

const assertPhase = (state: GameState, ...allowed: Phase[]): void => {
  if (!allowed.includes(state.phase)) {
    throw new Error(`Invalid action in phase "${state.phase}"`)
  }
}

/** Starts describing with a random alive player, then seat order. */
const startDescribe = (state: GameState, round: number, rng: Rng): GameState => {
  const alive = alivePlayers(state)
  const start = Math.floor(rng() * alive.length)
  const ordered = [...alive.slice(start), ...alive.slice(0, start)]
  return { ...state, phase: PHASE.DESCRIBE, round, speakingOrder: ordered.map((p) => p.id) }
}

const confirmCard = (state: GameState, playerId: string, name: string, rng: Rng): GameState => {
  assertPhase(state, PHASE.REVEAL)
  const player = state.players.find((p) => p.id === playerId)
  if (!player || player.revealed) {
    throw new Error(`Cannot pick card "${playerId}"`)
  }

  const taken = state.players.filter((p) => p.revealed).map((p) => p.name)
  const error = validatePlayerName(name, taken)
  if (error) {
    throw new Error(`Invalid name: ${error}`)
  }

  const next: GameState = {
    ...state,
    players: state.players.map((p) =>
      p.id === playerId ? { ...p, name: name.trim(), revealed: true } : p,
    ),
  }
  return next.players.every((p) => p.revealed) ? startDescribe(next, GAME.FIRST_ROUND, rng) : next
}

/** Always announce the ousting first; a decided game moves to the result on the next tap. */
const afterElimination = (state: GameState): GameState => {
  return {
    ...state,
    phase: PHASE.ELIMINATION,
    winner: checkWinner(state.players),
    pendingGuesser: null,
  }
}

const eliminate = (state: GameState, id: string): GameState => {
  assertPhase(state, PHASE.VOTE)
  const target = state.players.find((p) => p.id === id)
  if (!target?.alive) {
    throw new Error(`Cannot eliminate "${id}"`)
  }

  const next: GameState = {
    ...state,
    players: state.players.map((p) => (p.id === id ? { ...p, alive: false } : p)),
    history: [
      ...state.history,
      { round: state.round, playerId: id, role: target.role, guess: null },
    ],
  }
  return target.role === ROLE.MR_WHITE
    ? { ...next, phase: PHASE.GUESS, pendingGuesser: id }
    : afterElimination(next)
}

const submitGuess = (state: GameState, guess: string): GameState => {
  assertPhase(state, PHASE.GUESS)
  const history = state.history.map((e, i) =>
    i === state.history.length - 1 ? { ...e, guess } : e,
  )
  const withGuess = { ...state, history }

  if (normalizeGuess(guess) === normalizeGuess(state.civilianWord)) {
    return { ...withGuess, phase: PHASE.FINISHED, winner: TEAM.MR_WHITE, pendingGuesser: null }
  }
  return afterElimination(withGuess)
}

/** Pure transition. Throws on actions that are illegal in the current state. */
export const reduce = (state: GameState, action: Action, rng: Rng = Math.random): GameState => {
  switch (action.type) {
    case ACTION.CONFIRM_CARD: {
      return confirmCard(state, action.playerId, action.name, rng)
    }
    case ACTION.START_VOTE: {
      assertPhase(state, PHASE.DESCRIBE)
      return { ...state, phase: PHASE.VOTE }
    }
    case ACTION.DESCRIBE_AGAIN: {
      assertPhase(state, PHASE.VOTE)
      return { ...state, phase: PHASE.DESCRIBE }
    }
    case ACTION.ELIMINATE: {
      return eliminate(state, action.playerId)
    }
    case ACTION.SUBMIT_GUESS: {
      return submitGuess(state, action.guess)
    }
    case ACTION.NEXT_ROUND: {
      assertPhase(state, PHASE.ELIMINATION)
      return state.winner
        ? { ...state, phase: PHASE.FINISHED }
        : startDescribe(state, state.round + 1, rng)
    }
  }
}

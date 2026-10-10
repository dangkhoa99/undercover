import type { ACTION, PHASE, TEAM } from '@/const/phases'
import type { ROLE } from '@/const/roles'

export type Role = (typeof ROLE)[keyof typeof ROLE]

export type Team = (typeof TEAM)[keyof typeof TEAM]

export type Rng = () => number

export interface Player {
  id: string
  /** Placeholder ("Player 3") until the player picks their card and enters a name. */
  name: string
  role: Role
  /** Mr. White has no word. */
  word: string | null
  alive: boolean
  /** True once the player picked a card, entered a name and saw their word. */
  revealed: boolean
}

export interface RoleConfig {
  undercover: number
  mrWhite: number
}

export interface WordPair {
  civilian: string
  undercover: string
}

export type Phase = (typeof PHASE)[keyof typeof PHASE]

export interface Elimination {
  round: number
  playerId: string
  role: Role
  /** Mr. White's final guess, if the ousted player was Mr. White. */
  guess: string | null
}

export interface GameState {
  /** Card order = seat order. */
  players: Player[]
  civilianWord: string
  undercoverWord: string
  phase: Phase
  /** 1-based; 0 while revealing words. */
  round: number
  /** Alive player ids in the order they describe their word. */
  speakingOrder: string[]
  /** Mr. White waiting for their guess. */
  pendingGuesser: string | null
  history: Elimination[]
  winner: Team | null
}

export type Action =
  | { type: typeof ACTION.CONFIRM_CARD; playerId: string; name: string }
  | { type: typeof ACTION.START_VOTE }
  | { type: typeof ACTION.DESCRIBE_AGAIN }
  | { type: typeof ACTION.ELIMINATE; playerId: string }
  | { type: typeof ACTION.SUBMIT_GUESS; guess: string }
  | { type: typeof ACTION.NEXT_ROUND }

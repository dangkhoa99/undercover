import { DEFAULT_ROLES, GAME } from '@/const/game'

import type { RoleConfig } from './types'

export type RoleConfigError =
  | 'playerCount'
  | 'invalidNumber'
  | 'noInfiltrator'
  /** Civilians would be outnumbered by infiltrators. */
  | 'tooManyInfiltrators'
  /** A single infiltrator role would make up half the table or more. */
  | 'tooManyOfRole'

export const isValidPlayerCount = (n: number): boolean => {
  return Number.isInteger(n) && n >= GAME.MIN_PLAYERS && n <= GAME.MAX_PLAYERS
}

export const defaultRoleConfig = (playerCount: number): RoleConfig => {
  if (!isValidPlayerCount(playerCount)) {
    throw new RangeError(`Invalid player count: ${playerCount}`)
  }

  const [undercover, mrWhite] = DEFAULT_ROLES[playerCount - GAME.MIN_PLAYERS]

  return { undercover, mrWhite }
}

/** Upper bounds for the role-picker UI. */
export const roleLimits = (playerCount: number): { infiltrators: number; perRole: number } => {
  return {
    infiltrators: Math.floor(playerCount / GAME.INFILTRATOR_DIVISOR),
    perRole: Math.floor((playerCount - 1) / GAME.INFILTRATOR_DIVISOR),
  }
}

/** Returns the first violated rule, or null when the config is playable. */
export const validateRoleConfig = (
  playerCount: number,
  config: RoleConfig,
): RoleConfigError | null => {
  if (!isValidPlayerCount(playerCount)) {
    return 'playerCount'
  }

  const { undercover, mrWhite } = config
  if (!Number.isInteger(undercover) || undercover < 0) {
    return 'invalidNumber'
  }
  if (!Number.isInteger(mrWhite) || mrWhite < 0) {
    return 'invalidNumber'
  }
  if (undercover + mrWhite < GAME.MIN_INFILTRATORS) {
    return 'noInfiltrator'
  }

  const limits = roleLimits(playerCount)
  if (undercover + mrWhite > limits.infiltrators) {
    return 'tooManyInfiltrators'
  }
  if (undercover > limits.perRole || mrWhite > limits.perRole) {
    return 'tooManyOfRole'
  }

  return null
}

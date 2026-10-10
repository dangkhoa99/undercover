import { ROLE } from '@/const/roles'

export const GAME = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 20,
  DEFAULT_PLAYER_COUNT: 8,
  /** Describe-timer lengths in seconds; 0 turns the timer off. */
  TIMER_OPTIONS: [0, 30, 60, 90],
  DEFAULT_DESCRIBE_SECONDS: 0,
  DEFAULT_SOUND: true,
  /** Chance the first word of a pair becomes the civilian word. */
  CIVILIAN_WORD_CHANCE: 0.5,
  FIRST_ROUND: 1,
  /** Infiltrators may be at most this fraction (1/n) of the table. */
  INFILTRATOR_DIVISOR: 2,
  MIN_INFILTRATORS: 1,
  COUNTDOWN_TICK_MS: 1000,
  GUESS_NORMAL_FORM: 'NFC',
  PLAYER_ID_PREFIX: 'p',
  PLAYER_NAME_PREFIX: 'Player',
  CUSTOM_WORD_ID_PREFIX: 'custom-',
  CUSTOM_CATEGORY: 'custom',
  WORD_KEY_SEPARATOR: ':',
} as const

export const POINTS = {
  [ROLE.CIVILIAN]: 3,
  [ROLE.MR_WHITE]: 7,
  [ROLE.UNDERCOVER]: 9,
} as const

/** Default [undercover, mrWhite] for MIN_PLAYERS..MAX_PLAYERS players, index = players - MIN_PLAYERS. */
export const DEFAULT_ROLES = [
  [1, 0],
  [1, 0],
  [1, 1],
  [1, 1],
  [1, 1],
  [2, 1],
  [2, 1],
  [2, 1],
  [2, 1],
  [2, 1],
  [3, 1],
  [3, 1],
  [3, 2],
  [3, 2],
  [3, 2],
  [3, 2],
  [4, 2],
  [4, 2],
] as const

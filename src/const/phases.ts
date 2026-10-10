export const PHASE = {
  /** Players pick a card each (any order), enter their name and see their word. */
  REVEAL: 'reveal',
  /** Everyone describes their word in `speakingOrder`. Discussion happens out loud. */
  DESCRIBE: 'describe',
  /** The group points fingers at once; the host ousts the chosen player. */
  VOTE: 'vote',
  /** Mr. White was ousted and gets one guess at the civilian word. */
  GUESS: 'guess',
  /** Announces who was ousted; the game goes on. */
  ELIMINATION: 'elimination',
  FINISHED: 'finished',
} as const

/** Winning side. `MR_WHITE` means Mr. White guessed the civilian word. */
export const TEAM = {
  CIVILIANS: 'civilians',
  INFILTRATORS: 'infiltrators',
  MR_WHITE: 'mrWhite',
} as const

export const ACTION = {
  /** Commit a card pick once the player has seen their word. */
  CONFIRM_CARD: 'CONFIRM_CARD',
  START_VOTE: 'START_VOTE',
  /** Go back to describing without ousting anyone (e.g. after a tie). */
  DESCRIBE_AGAIN: 'DESCRIBE_AGAIN',
  ELIMINATE: 'ELIMINATE',
  SUBMIT_GUESS: 'SUBMIT_GUESS',
  NEXT_ROUND: 'NEXT_ROUND',
} as const

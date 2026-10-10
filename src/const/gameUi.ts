import { TEAM } from '@/const/phases'

export const AVATAR_COLORS = ['bg-avatar-1', 'bg-avatar-2', 'bg-avatar-3'] as const

export const PLAYER_NAME_MAX_LENGTH = 20

export const SPEAKER_WARNING_SECONDS = 5

export const GAME_PHASE = {
  VOTE: 'vote',
  GUESS: 'guess',
  ELIMINATION: 'elimination',
  FINISHED: 'finished',
} as const

export const PICK_STEP = {
  NAME: 'name',
  WORD: 'word',
} as const

export const TURN_BADGE = {
  /** Centred on the avatar's rim at 45° so it sits half inside the circle. */
  POSITION: 'absolute top-[14.6%] left-[85.4%] -translate-1/2',
  SPRING: { type: 'spring', stiffness: 500, damping: 24 },
  STAGGER: 0.04,
} as const

export const SCORE_ROW = {
  HIDDEN_Y: 12,
  STAGGER: 0.05,
  DURATION: 0.25,
  BAR_DURATION: 0.6,
  BAR_DELAY: 0.2,
  BAR_EASE: 'easeOut',
} as const

export const SPLASH_TROPHY = {
  INITIAL: { scale: 0, rotate: -20 },
  ANIMATE: { scale: 1, rotate: 0 },
  TRANSITION: { type: 'spring', stiffness: 260, damping: 14, delay: 0.1 },
} as const

/** Gradient classes of the winner splash per winning team. */
export const SPLASH_BG: Record<(typeof TEAM)[keyof typeof TEAM], string> = {
  [TEAM.CIVILIANS]: 'from-splash-civilians-top to-splash-civilians-bottom',
  [TEAM.INFILTRATORS]: 'from-splash-infiltrators-top to-splash-infiltrators-bottom',
  [TEAM.MR_WHITE]: 'from-splash-mrwhite-top to-splash-mrwhite-bottom',
}

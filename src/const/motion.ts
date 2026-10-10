import { ROUTES } from '@/const/routes'

/** The page underneath moves only a fraction of the width, like a UINavigationController push. */
export const ROUTE_PARALLAX = '-28%'

export const ROUTE_TRANSITION = {
  DURATION: 0.45,
  EASE: [0.32, 0.72, 0, 1],
} as const

export const ROUTE_SCRIM_OPACITY = 0.5

/** Push/pop transitions are a touch-device idiom; wide (desktop) screens just swap pages. */
export const DESKTOP_QUERY = '(min-width: 1024px) and (hover: hover)'

/** Navigation-stack depth per path; unknown paths (group edit) count as the deepest level. */
export const ROUTE_DEPTH: Record<string, number> = {
  [ROUTES.HOME]: 0,
  [ROUTES.SETUP]: 1,
  [ROUTES.RULES]: 1,
  [ROUTES.SETTINGS]: 1,
  [ROUTES.GROUPS]: 2,
  [ROUTES.PLAY]: 2,
  [ROUTES.WORDS]: 2,
}

export const ROUTE_DEPTH_DEFAULT = 3

/** Like iOS, a pressed glass button grows with a springy overshoot. */
export const PRESS_SCALE = {
  SCALE: 1.18,
  SPRING: { type: 'spring', stiffness: 380, damping: 14 },
} as const

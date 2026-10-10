import { ROLE } from '@/const/roles'

/** Text colour class per role. */
export const ROLE_COLOR: Record<(typeof ROLE)[keyof typeof ROLE], string> = {
  [ROLE.CIVILIAN]: 'text-civilian',
  [ROLE.UNDERCOVER]: 'text-undercover',
  [ROLE.MR_WHITE]: 'text-mrwhite',
}

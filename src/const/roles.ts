/**
 * Role ids. The numeric prefix is the role's priority/sort order and is part of the stored value,
 * so saved games and i18n keys (`roles.000_CIVILIAN`) use the same ids.
 */
export const ROLE = {
  CIVILIAN: '000_CIVILIAN',
  UNDERCOVER: '100_UNDERCOVER',
  MR_WHITE: '200_MR_WHITE',
} as const

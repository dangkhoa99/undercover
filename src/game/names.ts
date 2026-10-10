export type NameError = 'emptyName' | 'duplicateName'

/** `takenNames`: names already chosen by other players. Case and surrounding spaces are ignored. */
export const validatePlayerName = (
  name: string,
  takenNames: readonly string[],
): NameError | null => {
  const normalized = name.trim().toLocaleLowerCase()
  if (normalized === '') {
    return 'emptyName'
  }

  return takenNames.some((n) => n.trim().toLocaleLowerCase() === normalized)
    ? 'duplicateName'
    : null
}

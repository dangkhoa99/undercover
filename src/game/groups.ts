import { GROUP_COLOR, GROUP_COLORS } from '@/const/groups'
export type GroupColor = (typeof GROUP_COLOR)[keyof typeof GROUP_COLOR]

/** A saved set of friends: lets a rematch skip typing names and keeps a running scoreboard. */
export interface Group {
  id: string
  /** Auto-assigned sequence number: 1, 2, 3… Used for the default name. */
  number: number
  /** Custom name; `null` = show the localized default "Group {number}". */
  name: string | null
  color: GroupColor
  /** Player names; the order is the order shown in the group. */
  members: string[]
  /** Running total points per member name. */
  scores: Record<string, number>
  /** Word pairs this group has played, as `${language}:${entryId}` (see `usedIdsFor`). */
  usedWords: string[]
  /** Epoch ms of the last finished game; `null` if never played. */
  lastPlayed: number | null
}

const same = (a: string, b: string) => a.trim().toLocaleLowerCase() === b.trim().toLocaleLowerCase()

export const nextGroupNumber = (groups: readonly Group[]): number => {
  return Math.max(0, ...groups.map((g) => g.number)) + 1
}

export const newGroup = (groups: readonly Group[], members: string[] = []): Group => {
  const number = nextGroupNumber(groups)

  return {
    id: crypto.randomUUID(),
    number,
    name: null,
    color: GROUP_COLORS[(number - 1) % GROUP_COLORS.length],
    members,
    scores: {},
    usedWords: [],
    lastPlayed: null,
  }
}

/** Adds `name` unless a member with the same name (case/space-insensitive) exists. */
export const withMember = (group: Group, name: string): Group => {
  const trimmed = name.trim()
  if (trimmed === '' || group.members.some((m) => same(m, trimmed))) {
    return group
  }

  return { ...group, members: [...group.members, trimmed] }
}

export const withoutMember = (group: Group, name: string): Group => {
  const { [name]: _dropped, ...scores } = group.scores

  return { ...group, members: group.members.filter((m) => m !== name), scores }
}

/** Adds each player's points to the group total, adding players who are not members yet. */
export const applyGameResult = (
  group: Group,
  players: readonly { id: string; name: string }[],
  points: Readonly<Record<string, number>>,
  now: number,
): Group => {
  let next = group
  const scores = { ...group.scores }

  for (const p of players) {
    next = withMember(next, p.name)
    const member = next.members.find((m) => same(m, p.name)) ?? p.name
    scores[member] = (scores[member] ?? 0) + (points[p.id] ?? 0)
  }

  return { ...next, scores, lastPlayed: now }
}

/** Names nobody has taken yet this game, in their original order. */
export const unclaimedNames = (
  names: readonly string[],
  takenNames: readonly string[],
): string[] => {
  return names.filter((m) => !takenNames.some((n) => same(n, m)))
}

/** A member's running total; 0 for names the group does not know. */
export const memberScore = (group: Group, name: string): number => {
  const key = group.members.find((m) => same(m, name))
  return key === undefined ? 0 : (group.scores[key] ?? 0)
}

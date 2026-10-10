export const GROUP_COLOR = {
  CORAL: 'coral',
  PEACH: 'peach',
  VIOLET: 'violet',
  SKY: 'sky',
  MINT: 'mint',
  ROSE: 'rose',
} as const

export const GROUP_COLORS = Object.values(GROUP_COLOR)

/** Background utility class per group colour (tokens live in index.css). */
export const GROUP_COLOR_CLASS: Record<(typeof GROUP_COLOR)[keyof typeof GROUP_COLOR], string> = {
  [GROUP_COLOR.CORAL]: 'bg-group-coral',
  [GROUP_COLOR.PEACH]: 'bg-group-peach',
  [GROUP_COLOR.VIOLET]: 'bg-group-violet',
  [GROUP_COLOR.SKY]: 'bg-group-sky',
  [GROUP_COLOR.MINT]: 'bg-group-mint',
  [GROUP_COLOR.ROSE]: 'bg-group-rose',
}

export const GROUP_NEW_ID = 'new'

export const INPUT_LIMIT = {
  GROUP_NAME: 30,
  WORD: 24,
} as const

export const MEMBER_ROW_MOTION = {
  DURATION: 0.18,
  HIDDEN: { height: 0, opacity: 0, overflow: 'hidden' },
  SHOWN: { height: 'auto', opacity: 1, transitionEnd: { overflow: 'visible' } },
} as const

export const GROUP_ITEM_MOTION = {
  OFFSET_Y: 16,
  STAGGER: 0.06,
  DURATION: 0.25,
} as const

export const SETUP_PLAYER_STEP = 1
export const STEPPER_MIN = 0

export const RULE_BULLET = '•'

export const RULE_KEYS = {
  ROUND: ['rules.round.1', 'rules.round.2', 'rules.round.3', 'rules.round.4'],
  WIN: ['rules.win.civilians', 'rules.win.infiltrators', 'rules.win.mrWhite'],
  TIPS: ['rules.tips.1', 'rules.tips.2', 'rules.tips.3'],
} as const

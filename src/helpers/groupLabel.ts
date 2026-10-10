import type { TFunction } from 'i18next'

import type { Group } from '@/game/groups'

export const groupLabel = (group: Group, t: TFunction): string =>
  group.name ?? t('groups.defaultName', { n: group.number })

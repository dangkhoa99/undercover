import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Frame } from '@/components/Frame'
import { ROLE_COLOR } from '@/const/roleColor'
import { RuleList } from '@/components/rules/RuleList'
import { RuleSection } from '@/components/rules/RuleSection'
import { RULE_KEYS } from '@/const/pages'
import { ROLE } from '@/const/roles'
import { ROUTES } from '@/const/routes'

const ROUND_STEPS = RULE_KEYS.ROUND.map((key) => ({ key }))
const WIN_RULES = RULE_KEYS.WIN.map((key) => ({ key }))
const TIPS = RULE_KEYS.TIPS.map((key) => ({ key }))

/** Static explanation of the game, in the current language. */
export const RulesPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const roles = Object.values(ROLE).map((role) => ({
    key: `rules.roles.${role}`,
    label: t(`roles.${role}`),
    labelClass: ROLE_COLOR[role],
  }))

  return (
    <Frame onBack={() => void navigate(ROUTES.HOME)} title={t('rules.title')}>
      <p className="text-center text-muted-foreground">{t('rules.intro')}</p>

      <RuleSection title={t('rules.roles.title')}>
        <RuleList items={roles} />
      </RuleSection>

      <RuleSection title={t('rules.round.title')}>
        <RuleList ordered items={ROUND_STEPS} />
      </RuleSection>

      <RuleSection title={t('rules.win.title')}>
        <RuleList items={WIN_RULES} />
      </RuleSection>

      <RuleSection title={t('rules.score.title')}>
        <p className="text-sm text-muted-foreground">{t('rules.score.body')}</p>
      </RuleSection>

      <RuleSection title={t('rules.tips.title')}>
        <RuleList items={TIPS} />
      </RuleSection>
    </Frame>
  )
}

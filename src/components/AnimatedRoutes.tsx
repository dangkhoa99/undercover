import React, { useState, useSyncExternalStore } from 'react'
import { Route, Routes, useLocation, type Location } from 'react-router-dom'

import { AnimatePresence, motion, MotionConfig, type Variants } from 'motion/react'

import { SkipLink } from '@/components/SkipLink'
import {
  DESKTOP_QUERY,
  ROUTE_DEPTH,
  ROUTE_DEPTH_DEFAULT,
  ROUTE_PARALLAX,
  ROUTE_SCRIM_OPACITY,
  ROUTE_TRANSITION,
} from '@/const/motion'
import { ROUTES } from '@/const/routes'
import { GroupEditPage } from '@/pages/GroupEditPage'
import { GroupsPage } from '@/pages/GroupsPage'
import { HomePage } from '@/pages/HomePage'
import { PlayPage } from '@/pages/PlayPage'
import { RulesPage } from '@/pages/RulesPage'
import { SetupPage } from '@/pages/SetupPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { WordsPage } from '@/pages/WordsPage'

/** How deep a screen sits in the navigation stack; deeper = "pushed", shallower = "popped". */
const depthOf = (pathname: string) => ROUTE_DEPTH[pathname] ?? ROUTE_DEPTH_DEFAULT

const TRANSITION = { duration: ROUTE_TRANSITION.DURATION, ease: ROUTE_TRANSITION.EASE }

const page: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : ROUTE_PARALLAX, zIndex: dir > 0 ? 2 : 1 }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: dir > 0 ? ROUTE_PARALLAX : '100%', zIndex: dir > 0 ? 1 : 2 }),
}

/** Black scrim over the page that is covered, fading as it comes back into view. */
const scrim: Variants = {
  enter: (dir: number) => ({ opacity: dir > 0 ? 0 : ROUTE_SCRIM_OPACITY }),
  center: { opacity: 0 },
  exit: (dir: number) => ({ opacity: dir > 0 ? ROUTE_SCRIM_OPACITY : 0 }),
}

interface AppRoutesProps {
  location: Location
}

const AppRoutes: React.FC<AppRoutesProps> = ({ location }) => {
  return (
    <Routes location={location}>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SETUP} element={<SetupPage />} />
      <Route path={ROUTES.PLAY} element={<PlayPage />} />
      <Route path={ROUTES.GROUPS} element={<GroupsPage />} />
      <Route path={ROUTES.GROUP_EDIT} element={<GroupEditPage />} />
      <Route path={ROUTES.WORDS} element={<WordsPage />} />

      <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      <Route path={ROUTES.RULES} element={<RulesPage />} />
    </Routes>
  )
}

const subscribeDesktop = (onChange: () => void) => {
  const mq = window.matchMedia(DESKTOP_QUERY)
  mq.addEventListener('change', onChange)

  return () => mq.removeEventListener('change', onChange)
}

const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches

/** Routes with iOS-style push (slide in from the right) and pop (slide out to the right). */
export const AnimatedRoutes: React.FC = () => {
  const location = useLocation()
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktop)
  const [nav, setNav] = useState({ path: location.pathname, direction: 1 })

  // Direction is derived from stack depth so "back" feels like back however it was triggered.
  if (nav.path !== location.pathname) {
    setNav({
      path: location.pathname,
      direction: depthOf(location.pathname) >= depthOf(nav.path) ? 1 : -1,
    })
  }

  if (desktop) {
    return (
      <div className="fixed inset-0 overflow-hidden app-bg">
        <SkipLink />

        <div className="h-full overflow-y-auto">
          <AppRoutes location={location} />
        </div>
      </div>
    )
  }

  return (
    <MotionConfig reducedMotion="user" transition={TRANSITION}>
      <SkipLink />

      <AnimatePresence initial={false} custom={nav.direction}>
        <motion.div
          key={location.pathname}
          custom={nav.direction}
          variants={page}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ ...TRANSITION, zIndex: { duration: 0 } }}
          className="fixed inset-0 overflow-hidden app-bg"
        >
          <div className="h-full overflow-y-auto">
            <AppRoutes location={location} />
          </div>

          <motion.div
            variants={scrim}
            className="pointer-events-none absolute inset-0 z-50 bg-black"
          />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}

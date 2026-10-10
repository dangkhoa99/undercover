import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AnimatedRoutes } from '@/components/AnimatedRoutes'
import { useHydrated } from '@/hooks/useHydrated'
import { useTheme } from '@/hooks/useTheme'

const App: React.FC = () => {
  const hydrated = useHydrated()

  useTheme()

  // Wait for IndexedDB so a reload never flashes an empty game or redirects away from /play.
  if (!hydrated) {
    return null
  }

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App

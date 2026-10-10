import { useEffect } from 'react'

/** While `active`, the browser's own prompt covers closing the tab or reloading. */
export const useUnloadWarning = (active: boolean) => {
  useEffect(() => {
    if (!active) {
      return () => {}
    }

    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)

    return () => window.removeEventListener('beforeunload', warn)
  }, [active])
}

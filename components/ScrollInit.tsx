'use client'

import { useEffect } from 'react'

// Runs once on every page load.
// - Disables browser scroll restoration so a hard-refresh always starts at top.
// - Forces window to scroll position 0 before any animations run.
export function ScrollInit() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return null
}

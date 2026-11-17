import { useSyncExternalStore } from 'react'

// Intro state, kept outside React so it survives route changes within one page load.
// 'playing'   → the scroll-driven intro covers the screen and the site is not mounted at all
// 'revealing' → the blast finished: the site is mounted below the intro and slides into view
// 'done'      → intro finished or skipped; normal site, never replays during this page load
//
// Replay policy: the intro runs once per page load, and only when that load lands on "/".
// Refreshing "/" replays it; in-app navigation (including returning to "/") does not.
// Reduced-motion visitors get the site immediately (no scroll choreography).
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let status = typeof window !== 'undefined' && window.location.pathname === '/' && !reduced ? 'playing' : 'done'
const subs = new Set()

export const introStore = {
  // Scroll position to restore once the intro spacer is removed (so the swap is visually seamless).
  pendingScroll: null,
  get: () => status,
  set(next) {
    if (status === next) return
    status = next
    subs.forEach((f) => f())
  },
  subscribe(f) {
    subs.add(f)
    return () => subs.delete(f)
  },
}

export const useIntroStatus = () => useSyncExternalStore(introStore.subscribe, introStore.get, () => 'done')

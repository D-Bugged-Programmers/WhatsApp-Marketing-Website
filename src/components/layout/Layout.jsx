import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import IntroExperience from '../intro/IntroExperience'
import { introStore, useIntroStatus } from '../../lib/intro'

// Scrolls to top on route changes only. Skipping the first run matters: the site mounts mid-scroll
// when the intro hands over, and that must not yank the viewport back to the top.
function ScrollToTop() {
  const { pathname } = useLocation()
  const last = useRef(pathname)
  useEffect(() => {
    if (last.current === pathname) return
    last.current = pathname
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  const intro = useIntroStatus()
  // When the intro's scroll track is removed, put the viewport exactly where it was relative to the site.
  useLayoutEffect(() => {
    if (intro === 'done' && introStore.pendingScroll != null) {
      // 'instant' overrides the site-wide smooth scrolling, so the swap is invisible.
      window.scrollTo({ top: introStore.pendingScroll, behavior: 'instant' })
      introStore.pendingScroll = null
      document.documentElement.style.overflowAnchor = ''
    }
  }, [intro])
  return (
    <>
      {intro !== 'done' && <IntroExperience />}
      {/* The site is not even mounted while the intro plays, so it cannot be reached early. */}
      {intro !== 'playing' && (
        <div className="flex min-h-screen flex-col">
          <ScrollToTop />
          <Header />
          <main id="main" className="flex-1">
            <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

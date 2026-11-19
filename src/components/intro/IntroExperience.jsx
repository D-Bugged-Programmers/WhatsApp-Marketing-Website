import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { ChevronsDown } from 'lucide-react'
import { LogoMark } from '../common/Logo'
import ErrorBoundary from '../common/ErrorBoundary'
import ScrollFallback from '../hero/ScrollFallback'
import { P0, P1, T } from '../hero/timeline'
import { introStore } from '../../lib/intro'

const ScrollScene = lazy(() => import('../hero/ScrollScene'))

const clamp = (v) => Math.min(1, Math.max(0, v))

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

// The intro is a fixed full-screen scene plus an invisible "scroll track" (spacer) that gives the
// page its scroll length. Scroll position → progress → scene. While the intro plays the site is not
// mounted, so the document is only as tall as the track and the site cannot be reached early.
//
//   scrollY 0 ........ range        : progress 0→1 (campaign, blast, phone settles right)
//   scrollY range .... range + 0.8vh: intro fades, the (now mounted) site slides up into view
//   scrollY ≥ track end             : track removed, normal scrolling, intro gone for this load
export default function IntroExperience() {
  const [mobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [webgl] = useState(webglAvailable)
  const dims = useRef({ vh: window.innerHeight, S: 0 })
  const [trackH, setTrackH] = useState(0)
  const finished = useRef(false)

  const p = useMotionValue(0)
  const fade = useMotionValue(1)
  const { scrollY } = useScroll()

  // Track height = a few screens of scrolling (shorter on phones).
  useEffect(() => {
    const measure = () => {
      const vh = window.innerHeight
      dims.current = { vh, S: Math.round(vh * (mobile ? 3.4 : 4.6)) }
      setTrackH(dims.current.S)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [mobile])

  // Always start at the top on refresh instead of restoring a mid-intro scroll position.
  useEffect(() => {
    const prev = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.documentElement.style.overflowAnchor = 'none'
    return () => { window.history.scrollRestoration = prev }
  }, [])

  const finish = (scrollTo) => {
    if (finished.current) return
    finished.current = true
    introStore.pendingScroll = scrollTo
    introStore.set('done')
  }

  const update = (y) => {
    const { vh, S } = dims.current
    const range = Math.max(1, S - vh)
    p.set(clamp(y / range))
    fade.set(1 - clamp((y - range) / (0.8 * vh)))
    // Blast finished: mount the site beneath so it can slide in. Scrolling back up before this just reverses the intro.
    if (y / range >= 0.995) { finish(0); return }
    // Land on the hero (top of the site) even if a fast scroll overshot the track.
    if (y >= S) finish(0)
  }
  useMotionValueEvent(scrollY, 'change', update)
  useEffect(() => { if (trackH) update(window.scrollY) }, [trackH]) // eslint-disable-line react-hooks/exhaustive-deps

  const layout = useRef(mobile
    ? { nx0: 0, ny0: 0, s0: 0.95, nxC: 0, nyC: 0, sC: 1.05, nx1: 0.3, ny1: -0.25, s1: 0.5 }
    : { nx0: 0, ny0: 0, s0: 1, nxC: 0, nyC: 0, sC: 1.12, nx1: 0.5, ny1: 0, s1: 0.62 })

  const hintOpacity = useTransform(p, [0.01, 0.06], [1, 0])
  const barScale = useTransform(p, [0, 1], [0, 1])
  const pb = P0 + ((P1 - P0) * T.blast) / T.end
  const flash = useTransform(p, [pb - 0.012, pb + 0.004, pb + 0.05], [0, 0.35, 0])
  const sweepX = useTransform(p, [0.8, 0.95], ['-70%', '190%'])
  const sweepOpacity = useTransform(p, [0.79, 0.82, 0.95, 0.98], [0, 1, 1, 0])
  // Hero copy fades in on the left while the phone settles on the right, so that side is never empty.
  const copyOpacity = useTransform(p, [0.72, 0.86], [0, 1])
  const copyX = useTransform(p, [0.72, 0.9], [-48, 0])
  const events = useTransform(fade, (v) => (v > 0.05 ? 'auto' : 'none'))

  return (
    <>
      <div aria-hidden="true" className="bg-[#020a06]" style={{ height: trackH }} />
      <motion.div role="region" aria-label="PingReach intro" style={{ opacity: fade, pointerEvents: events }} className="fixed inset-0 z-[100] overflow-hidden bg-[#020a06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_55%,rgb(6_78_59/0.55),transparent_70%)]" aria-hidden="true" />
        <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="absolute inset-0" aria-hidden="true">
          {webgl ? (
            <ErrorBoundary fallback={<ScrollFallback progress={p} mobile={mobile} />}>
              <Suspense fallback={null}>
                <ScrollScene progress={p} layout={layout} active mobile={mobile} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <ScrollFallback progress={p} mobile={mobile} />
          )}
        </div>
        <motion.div aria-hidden="true" style={{ opacity: flash }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(167_243_208/0.6),transparent_55%)]" />
        <motion.div aria-hidden="true" style={{ x: sweepX, opacity: sweepOpacity }} className="pointer-events-none absolute inset-y-0 w-[55%] -skew-x-12 bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent blur-xl" />
        <motion.div aria-hidden="true" style={{ opacity: copyOpacity, x: copyX }} className="pointer-events-none absolute inset-x-0 bottom-[10%] mx-auto w-full max-w-7xl px-5 sm:px-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 lg:px-8">
          <div className="text-center md:max-w-[46%] md:text-left">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300">WELCOME TO PINGREACH</p>
            <p className="mt-2 hidden text-xl font-medium text-emerald-100/90 sm:block">Welcome to PingReach!</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-[2.9rem]">
              Reach Thousands.<span className="block text-emerald-300">One Message at a Time.</span>
            </h2>
            <p className="mt-4 hidden max-w-xl text-lg leading-relaxed text-green-100/75 md:block">
              Create campaigns, connect with your audience, and manage your messaging — all in one place.
            </p>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute left-5 top-[max(1.25rem,env(safe-area-inset-top))] flex items-center gap-2 sm:left-8 sm:top-7">
          <LogoMark className="size-7" /><span className="text-sm font-bold tracking-tight text-white">PingReach</span>
        </div>
        <button type="button" onClick={() => finish(0)} className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] inline-flex min-h-11 items-center rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur transition hover:border-white/50 hover:text-white sm:right-8 sm:top-6">
          Skip intro
        </button>
        <motion.div aria-hidden="true" style={{ opacity: hintOpacity }} className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center text-sm text-emerald-200/80">
          Scroll to launch your campaign <ChevronsDown className="mt-1 size-5 animate-bounce" />
        </motion.div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
          <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10"><motion.div style={{ scaleX: barScale }} className="h-full origin-left rounded-full bg-emerald-300" /></div>
        </div>
        <p className="sr-only" role="status">PingReach intro. Scroll to watch a simulated campaign launch. No messages are sent. Use the Skip intro button to go straight to the website.</p>
      </motion.div>
    </>
  )
}

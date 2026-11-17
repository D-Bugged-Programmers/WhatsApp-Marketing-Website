import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Bell, CheckCircle2, FileText, Loader2 } from 'lucide-react'
import ErrorBoundary from '../common/ErrorBoundary'
import MessagingScreen from './MessagingScreen'
import { useDemoStep } from './demoSequence'

// The 3D scene (three.js + R3F) is a separate chunk, loaded only for the hero.
const Scene3D = lazy(() => import('./Scene3D'))

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch { return false }
}

// Lightweight CSS phone for phones, the loading state, and when WebGL is unavailable.
export function PhoneFallback({ step, reduce }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="absolute bottom-[6%] h-10 w-56 rounded-[50%] bg-emerald-400/30 blur-xl" />
      <div className="absolute size-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative aspect-[1/2.05] h-[94%] max-h-[500px] overflow-hidden rounded-[2rem] border-[5px] border-[#1d3a2c] bg-black shadow-[0_0_60px_-10px_rgb(52_211_153/0.5)]"
      >
        {step === undefined ? <div className="size-full animate-pulse bg-[#06150d]" /> : <MessagingScreen step={step} reduce={reduce} />}
        <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      </motion.div>
    </div>
  )
}

const card = 'absolute w-44 rounded-2xl border border-white/15 bg-white/[0.07] p-3 text-xs text-emerald-50 shadow-[0_12px_40px_-12px_rgb(16_185_129/0.45)] backdrop-blur-md'

// Four decorative glass cards. Each floats on its own timing; they only show on wider screens.
export function FloatingCards({ step, reduce }) {
  const done = step >= 5
  const items = [
    { key: 'status', pos: 'right-0 top-[14%] hidden md:block', y: 9, dur: 5.2, rot: 1.2, body: (
      <>
        <p className="text-[11px] text-emerald-200/70">Campaign Status</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-white">
          {done ? <><CheckCircle2 aria-hidden="true" className="size-4 text-emerald-300" /> Completed</> : <><Loader2 aria-hidden="true" className="size-4 animate-spin text-emerald-300" /> In progress</>}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-emerald-300" animate={{ width: `${done ? 100 : [0, 8, 40, 65, 88][step] ?? 0}%` }} transition={{ duration: 0.8 }} /></div>
        <p className="mt-1.5 text-[10px] text-emerald-200/50">Simulated demo</p>
      </>) },
    { key: 'audience', pos: 'bottom-[26%] left-0 hidden lg:block', y: 11, dur: 6.4, rot: -1.5, body: (
      <>
        <p className="text-[11px] text-emerald-200/70">Audience</p>
        <p className="mt-1 text-sm font-semibold text-white">Contacts organized</p>
        <div className="mt-2 flex -space-x-2">{['bg-emerald-400', 'bg-lime-300', 'bg-teal-400', 'bg-emerald-600'].map((c) => <span key={c} className={`size-6 rounded-full border-2 border-[#0a2417] ${c}`} />)}</div>
      </>) },
    { key: 'templates', pos: 'bottom-[10%] right-0 hidden lg:block', y: 8, dur: 5.8, rot: 1, body: (
      <>
        <p className="flex items-center gap-1.5 text-[11px] text-emerald-200/70"><FileText aria-hidden="true" className="size-3.5" /> Message Templates</p>
        <p className="mt-2 rounded-lg bg-white/10 px-2 py-1.5">Hi {'{name}'}, welcome aboard!</p>
        <p className="mt-1.5 rounded-lg bg-white/10 px-2 py-1.5">Your offer is ready.</p>
      </>) },
    { key: 'notify', pos: 'left-0 top-[8%] hidden md:block', y: 10, dur: 6, rot: -1, body: (
      <p className="flex items-center gap-2 text-sm font-semibold text-white"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/20"><Bell aria-hidden="true" className="size-4 text-emerald-300" /></span>Your campaign is ready</p>) },
  ]
  return (
    <>
      {items.map(({ key, pos, y, dur, rot, body }, i) => (
        <motion.div key={key} className={`${card} ${pos} z-10`}
          initial={reduce ? false : { opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 1.5 + i * 0.25, duration: 0.6, ease: 'easeOut' }}>
          <motion.div animate={reduce ? undefined : { y: [0, -y, 0], rotate: [0, rot, 0] }} transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
            {body}
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}

export default function HeroVisual() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [visible, setVisible] = useState(true)
  const [ok] = useState(webglAvailable)
  // Phones get the lighter CSS phone.
  const [mobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const step = useDemoStep(reduce)

  // Pause 3D rendering when scrolled out of view.
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div id="hero-visual" ref={ref} className="relative mx-auto h-[500px] w-full max-w-[640px] sm:h-[540px] lg:h-[620px]" aria-hidden="true">
      {ok && !mobile ? (
        <ErrorBoundary fallback={<PhoneFallback step={step} reduce={reduce} />}>
          <Suspense fallback={<PhoneFallback reduce={reduce} />}>
            <Scene3D active={visible} reduce={reduce} step={step} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <PhoneFallback step={step} reduce={reduce} />
      )}
      <FloatingCards step={step} reduce={reduce} />
    </div>
  )
}

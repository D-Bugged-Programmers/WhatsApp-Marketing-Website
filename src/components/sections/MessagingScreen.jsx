import { AnimatePresence, motion } from 'motion/react'
import { CheckCheck, Check } from 'lucide-react'
import { LogoMark } from '../common/Logo'
import { FINAL_STEP, STEP_PROGRESS, useDemoStep } from './demoSequence'

// Sizes use em units against a container-query font size so it scales with any phone size.

function Ring({ value }) {
  const r = 16, c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 40 40" className="size-[2.4em] -rotate-90" aria-hidden="true">
      <circle cx="20" cy="20" r={r} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="4" />
      <motion.circle cx="20" cy="20" r={r} fill="none" stroke="#6ee7b7" strokeWidth="4" strokeLinecap="round" strokeDasharray={c}
        animate={{ strokeDashoffset: c * (1 - value / 100) }} transition={{ duration: 0.8, ease: 'easeOut' }} />
    </svg>
  )
}

const bubble = { initial: { opacity: 0, y: 12, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0 }, transition: { duration: 0.35 } }

export default function MessagingScreen({ step: stepProp, reduce = false }) {
  const own = useDemoStep(reduce)
  const step = stepProp ?? own
  const sent = step >= 2
  return (
    <div className="size-full [container-type:inline-size]">
    <div className="relative size-full overflow-hidden bg-[#06150d] text-white" style={{ fontSize: '3.9cqw' }}>
      <div className="flex items-center gap-[0.7em] bg-[#0c2a1b] px-[1em] pb-[0.7em] pt-[2.4em]">
        <LogoMark className="size-[2em]" />
        <div className="min-w-0 leading-tight">
          <p className="font-semibold">PingReach</p>
          <p className="text-[0.72em] text-emerald-300/80">Campaign · simulated demo</p>
        </div>
      </div>
      <p className="px-[1em] pt-[0.9em] text-[0.72em] text-emerald-100/60">To: Alex · sample contact</p>
      <div className="space-y-[0.5em] px-[1em] pt-[0.4em]">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div key="b1" {...bubble} className="ml-auto w-[78%] rounded-[1em] rounded-br-[0.2em] bg-brand p-[0.6em]">
              <p>Hi Alex! 👋</p>
              <p className="mt-[0.3em] flex items-center justify-end gap-[0.3em] text-[0.7em] text-white/85">
                {sent ? <>Sent <CheckCheck aria-hidden="true" className="size-[1.2em] text-lime" /></> : <><Check aria-hidden="true" className="size-[1.2em] opacity-60" /> Sending…</>}
              </p>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div key="b2" {...bubble} className="ml-auto w-[84%] rounded-[1em] rounded-br-[0.2em] bg-brand p-[0.6em]">
              <p>We have something special for you.</p>
              <p className="mt-[0.3em] flex justify-end text-[0.7em]"><CheckCheck aria-hidden="true" className="size-[1.2em] text-lime" /></p>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div key="b3" {...bubble} className="ml-auto w-[84%] rounded-[1em] rounded-br-[0.2em] bg-brand p-[0.6em]">
              <p>Discover our latest offers today!</p>
              <p className="mt-[0.3em] flex justify-end text-[0.7em]"><CheckCheck aria-hidden="true" className="size-[1.2em] text-lime" /></p>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="dots" {...bubble} className="flex w-[4.2em] justify-center gap-[0.35em] rounded-[1em] bg-[#12301f] py-[0.7em]" aria-hidden="true">
              {[0, 1, 2].map((i) => <motion.i key={i} className="size-[0.5em] rounded-full bg-emerald-300" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute inset-x-[0.8em] bottom-[0.8em]">
        <div className="flex items-center gap-[0.7em] rounded-[1em] border border-white/10 bg-white/5 p-[0.6em]">
          <Ring value={STEP_PROGRESS[step]} />
          <div className="leading-tight">
            <p className="text-[0.72em] text-emerald-100/60">Campaign progress (simulated)</p>
            <p className="font-semibold">{step >= FINAL_STEP ? 'Campaign completed ✓' : `${STEP_PROGRESS[step]}%`}</p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {step >= FINAL_STEP && !reduce && (
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgb(110_231_183/0.28),transparent_60%)]" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.6 }} />
        )}
      </AnimatePresence>
    </div>
    </div>
  )
}

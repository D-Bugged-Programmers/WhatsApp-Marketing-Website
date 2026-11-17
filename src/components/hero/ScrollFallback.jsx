import { useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'motion/react'
import MessagingScreen from '../sections/MessagingScreen'
import { P0, P1, T } from './timeline'

// CSS version of the scroll sequence for browsers without WebGL. Same rule as the 3D scene:
// every value is derived from scroll progress, nothing runs on a timer.
const p = (t) => P0 + ((P1 - P0) * t) / T.end
const STEPS = [[1.9, 1], [2.9, 2], [3.3, 3], [3.8, 4], [4.4, 5]]

const BURST = Array.from({ length: 22 }, (_, i) => {
  const a = (i / 22) * Math.PI * 2 + (i % 3) * 0.25
  const r = 34 + (i % 5) * 9
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r * 0.8, hue: ['bg-emerald-500', 'bg-emerald-300', 'bg-lime-300', 'bg-green-600'][i % 4] }
})

function Bubble({ progress, b, mobile }) {
  const x = useTransform(progress, [p(T.blast), p(T.end)], [0, b.dx])
  const y = useTransform(progress, [p(T.blast), p(T.end)], [0, b.dy])
  const opacity = useTransform(progress, [p(T.blast) - 0.001, p(T.blast), p(6.8), p(T.end)], [0, 1, 1, 0])
  const scale = useTransform(progress, [p(T.blast), p(5.4)], [0.2, mobile ? 1.1 : 1.6])
  return <motion.span aria-hidden="true" style={{ x: useTransform(x, (v) => `${v}vmin`), y: useTransform(y, (v) => `${v}vmin`), opacity, scale }} className={`absolute left-1/2 top-1/2 h-5 w-8 rounded-full ${b.hue} shadow-[0_0_14px_rgb(52_211_153/0.8)]`} />
}

export default function ScrollFallback({ progress, mobile }) {
  const [step, setStep] = useState(0)
  useMotionValueEvent(progress, 'change', (v) => {
    const t = Math.min(T.end, Math.max(0, ((v - P0) / (P1 - P0)) * T.end))
    const s = STEPS.reduce((acc, [at, st]) => (t >= at ? st : acc), 0)
    setStep((cur) => (cur === s ? cur : s))
  })
    const x = useTransform(progress, [P0, p(1.4), p(T.trans), p(T.end)], ['0vw', '0vw', '0vw', mobile ? '8vw' : '26vw'])
  const scale = useTransform(progress, [P0, p(1.4), p(T.trans), p(T.end)], [0.95, 1, 1, 0.6])
  const y = useTransform(progress, [p(T.trans), p(T.end)], ['0vh', mobile ? '14vh' : '0vh'])
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <motion.div style={{ x, y, scale }} className="relative aspect-[1/2.05] h-[min(68vh,520px)] overflow-hidden rounded-[2rem] border-[5px] border-[#1d3a2c] bg-black shadow-[0_0_80px_-10px_rgb(52_211_153/0.6)]">
        <MessagingScreen step={step} />
        <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      </motion.div>
      {BURST.map((b, i) => <Bubble key={i} progress={progress} b={b} mobile={mobile} />)}
    </div>
  )
}

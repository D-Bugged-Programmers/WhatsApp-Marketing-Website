import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { Users, FileText, Send, CheckCheck } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { steps } from '../../data/content'

const mini = [
  () => <div className="flex items-center gap-2 text-xs text-ink"><Users aria-hidden="true" className="size-4 text-brand" />Sample audience list</div>,
  () => <div className="flex items-center gap-2 text-xs text-ink"><FileText aria-hidden="true" className="size-4 text-brand" />Template: Welcome</div>,
  () => <div className="flex items-center gap-2 text-xs text-ink"><Send aria-hidden="true" className="size-4 text-brand" />Ready for review</div>,
  () => <div className="flex items-center gap-2 text-xs text-ink"><CheckCheck aria-hidden="true" className="size-4 text-brand" />Status view (sample)</div>,
]

export default function HowItWorksSection() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section ref={ref} className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="How it works" title="Simple Steps. Smarter Messaging." />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <div aria-hidden="true" className="absolute left-7 top-7 h-[calc(100%-3.5rem)] w-0.5 bg-green-100 md:left-[12.5%] md:right-[12.5%] md:h-0.5 md:w-auto">
            <motion.div className="h-full w-full origin-top bg-brand md:origin-left" style={reduce ? undefined : { scaleY: progress }} />
          </div>
          {steps.map(({ icon: Icon, title, text }, i) => {
            const Mini = mini[i]
            return (
              <Reveal key={title} delay={i * 0.1}>
                <li className="relative flex gap-4 md:block md:text-center">
                  <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-night text-lime shadow-float md:mx-auto"><Icon aria-hidden="true" className="size-6" /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand md:mt-5">Step {i + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted md:mx-auto">{text}</p>
                    <motion.div aria-hidden="true" animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 4, repeat: 2, ease: 'easeInOut' }} className="mt-4 inline-block rounded-xl border border-line bg-white px-3 py-2 shadow-card"><Mini /></motion.div>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ol>
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted">This website demonstrates the product experience. Actual sending depends on a messaging provider and backend being integrated.</p>
      </Container>
    </section>
  )
}

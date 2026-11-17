import { motion, useReducedMotion } from 'motion/react'
import Container from './Container'

export default function PageHero({ eyebrow, title, description, children }) {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-soft-mesh pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div aria-hidden="true" className="aurora -left-24 -top-24 size-96 bg-emerald-300/30" />
      <div aria-hidden="true" className="aurora -right-24 top-10 size-80 bg-lime/30" style={{ animationDelay: '-6s' }} />
      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 backdrop-blur"><span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-brand" />{eyebrow}</p>}
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-6xl sm:leading-[1.05]">{title}</h1>
          {description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </Container>
    </section>
  )
}

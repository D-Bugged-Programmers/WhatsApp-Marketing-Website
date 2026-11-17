import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { features } from '../../data/features'
import { contactsSample, deliverySeries } from '../../data/dashboard'

// Small custom visuals, one per feature (decorative, sample content).
const visuals = {
  contacts: () => (
    <ul className="mt-5 space-y-2">
      {contactsSample.map((c) => (
        <li key={c.name} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs">
          <span className="flex size-6 items-center justify-center rounded-full bg-soft font-semibold text-brand-dark">{c.name[0]}</span>
          <span className="flex-1 text-ink">{c.name}</span>
          <span className="rounded bg-surface px-1.5 py-0.5 text-muted">{c.tag}</span>
          <span className="text-muted">{c.optIn ? 'Opted in' : 'Pending'}</span>
        </li>
      ))}
    </ul>
  ),
  campaigns: () => (
    <div className="mt-5 space-y-3">
      {[['Spring offer', 90], ['Order updates', 60], ['Reminders', 25]].map(([n, p]) => (
        <div key={n}>
          <div className="mb-1 flex justify-between text-xs text-muted"><span>{n}</span><span>{p}% ready</span></div>
          <div className="h-2 rounded-full bg-line"><motion.div className="h-2 rounded-full bg-brand" initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} /></div>
        </div>
      ))}
    </div>
  ),
  templates: () => (
    <div className="mt-5 rounded-xl bg-[#e7f5ec] p-3"><div className="rounded-lg rounded-tl-none bg-white p-2.5 text-xs text-ink shadow-sm">Hi {'{{1}}'}, your order {'{{2}}'} has shipped.<span className="mt-1 flex items-center gap-1 text-[10px] text-brand-dark"><Check aria-hidden="true" className="size-3" /> Approved status (sample)</span></div></div>
  ),
  analytics: () => (
    <div className="mt-5 flex h-20 items-end gap-1.5" aria-hidden="true">
      {deliverySeries.map((d) => <motion.span key={d.label} className="flex-1 rounded-t bg-brand/80" initial={{ height: 0 }} whileInView={{ height: `${d.delivered}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }} />)}
    </div>
  ),
}

const span = { contacts: 'lg:col-span-3', campaigns: 'lg:col-span-3', templates: 'lg:col-span-3', analytics: 'lg:col-span-3' }

export default function FeatureBento() {
  return (
    <section id="features" className="scroll-mt-16 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Features" title="Everything You Need to Reach Your Audience" description="Plan your messaging campaigns, organize your contacts, and manage communication from one convenient workspace." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((f, i) => {
            const Visual = visuals[f.id]
            const Icon = f.icon
            return (
              <Reveal key={f.id} delay={(i % 3) * 0.08} className={`${span[f.id]} `}>
                <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="card-glow group h-full overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-white to-soft/60 p-6 shadow-card transition-shadow duration-300 hover:border-brand/40 hover:shadow-float">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-night-grad text-lime shadow-[0_6px_16px_-4px_rgb(5_46_27/0.6)]"><Icon aria-hidden="true" className="size-5" /></span>
                    <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.description}</p>
                  <div aria-hidden="true"><Visual /></div>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

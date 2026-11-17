import { Check } from 'lucide-react'
import { useSeo } from '../lib/seo'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Reveal from '../components/common/Reveal'
import Button from '../components/common/Button'
import CTASection from '../components/common/CTASection'
import { detailedFeatures } from '../data/features'
import { links } from '../config/site'

function Illustration({ icon: Icon, points }) {
  return (
    <div className="relative rounded-2xl border border-line bg-gradient-to-br from-soft to-white p-6 shadow-card sm:p-8">
      <div aria-hidden="true" className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand text-white shadow-float"><Icon className="size-7" /></div>
      <div aria-hidden="true" className="space-y-2.5">
        {points.map((p, i) => (
          <div key={p} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3 py-2.5">
            <span className="size-2 rounded-full bg-brand" style={{ opacity: 1 - i * 0.18 }} />
            <span className="h-2 rounded bg-slate-200" style={{ width: `${85 - i * 14}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Features() {
  useSeo({ title: 'Features', description: 'Contact management, campaign planning, templates, scheduling, analytics and team access for WhatsApp Business messaging.' })
  return (
    <>
      <PageHero eyebrow="Features" title="Tools for organized, responsible messaging" description="A closer look at the capabilities planned for the platform. Features described here reflect the intended product, not a released service.">
        <div className="flex flex-col justify-center gap-3 sm:flex-row"><Button to={links.getStarted} size="lg">Get Started</Button><Button to="/pricing" variant="secondary" size="lg">View Pricing</Button></div>
      </PageHero>
      {detailedFeatures.map((f, i) => (
        <section key={f.id} className={`py-14 sm:py-20 ${i % 2 ? 'bg-surface' : ''}`} aria-labelledby={`f-${f.id}`}>
          <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 ? 'lg:order-2' : ''}>
              <h2 id={`f-${f.id}`} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{f.title}</h2>
              <p className="mt-3 text-base text-muted sm:text-lg">{f.description}</p>
              <ul className="mt-6 space-y-3">
                {f.points.map((p) => <li key={p} className="flex gap-3 text-sm text-ink sm:text-base"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />{p}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className={i % 2 ? 'lg:order-1' : ''}><Illustration icon={f.icon} points={f.points} /></Reveal>
          </Container>
          {i === 2 && (
            <Container className="mt-14"><div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-soft p-6 sm:flex-row sm:p-8"><p className="font-semibold text-brand-dark">Want to see how templates fit your use case?</p><Button to={links.contactSales}>Talk to us</Button></div></Container>
          )}
        </section>
      ))}
      <CTASection />
    </>
  )
}

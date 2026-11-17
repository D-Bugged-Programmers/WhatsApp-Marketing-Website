import { Info } from 'lucide-react'
import { useSeo } from '../lib/seo'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Reveal from '../components/common/Reveal'
import CTASection from '../components/common/CTASection'
import { journey } from '../data/content'

export default function HowItWorks() {
  useSeo({ title: 'How It Works', description: 'The step-by-step journey from creating an account to monitoring campaign reports on the WhatsApp Business Platform.' })
  return (
    <>
      <PageHero eyebrow="How it works" title="From account setup to campaign reports" description="Seven steps that describe the intended user journey." />
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div role="note" className="mb-10 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p><strong>Status:</strong> This describes proposed platform capabilities. This marketing website itself does not implement account creation, WhatsApp connection or messaging. Eligibility, templates, permissions and messaging limits are determined by the WhatsApp Business Platform.</p>
          </div>
          <ol className="relative space-y-8 border-l-2 border-green-200 pl-8 sm:pl-10">
            {journey.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title}>
                <li className="relative">
                  <span aria-hidden="true" className="absolute -left-[3.05rem] flex size-10 items-center justify-center rounded-full bg-brand text-white ring-4 ring-white sm:-left-[3.3rem]"><Icon className="size-5" /></span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">Step {i + 1}</p>
                  <h2 className="mt-1 text-lg font-semibold text-ink sm:text-xl">{title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
      <CTASection />
    </>
  )
}

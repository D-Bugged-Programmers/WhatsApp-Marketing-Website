import { useSeo } from '../lib/seo'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import SectionHeading from '../components/common/SectionHeading'
import Reveal from '../components/common/Reveal'
import Button from '../components/common/Button'
import CTASection from '../components/common/CTASection'
import { principles } from '../data/content'
import { site } from '../config/site'

export default function About() {
  useSeo({ title: 'About', description: 'Our mission, the problem we aim to solve, and our approach to privacy and responsible messaging.' })
  return (
    <>
      <PageHero eyebrow="About" title={`About ${site.name}`} description="A product idea focused on making business messaging more organized and more responsible." />
      <section className="py-14 sm:py-20">
        <Container className="grid max-w-5xl gap-10 md:grid-cols-2">
          <Reveal><h2 className="text-2xl font-bold text-ink">Our mission</h2><p className="mt-3 leading-relaxed text-muted">To give small and medium-sized businesses a clear, simple way to manage WhatsApp Business communication, from contacts to campaigns to reporting.</p></Reveal>
          <Reveal delay={0.1}><h2 className="text-2xl font-bold text-ink">The problem we aim to solve</h2><p className="mt-3 leading-relaxed text-muted">Many teams manage contacts in spreadsheets, rebuild campaigns repeatedly and lack a clear view of results. We want to bring that work together in one place.</p></Reveal>
        </Container>
      </section>
      <section className="bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading title="Product principles" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (<Reveal key={p.title} delay={i * 0.06} className="h-full"><div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card"><h3 className="font-semibold text-ink">{p.title}</h3><p className="mt-2 text-sm text-muted">{p.text}</p></div></Reveal>))}
          </div>
        </Container>
      </section>
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-bold text-ink">Privacy and responsible messaging</h2>
            <p className="mt-3 leading-relaxed text-muted">We believe messaging should only reach people who have agreed to receive it. The platform is designed to work through the official WhatsApp Business Platform, to record consent, to support opt-outs, and to respect applicable policies and laws. Customers remain responsible for their own compliance.</p>
            <div className="mt-6"><Button to="/contact">Contact the team</Button></div>
          </Reveal>
        </Container>
      </section>
      <CTASection />
    </>
  )
}

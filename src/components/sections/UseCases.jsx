import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import FeatureCard from '../common/FeatureCard'
import { useCases } from '../../data/content'

export default function UseCases() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Use cases" title="Built for the way businesses talk to customers" description="Every use case requires recipient consent and compliance with WhatsApp’s messaging policies and applicable laws." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u, i) => <FeatureCard key={u.title} icon={u.icon} title={u.title} description={u.text} delay={(i % 3) * 0.08} />)}
        </div>
      </Container>
    </section>
  )
}

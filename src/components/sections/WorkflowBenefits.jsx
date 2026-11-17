import { CheckCircle2 } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { workflowBenefits } from '../../data/content'

export default function WorkflowBenefits() {
  return (
    <section className="bg-soft-mesh py-16 sm:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-2">
        <SectionHeading align="left" eyebrow="Why PingReach" title="Designed to Make Messaging Simpler" description="A focused workspace for organizing your audience, reusing templates and keeping an eye on campaigns." />
        <ul className="space-y-4">
          {workflowBenefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <li className="card-glow flex gap-4 rounded-xl border border-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-float">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                <div><h3 className="font-semibold text-ink">{b.title}</h3><p className="mt-1 text-sm text-muted">{b.text}</p></div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

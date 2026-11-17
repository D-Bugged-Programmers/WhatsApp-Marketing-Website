import { X, Check } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { problems } from '../../data/features'
import { site } from '../../config/site'

export default function ProblemSolution() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="The challenge" title="Business messaging gets messy fast" description={`${site.name} replaces ad-hoc workflows with one organized process.`} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-ink">Without a system</h3>
              <ul className="mt-5 space-y-4">
                {problems.map((p) => (
                  <li key={p.problem} className="flex gap-3 text-sm text-muted"><X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-500" /><span><span className="sr-only">Problem: </span>{p.problem}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-green-200 bg-soft p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-brand-dark">With {site.name}</h3>
              <ul className="mt-5 space-y-4">
                {problems.map((p) => (
                  <li key={p.solution} className="flex gap-3 text-sm text-ink"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" /><span><span className="sr-only">Solution: </span>{p.solution}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

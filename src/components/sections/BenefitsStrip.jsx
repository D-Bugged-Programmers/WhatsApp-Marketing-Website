import Container from '../common/Container'
import Reveal from '../common/Reveal'
import { benefits } from '../../data/features'

export default function BenefitsStrip() {
  return (
    <section aria-label="Key benefits" className="border-b border-line bg-white py-6 shadow-[0_8px_24px_-16px_rgb(20_83_45/0.25)]">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-soft to-emerald-100 text-brand"><Icon aria-hidden="true" className="size-5" /></span>
                <span className="text-sm font-semibold text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}

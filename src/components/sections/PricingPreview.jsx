import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import PricingCard from '../common/PricingCard'
import Button from '../common/Button'
import { plans } from '../../data/pricing'

export default function PricingPreview() {
  return (
    <section className="bg-night-grad relative overflow-hidden py-16 text-white sm:py-24">
      <Container className="relative">
        <SectionHeading dark eyebrow="Pricing" title="Plans That Fit Your Needs" description="Pricing shown is a placeholder until final plans are announced. Contact us for details." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => <PricingCard key={p.id} plan={p} delay={i * 0.08} dark />)}
        </div>
        <div className="mt-8 text-center"><Button to="/pricing" variant="outlineLight">Compare plans in detail</Button></div>
      </Container>
    </section>
  )
}

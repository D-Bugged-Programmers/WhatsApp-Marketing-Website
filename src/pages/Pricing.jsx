import { Check, Minus } from 'lucide-react'
import { useSeo } from '../lib/seo'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import PricingCard from '../components/common/PricingCard'
import SectionHeading from '../components/common/SectionHeading'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/common/CTASection'
import { plans, comparison, pricingFaqs } from '../data/pricing'

function Cell({ v }) {
  if (v === true) return <><Check aria-hidden="true" className="mx-auto size-4 text-brand" /><span className="sr-only">Included</span></>
  if (v === false) return <><Minus aria-hidden="true" className="mx-auto size-4 text-slate-300" /><span className="sr-only">Not included</span></>
  return <span className="text-sm text-ink">{v}</span>
}

export default function Pricing() {
  useSeo({ title: 'Pricing', description: 'Illustrative plan structure for the platform. Contact us for pricing.' })
  return (
    <>
      <PageHero eyebrow="Pricing" title="Simple plans, pricing on request" description="Prices are not yet finalized. The plans below are an illustrative structure; no checkout or payment is available." />
      <section className="py-14 sm:py-20">
        <Container><div className="grid gap-6 lg:grid-cols-3">{plans.map((p, i) => <PricingCard key={p.id} plan={p} delay={i * 0.08} />)}</div></Container>
      </section>
      <section className="bg-surface py-14 sm:py-20">
        <Container>
          <SectionHeading title="Compare plans" description="Illustrative feature comparison." />
          <div className="mt-10 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-card md:block">
            <table className="w-full text-left">
              <caption className="sr-only">Plan feature comparison (illustrative)</caption>
              <thead><tr className="border-b border-line bg-surface text-sm"><th scope="col" className="p-4 font-semibold text-ink">Feature</th>{plans.map((p) => <th key={p.id} scope="col" className="p-4 text-center font-semibold text-ink">{p.name}</th>)}</tr></thead>
              <tbody>{comparison.map((r) => (
                <tr key={r.feature} className="border-b border-line last:border-0"><th scope="row" className="p-4 text-sm font-medium text-ink">{r.feature}</th>{['starter', 'growth', 'business'].map((k) => <td key={k} className="p-4 text-center"><Cell v={r[k]} /></td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <div className="mt-10 space-y-4 md:hidden">
            {plans.map((p) => (
              <div key={p.id} className="rounded-xl border border-line bg-white p-4">
                <h3 className="font-semibold text-ink">{p.name}</h3>
                <dl className="mt-3 divide-y divide-line">
                  {comparison.map((r) => (<div key={r.feature} className="flex items-center justify-between gap-3 py-2"><dt className="text-sm text-muted">{r.feature}</dt><dd><Cell v={r[p.id]} /></dd></div>))}
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <FAQSection items={pricingFaqs} title="Pricing questions" />
      <CTASection title="Need a custom quote?" text="Tell us about your messaging needs and we will get back to you with options." />
    </>
  )
}

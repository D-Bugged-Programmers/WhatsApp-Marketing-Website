import { Check } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import { links } from '../../config/site'

export default function PricingCard({ plan, delay = 0, dark = false }) {
  const to = plan.cta === 'Contact Sales' ? links.contactSales : links.getStarted
  const shell = dark
    ? plan.highlight
      ? 'border-lime/60 bg-white/10 shadow-[0_0_60px_-10px_rgb(190_242_100/0.45)] backdrop-blur'
      : 'glass hover:border-white/30'
    : plan.highlight
      ? 'border-brand bg-white shadow-float ring-1 ring-brand'
      : 'border-line bg-white shadow-card'
  const head = dark ? 'text-white' : 'text-ink'
  const sub = dark ? 'text-slate-300' : 'text-muted'
  const variant = plan.highlight ? (dark ? 'lime' : 'primary') : dark ? 'outlineLight' : 'secondary'
  return (
    <Reveal delay={delay} className="h-full">
      <article className={`relative flex h-full flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 ${shell}`}>
        {plan.highlight && <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-0.5 text-xs font-semibold text-night">Recommended (illustrative)</span>}
        <h3 className={`text-xl font-bold ${head}`}>{plan.name}</h3>
        <p className={`mt-1 text-sm ${sub}`}>{plan.blurb}</p>
        <p className={`mt-6 text-3xl font-bold ${head}`}>{plan.price}</p>
        <p className={`text-xs ${sub}`}>Placeholder — pricing not finalized</p>
        <ul className="mt-6 flex-1 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className={`flex items-start gap-2 text-sm ${dark ? 'text-slate-100' : 'text-ink'}`}>
              <Check aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${dark ? 'text-lime' : 'text-brand'}`} />
              {f}
            </li>
          ))}
        </ul>
        <Button to={to} variant={variant} className="mt-8 w-full">{plan.cta}</Button>
      </article>
    </Reveal>
  )
}

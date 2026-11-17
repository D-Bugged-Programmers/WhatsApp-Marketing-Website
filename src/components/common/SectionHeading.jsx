import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'center', as: Tag = 'h2', dark = false }) {
  const a = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <Reveal className={`max-w-2xl ${a}`}>
      {eyebrow && <p className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${dark ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200' : 'border-brand/20 bg-soft text-brand-700'}`}><span aria-hidden="true" className={`size-1.5 rounded-full ${dark ? 'bg-lime' : 'bg-brand'}`} />{eyebrow}</p>}
      <Tag className={`text-3xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ink'} sm:text-5xl sm:leading-[1.1]`}>{title}</Tag>
      {description && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-green-100/70' : 'text-muted'}`}>{description}</p>}
    </Reveal>
  )
}

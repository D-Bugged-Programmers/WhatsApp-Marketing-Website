import Reveal from './Reveal'

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card-glow group h-full rounded-2xl border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-float">
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-soft to-emerald-100 text-brand transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:from-brand group-hover:to-brand-700 group-hover:text-white">
          <Icon aria-hidden="true" className="size-5" />
        </div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </article>
    </Reveal>
  )
}

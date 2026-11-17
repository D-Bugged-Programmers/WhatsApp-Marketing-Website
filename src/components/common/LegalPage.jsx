import { TriangleAlert } from 'lucide-react'
import PageHero from './PageHero'
import Container from './Container'
import { site } from '../../config/site'

export default function LegalPage({ title, intro, sections }) {
  return (
    <>
      <PageHero title={title} description={intro} />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div role="note" className="mb-10 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p><strong>Starter template.</strong> This document is a placeholder that must be reviewed and customized by a qualified legal professional before public launch. It is not guaranteed to comply with the laws of any jurisdiction. Last updated: {site.lastUpdated}.</p>
          </div>
          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-xl font-semibold text-ink">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

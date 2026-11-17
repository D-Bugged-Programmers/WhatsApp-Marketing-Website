import { useSeo } from '../lib/seo'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import ContactForm from '../components/forms/ContactForm'
import { site } from '../config/site'

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Get in touch to discuss your WhatsApp Business messaging needs.' })
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the team" description="Tell us about your business and messaging goals." />
      <section className="py-14 sm:py-20">
        <Container className="grid max-w-5xl gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3"><ContactForm /></div>
          <aside className="lg:col-span-2" aria-label="Contact details">
            <h2 className="text-lg font-semibold text-ink">Other ways to reach us</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div><dt className="font-medium text-ink">Email</dt><dd className="text-muted">{site.contact.email}</dd></div>
              <div><dt className="font-medium text-ink">Phone</dt><dd className="text-muted">{site.contact.phone}</dd></div>
              <div><dt className="font-medium text-ink">Address</dt><dd className="text-muted">{site.contact.address}</dd></div>
            </dl>
            <p className="mt-6 rounded-lg bg-soft p-4 text-sm text-brand-dark">Contact details above are placeholders and will be replaced before launch.</p>
          </aside>
        </Container>
      </section>
    </>
  )
}

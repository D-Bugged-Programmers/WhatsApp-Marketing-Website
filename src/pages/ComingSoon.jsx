import { useSeo } from '../lib/seo'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { site } from '../config/site'

export default function ComingSoon() {
  useSeo({ title: 'Login (coming soon)', description: 'Customer login is not available yet.' })
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Placeholder</p>
        <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Login is coming soon</h1>
        <p className="mt-4 text-muted">{site.name} accounts are not available yet. There is no authentication on this website. Contact us to register your interest.</p>
        <div className="mt-8 flex justify-center gap-3"><Button to="/contact">Contact us</Button><Button to="/" variant="secondary">Back home</Button></div>
      </Container>
    </section>
  )
}

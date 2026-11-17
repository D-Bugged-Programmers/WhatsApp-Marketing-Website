import { useSeo } from '../lib/seo'
import Container from '../components/common/Container'
import Button from '../components/common/Button'

export default function NotFound() {
  useSeo({ title: 'Page not found' })
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold text-brand">404</p>
        <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-muted">The page you are looking for does not exist.</p>
        <div className="mt-8"><Button to="/">Back to home</Button></div>
      </Container>
    </section>
  )
}

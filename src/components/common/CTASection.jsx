import Container from './Container'
import Button from './Button'
import Reveal from './Reveal'
import { links } from '../../config/site'

export default function CTASection({
  title = 'Ready to Make Every Message Count?',
  text = 'Bring your messaging workflow together with PingReach.',
}) {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="cta-heading">
      <Container>
        <Reveal>
          <div className="bg-night-grad relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-24">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
            <div aria-hidden="true" className="aurora -top-24 left-1/4 size-80 bg-lime/25" />
            <div className="relative">
              <h2 id="cta-heading" className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl sm:leading-[1.1]">{title}</h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-green-100 sm:text-lg">{text}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button to={links.getStarted} variant="lime" size="lg">Get Started</Button>
                <Button to={links.featuresPage} variant="outlineLight" size="lg">Explore Features</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

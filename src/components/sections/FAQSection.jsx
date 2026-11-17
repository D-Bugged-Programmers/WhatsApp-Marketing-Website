import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import FAQAccordion from '../common/FAQAccordion'

export default function FAQSection({ items, title = 'Frequently asked questions', description }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={title} description={description} />
        <div className="mt-10"><FAQAccordion items={items} /></div>
      </Container>
    </section>
  )
}

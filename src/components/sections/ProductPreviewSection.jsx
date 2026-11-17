import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import ProductPreview from '../dashboard/ProductPreview'

export default function ProductPreviewSection() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Product preview" title="See your campaigns at a glance" description="Try the tabs and filters. This is an illustrative preview with sample data; it does not send real messages." />
        <Reveal className="mt-12"><ProductPreview /></Reveal>
      </Container>
    </section>
  )
}

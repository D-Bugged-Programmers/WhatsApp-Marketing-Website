import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Tilt from '../common/Tilt'
import DashboardPreview from '../dashboard/DashboardPreview'
import { CheckCheck, CalendarClock } from 'lucide-react'

// 3D-tilted dashboard. Every number here is illustrative sample data.
export default function DashboardMockup() {
  return (
    <section className="bg-night-grad relative overflow-hidden py-16 text-white sm:py-24">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-30" />
      <Container className="relative">
        <SectionHeading dark eyebrow="Product showcase" title="Your whole campaign workflow, one dashboard" description="An illustrative mockup with sample data. Nothing here represents real customers or real delivery results." />
        <div className="relative mt-12">
          <Tilt base={[6, -8]} max={6}>
            <DashboardPreview />
            <div aria-hidden="true" className="absolute border border-emerald-300/30 bg-night/95 backdrop-blur -left-2 top-10 hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-white shadow-float md:flex" style={{ transform: 'translateZ(70px)' }}>
              <CheckCheck className="size-4 text-lime" /> Delivered · sample
            </div>
            <div aria-hidden="true" className="absolute border border-emerald-300/30 bg-night/95 backdrop-blur -right-2 bottom-24 hidden items-center gap-2 rounded-xl px-3 py-2 text-xs text-white shadow-float md:flex" style={{ transform: 'translateZ(90px)' }}>
              <CalendarClock className="size-4 text-lime" /> Scheduled · Mar 18 (sample)
            </div>
          </Tilt>
        </div>
      </Container>
    </section>
  )
}

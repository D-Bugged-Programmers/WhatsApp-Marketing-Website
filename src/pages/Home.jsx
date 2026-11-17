import { useSeo } from '../lib/seo'
import HeroSection from '../components/sections/HeroSection'
import BenefitsStrip from '../components/sections/BenefitsStrip'
import FeatureBento from '../components/sections/FeatureBento'
import DashboardMockup from '../components/sections/DashboardMockup'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import WorkflowBenefits from '../components/sections/WorkflowBenefits'
import PricingPreview from '../components/sections/PricingPreview'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/common/CTASection'
import { faqs } from '../data/faqs'

export default function Home() {
  useSeo({ description: 'Create campaigns, connect with your audience, and manage your messaging — all in one place with PingReach.' })
  return (
    <>
      <HeroSection />
      <BenefitsStrip />
      <FeatureBento />
      <HowItWorksSection />
      <DashboardMockup />
      <WorkflowBenefits />
      <PricingPreview />
      <FAQSection items={faqs} />
      <CTASection />
    </>
  )
}

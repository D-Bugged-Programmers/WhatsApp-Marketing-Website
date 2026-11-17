import { useSeo } from '../lib/seo'
import LegalPage from '../components/common/LegalPage'
import { site } from '../config/site'

const sections = [
  { h: '1. Agreement', p: `These terms govern use of the ${site.name} website and services provided by ${site.legalEntity}. [Complete once the service is defined.]` },
  { h: '2. The service', p: 'The platform is intended to help businesses organize contacts and campaigns for use with the WhatsApp Business Platform. Availability of features may vary. [Define service scope.]' },
  { h: '3. Acceptable use', p: 'You must not use the service for spam, unlawful messaging, or in violation of WhatsApp’s Business and Commerce policies. You must hold valid consent from every recipient you message.' },
  { h: '4. Third-party services', p: 'The service relies on third-party platforms, including the WhatsApp Business Platform, whose terms, pricing and limits are set by their providers and may change.' },
  { h: '5. Fees and payment', p: '[Add pricing, billing and refund terms — to be determined.]' },
  { h: '6. Disclaimers and liability', p: '[Add warranty disclaimers and limitations of liability as advised by counsel.]' },
  { h: '7. Termination', p: '[Describe suspension and termination terms.]' },
  { h: '8. Governing law', p: '[Add governing law and jurisdiction.]' },
]

export default function TermsOfService() {
  useSeo({ title: 'Terms of Service', description: 'Starter terms of service template for review and customization.' })
  return <LegalPage title="Terms of Service" intro="The terms for using this website and service." sections={sections} />
}

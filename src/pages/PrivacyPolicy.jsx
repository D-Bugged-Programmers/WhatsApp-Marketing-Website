import { useSeo } from '../lib/seo'
import LegalPage from '../components/common/LegalPage'
import { site } from '../config/site'

const sections = [
  { h: '1. Who we are', p: `This policy is issued by ${site.legalEntity} ("we"), operator of the ${site.name} website. Contact: ${site.contact.email}.` },
  { h: '2. Information we collect', p: 'When you use the contact form we would collect the details you enter (name, work email, company, business type and message). [Add any analytics, cookies or other data collection here.] Currently the contact form is a demo and does not transmit or store data.' },
  { h: '3. How we use information', p: '[Describe purposes such as responding to enquiries, improving the service and legal compliance.]' },
  { h: '4. Sharing and processors', p: '[List service providers, hosting and any third parties that may receive data.]' },
  { h: '5. Data retention', p: '[Add retention periods — to be determined.]' },
  { h: '6. Your rights', p: '[Describe rights available under applicable data protection law and how to exercise them.]' },
  { h: '7. Messaging and consent', p: 'Customers of the platform are responsible for obtaining valid consent from their recipients and for following WhatsApp Business Platform policies. [Expand as the product is defined.]' },
  { h: '8. Changes to this policy', p: '[Explain how updates are communicated.]' },
]

export default function PrivacyPolicy() {
  useSeo({ title: 'Privacy Policy', description: 'Starter privacy policy template for review and customization.' })
  return <LegalPage title="Privacy Policy" intro="How we handle information on this website." sections={sections} />
}

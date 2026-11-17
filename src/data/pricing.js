// Illustrative placeholders. Replace `price` with real values (or keep "Contact us") once commercial terms exist.
export const plans = [
  { id: 'starter', name: 'Starter', price: 'Contact us', blurb: 'For small teams getting organized.', highlight: false, cta: 'Get Started', features: ['Contact management', 'Message template library', 'Basic campaign reporting', 'Single user'] },
  { id: 'growth', name: 'Growth', price: 'Contact us', blurb: 'For growing teams running regular campaigns.', highlight: true, cta: 'Get Started', features: ['Everything in Starter', 'Contact segmentation', 'Campaign scheduling', 'Multiple team members'] },
  { id: 'business', name: 'Business', price: 'Contact us', blurb: 'For agencies and multi-team businesses.', highlight: false, cta: 'Contact Sales', features: ['Everything in Growth', 'Role-based permissions', 'Advanced reporting', 'Priority onboarding support'] },
]

// true = included, false = not included, string = detail
export const comparison = [
  { feature: 'Contact management', starter: true, growth: true, business: true },
  { feature: 'Message template library', starter: true, growth: true, business: true },
  { feature: 'Campaign reporting', starter: 'Basic', growth: 'Standard', business: 'Advanced' },
  { feature: 'Contact segmentation', starter: false, growth: true, business: true },
  { feature: 'Campaign scheduling', starter: false, growth: true, business: true },
  { feature: 'Team members', starter: '1', growth: 'Multiple', business: 'Unlimited' },
  { feature: 'Role-based permissions', starter: false, growth: false, business: true },
  { feature: 'Onboarding support', starter: 'Email', growth: 'Email', business: 'Priority' },
]

export const pricingFaqs = [
  { q: 'What does it cost?', a: 'The prices shown on this site are placeholders. Contact us for pricing while commercial terms are being finalized.' },
  { q: 'Are WhatsApp conversation charges included?', a: 'WhatsApp Business Platform charges messaging fees separately according to Meta’s current pricing. Check Meta’s documentation for up-to-date rates; platform fees would be in addition to any plan fee.' },
  { q: 'Can I change plans later?', a: 'Plan changes and billing terms will be defined when pricing is finalized. Contact the team to discuss your needs.' },
  { q: 'Is there a free trial?', a: 'This has not been decided yet. Reach out through the contact page and we will share current options.' },
]

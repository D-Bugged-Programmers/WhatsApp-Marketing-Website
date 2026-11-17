// Central configuration: edit brand, links and placeholder business details here.
export const site = {
  name: 'PingReach',
  tagline: 'Reach Thousands. One Message at a Time.',
  description:
    'Create campaigns, connect with your audience, and manage your messaging — all in one place.',
  url: (import.meta.env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, ''),
  // Placeholders — replace before launch. Nothing here is a real contact detail.
  contact: {
    email: '[contact email — to be added]',
    phone: '[phone number — to be added]',
    address: '[business address — to be added]',
  },
  legalEntity: '[Legal entity name — to be added]',
  lastUpdated: '[Date — to be added]',
}

// CTA destinations. Point these at a real signup/login once they exist.
export const links = {
  // Set VITE_SIGNUP_URL to an internal path (/signup) or a full https:// URL.
  getStarted: import.meta.env.VITE_SIGNUP_URL || '/contact',
  contactSales: '/contact',
  login: '/login',
  // Hash target: the hero's Explore button scrolls to the features section on the home page.
  explore: '#features',
  featuresPage: '/features',
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerLinks = {
  Product: [
    { label: 'Features', to: '/features' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Pricing', to: '/pricing' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Support: [
    { label: 'Contact Support', to: '/contact' },
    { label: 'Login', to: '/login' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
  ],
}

import { ShoppingBag, Store, CalendarCheck, Bell, Briefcase, Wrench, Plug, UsersRound, LineChart, FileCheck2, Megaphone, CalendarClock, UserPlus } from 'lucide-react'

export const useCases = [
  { icon: ShoppingBag, title: 'E-commerce updates', text: 'Order confirmations, shipping updates and back-in-stock alerts for customers who opted in.' },
  { icon: Store, title: 'Retail promotions', text: 'Seasonal offers and store announcements sent to consenting customers.' },
  { icon: CalendarCheck, title: 'Appointment reminders', text: 'Reduce missed appointments with timely, template-based reminders.' },
  { icon: Bell, title: 'Customer notifications', text: 'Account, billing and service notices that customers expect to receive.' },
  { icon: Briefcase, title: 'Agency workflows', text: 'Organize campaigns for multiple clients with separate workspaces and reporting.' },
  { icon: Wrench, title: 'Service businesses', text: 'Quotes, visit confirmations and follow-ups from one organized place.' },
]

export const workflowBenefits = [
  { title: 'Organized communication', text: 'Keep campaigns, audiences and messages together in one workspace.' },
  { title: 'Reusable templates', text: 'Write a message once and reuse it for consistent communication.' },
  { title: 'Audience management', text: 'Keep contacts organized so it is easy to find who you need.' },
  { title: 'Convenient campaign monitoring', text: 'See available campaign activity and status information at a glance.' },
]

export const steps = [
  { icon: UsersRound, title: 'Organize Your Audience', text: 'Prepare and organize your contact list.' },
  { icon: FileCheck2, title: 'Create Your Message', text: 'Write your message or select a reusable template.' },
  { icon: Megaphone, title: 'Prepare Your Campaign', text: 'Review the content and configure your campaign.' },
  { icon: LineChart, title: 'Review Campaign Activity', text: 'View available campaign statuses and insights.' },
]

export const journey = [
  { icon: UserPlus, title: 'Create an account', text: 'Sign up for a workspace for your business or team.' },
  { icon: Plug, title: 'Connect an eligible WhatsApp Business account', text: 'Authorize access through the official WhatsApp Business Platform. Eligibility is determined by WhatsApp.' },
  { icon: FileCheck2, title: 'Configure templates and permissions', text: 'Prepare message templates for approval and set who on your team can do what.' },
  { icon: UsersRound, title: 'Import and organize contacts', text: 'Upload contacts, add tags, and record consent for each.' },
  { icon: Megaphone, title: 'Build and review a campaign', text: 'Pick an audience and template, preview the message, and review before launch.' },
  { icon: CalendarClock, title: 'Schedule or initiate a campaign', text: 'Run it now or choose a time, within your account’s messaging limits.' },
  { icon: LineChart, title: 'Monitor status and reports', text: 'Check sent, delivered, read and failed counts as data arrives.' },
]

export const principles = [
  { title: 'Consent first', text: 'Good messaging starts with people who asked to hear from you.' },
  { title: 'Official channels only', text: 'We build around the WhatsApp Business Platform, not workarounds.' },
  { title: 'Clarity over complexity', text: 'Tools should be simple enough for a small team to use confidently.' },
  { title: 'Honest reporting', text: 'Show what actually happened, including failures.' },
]

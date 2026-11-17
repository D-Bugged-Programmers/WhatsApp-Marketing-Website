import { Users, Megaphone, FileCheck2, CalendarClock, BarChart3, ShieldCheck } from 'lucide-react'

export const features = [
  { id: 'campaigns', icon: Megaphone, title: 'Bulk Campaigns', description: 'Organize and prepare messaging campaigns for your audience.' },
  { id: 'contacts', icon: Users, title: 'Contact Management', description: 'Keep your audience organized and make contact management easier.' },
  { id: 'templates', icon: FileCheck2, title: 'Message Templates', description: 'Create reusable message templates for consistent communication.' },
  { id: 'analytics', icon: BarChart3, title: 'Campaign Insights', description: 'View available campaign activity and status information in one place.' },
]

export const benefits = [
  { icon: Megaphone, label: 'Organized Campaigns' },
  { icon: Users, label: 'Contact Management' },
  { icon: FileCheck2, label: 'Message Templates' },
  { icon: BarChart3, label: 'Delivery Insights' },
]

export const problems = [
  { problem: 'Managing contacts in scattered spreadsheets', solution: 'One contact workspace with tags, segments and opt-in records' },
  { problem: 'Rebuilding every campaign from scratch', solution: 'Reusable templates and campaign setups' },
  { problem: 'No clear view of campaign performance', solution: 'Status and delivery reporting per campaign' },
  { problem: 'Conversations scattered across tools', solution: 'A single, organized messaging workflow' },
]

export const detailedFeatures = [
  { id: 'contacts', icon: Users, title: 'Contact organization', description: 'Keep your audience tidy and compliant.', points: ['Import contacts from CSV files', 'Tags and segments for targeted audiences', 'Opt-in status and consent notes per contact', 'Duplicate detection and clean-up tools'] },
  { id: 'campaigns', icon: Megaphone, title: 'Campaign planning', description: 'Build campaigns step by step and review before launch.', points: ['Guided campaign builder', 'Audience, template and schedule in one view', 'Review and approval step before sending', 'Duplicate past campaigns as a starting point'] },
  { id: 'templates', icon: FileCheck2, title: 'Message templates', description: 'Work with templates that follow platform requirements.', points: ['Template library with category labels', 'Status tracking (draft, submitted, approved, rejected)', 'Variable placeholders with live preview', 'Guidance aligned with WhatsApp template rules'] },
  { id: 'scheduling', icon: CalendarClock, title: 'Scheduling', description: 'Control when communication goes out.', points: ['Schedule for a specific date and time', 'Time-zone aware planning', 'Pause or reschedule before a run starts', 'Calendar view of upcoming campaigns'] },
  { id: 'analytics', icon: BarChart3, title: 'Reporting and analytics', description: 'Understand what happened after each campaign.', points: ['Sent, delivered, read and failed counts', 'Per-campaign and period summaries', 'Status labels you can read without relying on color', 'Exportable reports'] },
  { id: 'team', icon: Users, title: 'Account and team management', description: 'Give the right people the right access.', points: ['Invite team members', 'Role-based permissions', 'Activity history for accountability', 'Workspace-level settings'] },
  { id: 'security', icon: ShieldCheck, title: 'Security and consent workflows', description: 'Support responsible messaging practices.', points: ['Consent records stored with contacts', 'Opt-out handling workflow', 'Access controls for sensitive data', 'Built around official WhatsApp Business Platform tools'] },
]

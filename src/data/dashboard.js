// ILLUSTRATIVE SAMPLE DATA ONLY — not real customer or performance data.
export const campaigns = [
  { id: 1, name: 'Spring Sale Announcement', type: 'Promotion', status: 'Completed', sent: 1200, delivered: 1148, read: 802, date: 'Mar 12' },
  { id: 2, name: 'Order Shipped Updates', type: 'Notification', status: 'Running', sent: 640, delivered: 598, read: 412, date: 'Mar 14' },
  { id: 3, name: 'Appointment Reminders', type: 'Reminder', status: 'Scheduled', sent: 0, delivered: 0, read: 0, date: 'Mar 18' },
  { id: 4, name: 'Loyalty Program Invite', type: 'Promotion', status: 'Draft', sent: 0, delivered: 0, read: 0, date: '—' },
  { id: 5, name: 'Feedback Request', type: 'Notification', status: 'Failed', sent: 220, delivered: 96, read: 41, date: 'Mar 09' },
]

export const deliverySeries = [
  { label: 'Mon', sent: 62, delivered: 58 },
  { label: 'Tue', sent: 80, delivered: 74 },
  { label: 'Wed', sent: 54, delivered: 50 },
  { label: 'Thu', sent: 92, delivered: 86 },
  { label: 'Fri', sent: 100, delivered: 93 },
  { label: 'Sat', sent: 46, delivered: 43 },
  { label: 'Sun', sent: 38, delivered: 35 },
]

export const stats = [
  { label: 'Total contacts', value: '4,820' },
  { label: 'Active campaigns', value: '3' },
  { label: 'Templates', value: '12' },
]

export const contactsSample = [
  { name: 'Aarav Mehta', tag: 'Customer', optIn: true },
  { name: 'Lena Fischer', tag: 'Lead', optIn: true },
  { name: 'Marco Rossi', tag: 'Customer', optIn: false },
]

export const templateSample = {
  name: 'order_shipped_v1',
  category: 'Utility',
  status: 'Approved',
  body: 'Hi {{1}}, your order {{2}} has shipped and should arrive by {{3}}. Reply STOP to opt out.',
}

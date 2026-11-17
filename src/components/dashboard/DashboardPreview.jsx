import { motion, useReducedMotion } from 'motion/react'
import { LayoutDashboard, Users, Megaphone, FileText, BarChart3, Settings } from 'lucide-react'
import { campaigns, deliverySeries, stats, contactsSample } from '../../data/dashboard'
import CampaignTable from './CampaignTable'
import DeliveryChart from './DeliveryChart'
import MessagePreview from './MessagePreview'
import { LogoMark } from '../common/Logo'

const nav = [LayoutDashboard, Users, Megaphone, FileText, BarChart3, Settings]

// Compact hero mockup. All data is illustrative.
export default function DashboardPreview() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-5xl"
      role="img"
      aria-label="Illustrative mockup of the PingReach dashboard showing analytics, campaigns and a contact panel"
    >
      <div aria-hidden="true" className="absolute inset-x-8 -bottom-6 h-24 rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden="true" className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-float">
        <div className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-red-300" /><span className="size-2.5 rounded-full bg-amber-300" /><span className="size-2.5 rounded-full bg-green-300" />
          <span className="ml-3 rounded bg-white px-3 py-0.5 text-[10px] text-muted">app.example.com / dashboard</span>
        </div>
        <div className="flex">
          <div className="hidden w-14 shrink-0 flex-col items-center gap-3 border-r border-line bg-white py-4 sm:flex">
            <LogoMark className="size-7" />
            {nav.map((Icon, i) => (
              <span key={i} className={`flex size-8 items-center justify-center rounded-lg ${i === 0 ? 'bg-soft text-brand' : 'text-muted'}`}><Icon className="size-4" /></span>
            ))}
          </div>
          <div className="min-w-0 flex-1 bg-surface/60 p-3 sm:p-5">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-white p-2.5 sm:p-3">
                  <p className="text-[10px] text-muted sm:text-xs">{s.label}</p>
                  <p className="text-base font-bold text-ink sm:text-xl">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-5">
              <div className="rounded-xl border border-line bg-white p-3 sm:p-4 lg:col-span-3">
                <p className="mb-3 text-xs font-semibold text-ink">Message delivery · this week</p>
                <DeliveryChart data={deliverySeries} height={110} />
              </div>
              <div className="hidden rounded-xl border border-line bg-white p-3 sm:p-4 lg:col-span-2 lg:block">
                <p className="mb-2 text-xs font-semibold text-ink">Contacts</p>
                <ul className="space-y-2">
                  {contactsSample.map((c) => (
                    <li key={c.name} className="flex items-center gap-2 text-xs">
                      <span className="flex size-6 items-center justify-center rounded-full bg-soft text-[10px] font-semibold text-brand-dark">{c.name[0]}</span>
                      <span className="flex-1 truncate text-ink">{c.name}</span>
                      <span className="text-muted">{c.optIn ? 'Opted in' : 'Pending'}</span>
                    </li>
                  ))}
                </ul>
                <MessagePreview className="mt-3" text="Hi Aarav, your order #1042 has shipped!" />
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-line bg-white p-3 sm:p-4">
              <p className="mb-2 text-xs font-semibold text-ink">Recent campaigns</p>
              <CampaignTable rows={campaigns.slice(0, 3)} compact />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">Illustrative interface with sample data.</p>
    </motion.div>
  )
}

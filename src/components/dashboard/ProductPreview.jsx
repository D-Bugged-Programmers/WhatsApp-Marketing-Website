import { useState } from 'react'
import { campaigns, deliverySeries, stats, templateSample } from '../../data/dashboard'
import CampaignTable from './CampaignTable'
import DeliveryChart from './DeliveryChart'
import MessagePreview from './MessagePreview'
import StatusBadge from '../common/StatusBadge'

const filters = ['All', 'Completed', 'Running', 'Scheduled', 'Draft', 'Failed']
const tabs = ['Overview', 'Campaigns', 'Templates']

// Interactive client-side demo. Does not send anything.
export default function ProductPreview() {
  const [tab, setTab] = useState('Overview')
  const [filter, setFilter] = useState('All')
  const rows = filter === 'All' ? campaigns : campaigns.filter((c) => c.status === filter)

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-float">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <div role="tablist" aria-label="Dashboard preview sections" className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              id={`tab-${t}`}
              aria-selected={tab === t}
              aria-controls={`panel-${t}`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => {
                const i = tabs.indexOf(t)
                if (e.key === 'ArrowRight') setTab(tabs[(i + 1) % tabs.length])
                if (e.key === 'ArrowLeft') setTab(tabs[(i + tabs.length - 1) % tabs.length])
              }}
              className={`min-h-9 rounded-md px-3 text-sm font-medium transition ${tab === t ? 'bg-white text-brand-dark shadow-sm' : 'text-muted hover:text-ink'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="text-xs font-medium text-amber-800">Sample data · demo only, nothing is sent</p>
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="p-4 sm:p-6">
        {tab === 'Overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-line p-4">
                  <p className="text-sm text-muted">{s.label}</p>
                  <p className="text-2xl font-bold text-ink">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="mb-3 text-sm font-semibold text-ink">Message delivery chart</p>
              <DeliveryChart data={deliverySeries} height={160} />
            </div>
          </div>
        )}
        {tab === 'Campaigns' && (
          <div>
            <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter campaigns by status">
              {filters.map((f) => (
                <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)} className={`min-h-9 rounded-full border px-3 text-xs font-medium transition ${filter === f ? 'border-brand bg-soft text-brand-dark' : 'border-line text-muted hover:border-brand/40'}`}>{f}</button>
              ))}
            </div>
            {rows.length ? <CampaignTable rows={rows} /> : <p className="py-6 text-center text-sm text-muted">No campaigns with this status.</p>}
          </div>
        )}
        {tab === 'Templates' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-sm font-semibold text-ink">{templateSample.name}</p>
                <StatusBadge status={templateSample.status} />
              </div>
              <p className="mt-1 text-xs text-muted">Category: {templateSample.category}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink">{templateSample.body}</p>
            </div>
            <MessagePreview text="Hi Aarav, your order #1042 has shipped and should arrive by Friday. Reply STOP to opt out." />
          </div>
        )}
      </div>
    </div>
  )
}

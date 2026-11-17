import StatusBadge from '../common/StatusBadge'

// Desktop: table. Mobile: stacked cards (no horizontal overflow).
export default function CampaignTable({ rows, compact = false }) {
  return (
    <div>
      <table className="hidden w-full text-left text-sm sm:table">
        <caption className="sr-only">Sample campaigns (illustrative data)</caption>
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
            <th scope="col" className="py-2 pr-3 font-medium">Campaign</th>
            <th scope="col" className="py-2 pr-3 font-medium">Status</th>
            {!compact && <th scope="col" className="py-2 pr-3 text-right font-medium">Sent</th>}
            <th scope="col" className="py-2 pr-3 text-right font-medium">Delivered</th>
            {!compact && <th scope="col" className="py-2 text-right font-medium">Read</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-line/70 last:border-0">
              <th scope="row" className="py-2.5 pr-3 font-medium text-ink">{r.name}<span className="block text-xs font-normal text-muted">{r.type} · {r.date}</span></th>
              <td className="py-2.5 pr-3"><StatusBadge status={r.status} /></td>
              {!compact && <td className="py-2.5 pr-3 text-right tabular-nums text-ink">{r.sent.toLocaleString()}</td>}
              <td className="py-2.5 pr-3 text-right tabular-nums text-ink">{r.delivered.toLocaleString()}</td>
              {!compact && <td className="py-2.5 text-right tabular-nums text-ink">{r.read.toLocaleString()}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <li key={r.id} className="rounded-lg border border-line p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-ink">{r.name}</p>
              <StatusBadge status={r.status} />
            </div>
            <p className="mt-1 text-xs text-muted">{r.type} · {r.date}</p>
            <p className="mt-2 text-xs text-muted">Sent {r.sent.toLocaleString()} · Delivered {r.delivered.toLocaleString()} · Read {r.read.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

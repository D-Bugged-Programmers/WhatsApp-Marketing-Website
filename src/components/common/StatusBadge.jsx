import { CheckCircle2, Loader2, CalendarClock, FileEdit, XCircle } from 'lucide-react'

// Status is conveyed by icon + text, not color alone.
const map = {
  Completed: { icon: CheckCircle2, cls: 'bg-green-50 text-green-800 ring-green-600/20' },
  Running: { icon: Loader2, cls: 'bg-blue-50 text-blue-800 ring-blue-600/20' },
  Scheduled: { icon: CalendarClock, cls: 'bg-amber-50 text-amber-800 ring-amber-600/20' },
  Draft: { icon: FileEdit, cls: 'bg-slate-100 text-slate-700 ring-slate-500/20' },
  Failed: { icon: XCircle, cls: 'bg-red-50 text-red-800 ring-red-600/20' },
  Approved: { icon: CheckCircle2, cls: 'bg-green-50 text-green-800 ring-green-600/20' },
}

export default function StatusBadge({ status }) {
  const { icon: Icon, cls } = map[status] || map.Draft
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${cls}`}>
      <Icon aria-hidden="true" className="size-3" />
      {status}
    </span>
  )
}

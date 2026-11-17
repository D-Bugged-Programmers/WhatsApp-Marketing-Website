import { motion, useReducedMotion } from 'motion/react'

// Simple SVG-free bar chart with text labels; values are illustrative.
export default function DeliveryChart({ data, height = 140 }) {
  const reduce = useReducedMotion()
  const max = Math.max(...data.map((d) => d.sent))
  return (
    <figure>
      <div className="flex items-end gap-2 sm:gap-3" style={{ height }} role="img" aria-label="Bar chart of sample messages sent and delivered per weekday (illustrative data)">
        {data.map((d, i) => (
          <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <div className="flex h-full w-full items-end justify-center gap-0.5">
              <motion.div className="w-1/2 max-w-4 rounded-t bg-green-200" initial={reduce ? false : { height: 0 }} animate={{ height: `${(d.sent / max) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.04 }} />
              <motion.div className="w-1/2 max-w-4 rounded-t bg-brand" initial={reduce ? false : { height: 0 }} animate={{ height: `${(d.delivered / max) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.04 + 0.05 }} />
            </div>
            <span className="text-[10px] text-muted">{d.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1"><span aria-hidden="true" className="size-2 rounded-sm bg-green-200" />Sent</span>
        <span className="inline-flex items-center gap-1"><span aria-hidden="true" className="size-2 rounded-sm bg-brand" />Delivered</span>
        <span className="ml-auto">Sample data</span>
      </figcaption>
    </figure>
  )
}

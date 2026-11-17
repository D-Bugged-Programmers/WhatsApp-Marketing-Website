import { CheckCheck } from 'lucide-react'

export default function MessagePreview({ text, className = '' }) {
  return (
    <div className={`rounded-xl bg-[#e7f5ec] p-3 ${className}`}>
      <div className="ml-auto max-w-[90%] rounded-lg rounded-tr-none bg-white p-2.5 text-xs leading-relaxed text-ink shadow-sm">
        {text}
        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted">10:24 <CheckCheck aria-hidden="true" className="size-3 text-sky-500" /></span>
      </div>
      <p className="mt-2 text-center text-[10px] text-muted">Illustrative preview — no message is sent</p>
    </div>
  )
}

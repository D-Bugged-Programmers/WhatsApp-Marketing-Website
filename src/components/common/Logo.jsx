import { Link } from 'react-router-dom'
import { site } from '../../config/site'

export function LogoMark({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#16A34A" />
      <path d="M9 10.5A2.5 2.5 0 0 1 11.5 8h9a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-2.5 2.5H15l-4 3.5V19a2 2 0 0 1-2-2z" fill="#fff" />
      <circle cx="13" cy="13.5" r="1.1" fill="#16A34A" />
      <circle cx="16" cy="13.5" r="1.1" fill="#16A34A" />
      <circle cx="19" cy="13.5" r="1.1" fill="#16A34A" />
    </svg>
  )
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2" aria-label={`${site.name} home`}>
      <LogoMark />
      <span className={`text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>{site.name}</span>
    </Link>
  )
}

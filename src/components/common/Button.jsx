import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-gradient-to-b from-[#22c55e] to-brand-700 text-white shadow-[0_6px_20px_-6px_rgb(22_163_74/0.6)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgb(22_163_74/0.7)] active:scale-[0.98]',
  secondary: 'bg-white text-ink border border-line hover:border-brand/40 hover:bg-soft active:scale-[0.98]',
  ghost: 'text-ink hover:bg-surface',
  dark: 'bg-white text-brand-dark hover:bg-soft active:scale-[0.98]',
  lime: 'btn-shine bg-lime text-night shadow-[0_0_30px_-4px_rgb(190_242_100/0.6)] hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.98]',
  mint: 'btn-shine bg-emerald-300 text-night shadow-[0_0_28px_-4px_rgb(110_231_183/0.7)] hover:brightness-95 active:scale-[0.98]',
  outlineLight: 'border border-white/40 text-white hover:bg-white/10 active:scale-[0.98]',
}
const sizes = { md: 'h-11 px-5 text-sm', lg: 'h-12 px-6 text-base', sm: 'h-9 px-4 text-sm' }

export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`
  // Absolute URLs open as normal links; "#id" targets scroll smoothly (falling back to the features page).
  if (to && /^https?:\/\//.test(to)) return <a href={to} className={cls} {...rest}>{children}</a>
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}

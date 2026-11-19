import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import Container from '../common/Container'
import Logo from '../common/Logo'
import Button from '../common/Button'
import { navItems, links } from '../../config/site'

// The home page has a dark hero, so the header switches to a dark glass style there.
const linkCls = (dark) => ({ isActive }) =>
  dark
    ? `rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? 'text-emerald-300 shadow-[inset_0_-2px_0_#6ee7b7]' : 'text-green-50/80 hover:text-white'}`
    : `rounded-md px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-soft text-brand-dark' : 'text-muted hover:text-ink hover:bg-surface'}`

export default function Header() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const dark = useLocation().pathname === '/'
  const cls = linkCls(dark)

  const close = () => setOpen(false)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`pt-safe sticky top-0 z-50 border-b backdrop-blur-md ${dark ? 'border-white/10 bg-night/80' : 'border-line bg-white/85'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <Container className="flex h-16 items-center justify-between">
        <Logo light={dark} />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={cls}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button to={links.login} variant={dark ? 'outlineLight' : 'ghost'} size="sm" className={dark ? 'rounded-full' : ''}>Login</Button>
          <Button to={links.getStarted} variant={dark ? 'mint' : 'primary'} size="sm" className={dark ? 'rounded-full' : ''}>Get Started</Button>
        </div>
        <button
          type="button"
          className={`inline-flex size-11 items-center justify-center rounded-lg lg:hidden ${dark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-surface'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navItems.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.to === '/'} onClick={close} className={(s) => `${cls(s)} flex min-h-11 items-center text-base`}>{n.label}</NavLink>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button to={links.login} variant="secondary" onClick={close}>Login</Button>
                <Button to={links.getStarted} onClick={close}>Get Started</Button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

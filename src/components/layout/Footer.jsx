import { Link } from 'react-router-dom'
import Container from '../common/Container'
import Logo from '../common/Logo'
import { site, footerLinks } from '../../config/site'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-night-grad border-t border-white/10 text-green-50">
      <Container className="pb-safe py-12 sm:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6">
          <div className="col-span-2">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-green-100/70">
              {site.name} helps businesses organize contacts, plan campaigns and review delivery, built around the official WhatsApp Business Platform.
            </p>
            <address className="mt-4 space-y-1 break-words text-sm not-italic text-green-100/70">
              <p>{site.contact.email}</p>
              <p>{site.contact.phone}</p>
              <p>{site.contact.address}</p>
            </address>
          </div>
          {Object.entries(footerLinks).map(([group, items]) => (
            <nav key={group} aria-label={group}>
              <h2 className="text-sm font-semibold text-white">{group}</h2>
              <ul className="mt-3 space-y-1">
                {items.map((l) => (
                  <li key={l.label}><Link to={l.to} className="inline-flex min-h-11 items-center text-sm text-green-100/70 transition hover:text-lime">{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-green-100/50">
          <p>© {year} {site.name}. All rights reserved. {site.name} is a placeholder brand name.</p>
          <p className="mt-2">WhatsApp is a trademark of Meta Platforms, Inc. {site.name} is not affiliated with or endorsed by WhatsApp or Meta.</p>
        </div>
      </Container>
    </footer>
  )
}

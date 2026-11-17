import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// Per-page title, description, Open Graph and canonical URL.
export function useSeo({ title, description }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — Bulk Messaging & Campaign Management`
    const desc = description || site.description
    const url = site.url + (pathname === '/' ? '' : pathname)
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [title, description, pathname])
}

import { useState } from 'react'
import { AlertCircle, Info } from 'lucide-react'
import Button from '../common/Button'
import { submitContact, validateContact } from '../../lib/contactService'

const initial = { name: '', email: '', company: '', businessType: '', message: '' }
const types = ['E-commerce', 'Retail', 'Marketing agency', 'Customer support', 'Service business', 'Other']
const field = 'mt-1.5 block min-h-11 w-full rounded-lg border bg-white px-3 text-base text-ink shadow-sm transition placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-sm text-red-700"><AlertCircle aria-hidden="true" className="size-4" />{error}</p>}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const props = (k) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
    className: `${field} ${errors[k] ? 'border-red-500' : 'border-line'}`,
  })

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validateContact(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus('idle')
      document.getElementById(Object.keys(errs)[0])?.focus()
      return
    }
    setStatus('submitting')
    await submitContact(values)
    setStatus('demo')
    setValues(initial)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <Field id="name" label="Name" error={errors.name}><input type="text" autoComplete="name" {...props('name')} /></Field>
      <Field id="email" label="Work email" error={errors.email}><input type="email" autoComplete="email" {...props('email')} /></Field>
      <Field id="company" label="Company name" error={errors.company}><input type="text" autoComplete="organization" {...props('company')} /></Field>
      <Field id="businessType" label="Business type" error={errors.businessType}>
        <select {...props('businessType')}>
          <option value="">Select…</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field id="message" label="Message" error={errors.message}><textarea rows={5} {...props('message')} /></Field>
      <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>{status === 'submitting' ? 'Submitting…' : 'Send message'}</Button>
      <div role="status" aria-live="polite">
        {status === 'demo' && (
          <p className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            Demo mode: this form is not connected to a backend, so your message has NOT been sent or stored.
          </p>
        )}
      </div>
    </form>
  )
}

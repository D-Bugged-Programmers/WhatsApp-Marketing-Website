// Modular submission service. No backend is configured, so this is a DEMO:
// it validates nothing server-side and sends nothing anywhere.
// To go live, replace the body of submitContact with a real fetch() call.
export async function submitContact(values) {
  void values
  await new Promise((r) => setTimeout(r, 600))
  return { delivered: false, demo: true }
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) e.email = 'Please enter your work email.'
  else if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.company.trim()) e.company = 'Please enter your company name.'
  if (!v.businessType) e.businessType = 'Please choose a business type.'
  if (v.message.trim().length < 10) e.message = 'Please write at least 10 characters.'
  return e
}

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface ContactBody {
  name?: string
  email?: string
  phone?: string
  message?: string
  type?: string
  preferredDate?: string
  pagePath?: string
  company?: string // honeypot — real users leave this empty
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function escapeHtml(v: string) {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Send a notification email via Resend's REST API. No SDK dependency: a plain
 * fetch keeps the bundle light. Silently skipped when RESEND_API_KEY is unset,
 * so the form works (saving to the DB) before email is configured.
 */
async function sendEmail(sub: {
  name: string
  email: string
  phone: string
  message: string
  type: string
  preferredDate: string
  pagePath: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) return { sent: false, reason: 'email-not-configured' }

  const subject =
    sub.type === 'kennismaking'
      ? `Nieuwe kennismaking-aanvraag van ${sub.name}`
      : `Nieuw bericht van ${sub.name}`

  const rows = [
    ['Naam', sub.name],
    ['E-mail', sub.email],
    ['Telefoon', sub.phone],
    ['Type', sub.type],
    ['Voorkeursdatum', sub.preferredDate],
    ['Pagina', sub.pagePath],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(String(v))}</p>`)
    .join('')

  const html = `${rows}<p><strong>Bericht:</strong><br/>${escapeHtml(sub.message).replace(/\n/g, '<br/>')}</p>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: sub.email,
        subject,
        html,
      }),
    })
    if (!res.ok) {
      return { sent: false, reason: `resend-${res.status}` }
    }
    return { sent: true }
  } catch {
    return { sent: false, reason: 'resend-error' }
  }
}

export async function POST(request: Request) {
  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: bots fill hidden fields. Pretend success, save nothing.
  if (body.company && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const phone = (body.phone || '').trim()
  const message = (body.message || '').trim()
  const type = body.type === 'kennismaking' ? 'kennismaking' : 'mail'
  const preferredDate = (body.preferredDate || '').trim()
  const pagePath = (body.pagePath || '').trim().slice(0, 300)

  if (!name || !email || !isEmail(email)) {
    return NextResponse.json({ error: 'Vul een geldige naam en e-mail in.' }, { status: 400 })
  }
  if (type === 'mail' && !message) {
    return NextResponse.json({ error: 'Vul een bericht in.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })

    // Local API bypasses the collection's closed `create` access.
    await payload.create({
      collection: 'form-submissions',
      data: { name, email, phone, message, type, preferredDate, pagePath },
    })

    // Best-effort email; failure here does not fail the request (lead is saved).
    const emailResult = await sendEmail({ name, email, phone, message, type, preferredDate, pagePath })

    return NextResponse.json({ ok: true, emailed: emailResult.sent })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[contact] failed to save submission:', err)
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het later opnieuw.' }, { status: 500 })
  }
}

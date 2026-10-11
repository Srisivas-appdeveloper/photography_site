import { NextResponse } from 'next/server';
import { validate, type Enquiry } from '@/lib/validate';

export const runtime = 'nodejs';

// Simple in-memory rate limit (per server instance): 5 enquiries / 10 min / IP.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let data: Partial<Enquiry>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  if (data.website) return NextResponse.json({ ok: true }); // honeypot: pretend success

  const errors = validate(data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const e = {
    name: String(data.name).slice(0, 120),
    email: String(data.email).slice(0, 200),
    phone: String(data.phone).slice(0, 40),
    shoot_type: String(data.shoot_type).slice(0, 60),
    preferred_date: String(data.preferred_date || '—').slice(0, 20),
    message: String(data.message).slice(0, 4000),
  };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No email provider configured: log so nothing is lost during development.
    console.log('[enquiry]', e);
    return NextResponse.json({ ok: true });
  }

  const html = `<h2>New enquiry — ${esc(e.shoot_type)}</h2>
    <p><b>Name:</b> ${esc(e.name)}<br><b>Email:</b> ${esc(e.email)}<br><b>Phone:</b> ${esc(e.phone)}<br><b>Preferred date:</b> ${esc(e.preferred_date)}</p>
    <p>${esc(e.message).replace(/\n/g, '<br>')}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL || 'Leo Picturez <onboarding@resend.dev>',
      to: [process.env.ENQUIRY_TO_EMAIL || 'Info@leopicturez.com'],
      reply_to: e.email,
      subject: `New ${e.shoot_type} enquiry from ${e.name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error('[enquiry] email failed', res.status, await res.text());
    return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

'use client';

import { useRef, useState } from 'react';
import { shootTypes, site } from '@/data/site';
import { rules, validate } from '@/lib/validate';

type Field = keyof typeof rules;

export default function Contact() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'fail'>('idle');
  const thanks = useRef<HTMLParagraphElement>(null);

  const check = (name: Field, value: string) => {
    const r = rules[name](value);
    setErrors((e) => ({ ...e, [name]: r === true ? undefined : r }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // bot
    const errs = validate(data);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) { (form.elements.namedItem(first) as HTMLElement | null)?.focus(); return; }

    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus('done');
      requestAnimationFrame(() => thanks.current?.focus());
    } catch {
      setStatus('fail');
    }
  }

  const fieldProps = (name: Field) => ({
    id: name,
    name,
    required: true,
    'aria-invalid': !!errors[name],
    'aria-describedby': `e-${name}`,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => check(name, e.target.value),
  });

  return (
    <section className="contact" id="contact">
      <div className="rv">
        <p className="eyebrow">Contact</p>
        <h2>Let’s create something <em>beautiful.</em></h2>
        <ul className="info">
          <li className="glass"><small>INSTAGRAM</small><a href={site.instagram} target="_blank" rel="noopener">{site.instagramHandle}</a></li>
          <li className="glass"><small>PHONE</small><a href={site.phoneHref}>{site.phone}</a></li>
          <li className="glass"><small>EMAIL</small><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li className="glass"><small>LOCATION</small><span>{site.location}</span></li>
        </ul>
      </div>

      <form className="form glass glass-strong sheen rv" noValidate onSubmit={onSubmit}>
        {status === 'done' ? (
          <p className="thanks" role="status" tabIndex={-1} ref={thanks}>Thank you. Your story starts here.</p>
        ) : (
          <>
            <div className="f">
              <label htmlFor="name">NAME</label>
              <input autoComplete="name" placeholder="e.g. Maya & Arjun" {...fieldProps('name')} />
              <span className="err" id="e-name">{errors.name}</span>
            </div>
            <div className="f">
              <label htmlFor="email">EMAIL</label>
              <input type="email" autoComplete="email" placeholder="maya@example.com" {...fieldProps('email')} />
              <span className="err" id="e-email">{errors.email}</span>
            </div>
            <div className="f">
              <label htmlFor="phone">PHONE</label>
              <input type="tel" autoComplete="tel" placeholder="+91 98765 43210" {...fieldProps('phone')} />
              <span className="err" id="e-phone">{errors.phone}</span>
            </div>
            <div className="f">
              <label htmlFor="shoot_type">SHOOT TYPE</label>
              <select defaultValue="" {...fieldProps('shoot_type')}>
                <option value="" disabled>Select category…</option>
                {shootTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="err" id="e-shoot_type">{errors.shoot_type}</span>
            </div>
            <div className="f w">
              <label htmlFor="preferred_date">PREFERRED DATE</label>
              <input id="preferred_date" name="preferred_date" type="date" />
            </div>
            <div className="f w">
              <label htmlFor="message">MESSAGE</label>
              <textarea rows={4} placeholder="Tell us about your event, location, timeline or vision..." {...fieldProps('message')} />
              <span className="err" id="e-message">{errors.message}</span>
            </div>
            <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="f w">
              <button className="btn solid" type="submit" disabled={status === 'sending'} style={{ alignSelf: 'start' }}>
                {status === 'sending' ? 'Sending…' : <>Send enquiry <span className="arr" aria-hidden="true">→</span></>}
              </button>
              {status === 'fail' && <span className="err" role="alert">Could not send. Please email {site.email}.</span>}
            </div>
          </>
        )}
      </form>
    </section>
  );
}

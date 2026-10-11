'use client';

import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/data/site';

export default function Testimonials() {
  const n = testimonials.length;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const sx = useRef<number | null>(null);

  const go = (k: number, user = false) => { setI(((k % n) + n) % n); if (user) setAuto(false); };

  useEffect(() => {
    if (!auto || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [auto, n]);

  return (
    <section className="center" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="rv">
        <p className="eyebrow">Testimonials</p>
        <h2 style={{ marginTop: '1rem' }}>Kind <em>words</em></h2>
      </div>
      <div className="tst-card glass sheen rv">
        <div
          className="sl"
          onTouchStart={(e) => { sx.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (sx.current === null) return;
            const d = e.changedTouches[0].clientX - sx.current;
            if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1), true);
            sx.current = null;
          }}
        >
          <div className="track" aria-live="polite" style={{ transform: `translateX(-${i * 100}%)` }}>
            {testimonials.map((t, k) => (
              <figure key={k} aria-hidden={k !== i}>
                <blockquote>“{t.quote}”</blockquote>
              </figure>
            ))}
          </div>
        </div>
        <div className="ctl">
          <button className="a" aria-label="Previous testimonial" onClick={() => go(i - 1, true)}>←</button>
          <div className="dots" role="group" aria-label="Choose testimonial">
            {testimonials.map((_, k) => (
              <button key={k} aria-label={`Testimonial ${k + 1}`} aria-current={k === i} onClick={() => go(k, true)} />
            ))}
          </div>
          <button className="a" aria-label="Next testimonial" onClick={() => go(i + 1, true)}>→</button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect } from 'react';

/**
 * One lightweight client island that drives all page-wide motion:
 * intro reveal, scroll reveals, stat counters, parallax and the glass cursor.
 * Everything else on the page stays a server component (zero JS).
 */
export default function Effects() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $$ = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));
    const cleanups: (() => void)[] = [];

    // Intro: lift loader immediately on mount
    const markReady = () => document.body.classList.add('ready');
    if (document.readyState === 'complete') {
      markReady();
    } else {
      const t = window.setTimeout(markReady, reduce ? 0 : 60);
      cleanups.push(() => clearTimeout(t));
    }

    // Scroll reveal
    const ro = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px 50px 0px' }
    );
    $$('.rv, .rv-img').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 60) {
        el.classList.add('in');
      } else {
        ro.observe(el);
      }
    });
    cleanups.push(() => ro.disconnect());

    // Counters
    const co = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        const el = e.target as HTMLElement;
        const end = Number(el.dataset.count), pad = Number(el.dataset.pad || 0), suf = el.dataset.suffix || '';
        const fmt = (n: number) => String(n).padStart(pad, '0') + suf;
        if (reduce) { el.textContent = fmt(end); return; }
        const t0 = performance.now(), d = 1800;
        const step = (now: number) => {
          const p = Math.min((now - t0) / d, 1);
          el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }),
      { threshold: 0.6 }
    );
    $$('[data-count]').forEach((el) => co.observe(el));
    cleanups.push(() => co.disconnect());

    // Parallax (desktop only)
    if (!reduce && matchMedia('(min-width: 761px)').matches) {
      const px = $$<HTMLElement>('[data-parallax]');
      let tick = false;
      const upd = () => {
        tick = false;
        px.forEach((el) => {
          const r = el.parentElement!.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) return;
          el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -Number(el.dataset.parallax)}px,0)`;
        });
      };
      const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(upd); } };
      addEventListener('scroll', onScroll, { passive: true });
      upd();
      cleanups.push(() => removeEventListener('scroll', onScroll));
    }

    // Glass cursor label (fine pointers only)
    if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const c = document.createElement('div');
      c.className = 'cur';
      c.setAttribute('aria-hidden', 'true');
      document.body.appendChild(c);
      let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
      const move = (e: MouseEvent) => {
        x = e.clientX; y = e.clientY;
        const hit = (e.target as Element).closest<HTMLElement>('[data-cursor]');
        c.classList.toggle('on', !!hit);
        if (hit) c.textContent = hit.dataset.cursor || 'VIEW';
      };
      const loop = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; c.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
      addEventListener('mousemove', move, { passive: true });
      loop();
      cleanups.push(() => { removeEventListener('mousemove', move); cancelAnimationFrame(raf); c.remove(); });
    }

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}

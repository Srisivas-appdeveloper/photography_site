'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { nav } from '@/data/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('home');
  const [mobile, setMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onS = () => {
      setSolid(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onS();
    window.addEventListener('scroll', onS, { passive: true });

    const mq = window.matchMedia('(max-width: 1020px)');
    const onMq = () => setMobile(mq.matches);
    onMq();
    mq.addEventListener('change', onMq);

    const so = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) so.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onS);
      mq.removeEventListener('change', onMq);
      so.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header id="top" className={`hdr${solid || open ? ' solid' : ''}`}>
        <a className="logo" href="#home" aria-label="Leo Picturez, home">
          <div className="logo-emblem">
            <Image
              src="/logo.png"
              alt="Leo Picturez Logo"
              width={38}
              height={38}
              unoptimized
              className="logo-img"
            />
          </div>
          <div className="logo-text">
            <b>LEO PICTUREZ</b>
            <small>PHOTOGRAPHY &amp; CREATIVE STUDIO</small>
          </div>
        </a>
        <div className={`navwrap${open ? ' open' : ''}`} id="menu" inert={mobile && !open ? true : undefined}>
          <nav className="nav" aria-label="Main">
            <ul>
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={active === id ? 'on' : undefined}
                    aria-current={active === id ? 'true' : undefined}
                    onClick={close}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn" href="#contact" onClick={close}>
            Book a shoot <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hdr-actions">
          <a className="hdr-quick-book btn gold" href="#contact" onClick={close}>
            <span>Book</span>
            <span className="arr" aria-hidden="true">→</span>
          </a>
          <button
            ref={burger}
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>
    </>
  );
}

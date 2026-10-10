'use client';

import Image from 'next/image';
import { nav, site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* Ambient Lighting Orbs inside Footer */}
      <div className="footer-glow glow-1" aria-hidden="true" />
      <div className="footer-glow glow-2" aria-hidden="true" />

      {/* Main Footer Grid */}
      <div className="ft">
        {/* Brand Column */}
        <div className="ft-brand">
          <a className="logo" href="#home" aria-label="Leo Picturez, back to top">
            <div className="logo-emblem">
              <Image
                src="/logo.png"
                alt="Leo Picturez Logo"
                width={48}
                height={48}
                unoptimized
                className="logo-img"
              />
            </div>
            <div className="logo-text">
              <b>LEO PICTUREZ</b>
              <small>PHOTOGRAPHY &amp; CREATIVE STUDIO</small>
            </div>
          </a>

          <p className="q">“Where every frame becomes a story and every moment is preserved in timeless elegance.”</p>

          <div className="ft-contact-chips">
            <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="ft-chip">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="ft-chip">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>{site.email}</span>
            </a>
            <span className="ft-chip ft-chip-static">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Chennai, Tamil Nadu</span>
            </span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="ft-col">
          <h4 className="ft-title">EXPLORE</h4>
          <nav aria-label="Footer Navigation">
            <ul className="ft-links">
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span className="link-bullet">✦</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Categories Column */}
        <div className="ft-col">
          <h4 className="ft-title">SPECIALIZATIONS</h4>
          <ul className="ft-links">
            <li><a href="#portfolio"><span className="link-bullet">✦</span>Weddings &amp; Vows</a></li>
            <li><a href="#portfolio"><span className="link-bullet">✦</span>Fashion &amp; Editorial</a></li>
            <li><a href="#reels"><span className="link-bullet">✦</span>Cinematic Reels</a></li>
            <li><a href="#portfolio"><span className="link-bullet">✦</span>Baby Shoots</a></li>
            <li><a href="#portfolio"><span className="link-bullet">✦</span>Celebrities &amp; Media</a></li>
            <li><a href="#portfolio"><span className="link-bullet">✦</span>Corporate Summits</a></li>
          </ul>
        </div>

        {/* Social & Booking Column */}
        <div className="ft-col ft-social-col">
          <h4 className="ft-title">CONNECT WITH US</h4>
          <p className="ft-desc">Follow our latest editorial releases and behind-the-scenes shoots.</p>
          <div className="ft-social-pills">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="ft-social-pill">
                <span>{s.label}</span>
                <span className="pill-arrow">↗</span>
              </a>
            ))}
          </div>

          <a href="#contact" className="ft-book-btn btn">
            <span>BOOK A SESSION</span>
            <span className="btn-shine" />
          </a>
        </div>
      </div>

      {/* Luxury Grand Watermark */}
      <div className="wordmark-wrap" aria-hidden="true">
        <p className="wordmark">Leo Picturez</p>
      </div>

      {/* Bottom Legal & Back to Top */}
      <div className="fb">
        <div className="fb-left">
          <small>© {new Date().getFullYear()} Leo Picturez. All Rights Reserved.</small>
          <span className="fb-dot">·</span>
          <small className="fb-tag">Bespoke Destination Shoots Worldwide</small>
        </div>
        <a href="#top" className="ft-top-btn" aria-label="Scroll back to top">
          <span>BACK TO TOP</span>
          <span className="arrow-top">↑</span>
        </a>
      </div>
    </footer>
  );
}

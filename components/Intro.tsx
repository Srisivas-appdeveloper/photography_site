import Image from 'next/image';
import { images } from '@/data/site';
import { blurFor } from '@/lib/blur';

export default function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="intro-card glass sheen rv">
        <div className="founder-portrait-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem', flexShrink: 0 }}>
          <div
            className="founder-portrait-frame"
            style={{
              position: 'relative',
              width: 'clamp(210px, 24vw, 280px)',
              height: 'clamp(280px, 32vw, 375px)',
              aspectRatio: '3 / 4',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(36, 31, 43, 0.16), 0 0 0 1px rgba(212, 168, 83, 0.35)',
              background: 'var(--lavender, #E7E1F7)',
            }}
          >
            <Image
              src={images.founder.src}
              alt={images.founder.alt}
              width={683}
              height={1024}
              priority
              unoptimized
              sizes="(max-width: 860px) 240px, 280px"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 12%',
                display: 'block',
              }}
              className="founder-photo"
            />
            <div
              className="founder-frame-border"
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                border: '1px solid rgba(255, 255, 255, 0.45)',
                pointerEvents: 'none',
                boxShadow: 'inset 0 0 20px rgba(212, 168, 83, 0.2)',
              }}
            />
          </div>
          <span
            className="founder-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              background: 'rgba(212, 168, 83, 0.15)',
              border: '1px solid rgba(212, 168, 83, 0.4)',
              color: 'var(--champagne-2, #b88d3b)',
              fontSize: '0.64rem',
              letterSpacing: '0.18em',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            LEO · FOUNDER
          </span>
        </div>

        <div className="intro-content">
          <p className="eyebrow">Welcome</p>
          <h2>The art behind <em>the lens</em></h2>
          <p>
            I’m Leo, a professional Fashion &amp; Wedding Photographer with over 8 years of experience in the world of visual
            storytelling. My journey has taken me across Tamil Nadu, where I have had the privilege of capturing 700+ weddings
            and 500+ fashion events, creating imagery that goes beyond photographs — images that preserve emotions,
            personalities, and unforgettable moments.
          </p>
          <span className="signature-line">— Leo</span>
          <a className="btn glassy" href="#about">
            Discover my story <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

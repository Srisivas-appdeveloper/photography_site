'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { blurFor } from '@/lib/blur';

const heroSlides = [
  {
    src: '/images/optimized/lehenga-champagne-sequin-doorway.jpg',
    alt: 'Bride in handcrafted champagne sequin lehenga with heirloom jewelry',
    tag: 'Bridal & Weddings',
    objectPosition: 'center 20%',
  },
  {
    src: '/images/optimized/celebrity-curly-hair-portrait.jpg',
    alt: 'Celebrity portrait in warm cinematic ambient light',
    tag: 'Celebrities & Stills',
    objectPosition: 'center 22%',
  },
  {
    src: '/images/optimized/western-chartreuse-sculptural-gown.jpg',
    alt: 'High fashion editorial in sculptural chartreuse gown',
    tag: 'Fashion & Western',
    objectPosition: 'center 18%',
  },
  {
    src: '/images/optimized/television-sound-party-black-dress.jpg',
    alt: 'Television celebrity portrait on studio set',
    tag: 'Television & Media',
    objectPosition: 'center 18%',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home" aria-label="Introduction">
      <div className="hero-frame">
        {/* Background Images with smooth crossfade */}
        <div className="hero-bg">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.src}
              className={`hero-slide ${idx === current ? 'active' : ''}`}
              aria-hidden={idx !== current}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                unoptimized
                sizes="100vw"
                placeholder="blur"
                blurDataURL={blurFor(slide.src, 'blush')}
                style={{ objectFit: 'cover', objectPosition: slide.objectPosition }}
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="hero-in">
          <div className="hero-brand">
            <p className="eyebrow fadeup" style={{ ['--d' as string]: '.05s' }}>Photography &amp; Creative Studio</p>
            <h1>
              <span className="line"><span style={{ ['--d' as string]: '.1s' }}>LEO</span></span>
              <span className="line"><span style={{ ['--d' as string]: '.18s' }}>PICTUREZ</span></span>
            </h1>
            <p className="tag fadeup" style={{ ['--d' as string]: '.24s' }}>The art behind the lens</p>
          </div>

          <div className="hero-card glass-dark sheen fadeup" style={{ ['--d' as string]: '.3s' }}>
            <div className="meta">
              <span>STORIES · STYLE · EMOTION</span>
              <span>TN · IN</span>
            </div>
            <p className="hero-card-desc">Luxury fashion, celebrity &amp; wedding photography crafted with cinematic vision and authentic emotion.</p>
            <div className="ctas">
              <a className="btn light hero-portfolio-cta" href="#portfolio">View portfolio <span className="arr" aria-hidden="true">→</span></a>
              <a className="btn gold hero-desktop-book-btn" href="#contact">Book a shoot <span className="arr" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>

        {/* Slide navigation controls */}
        <div className="hero-controls fadeup" style={{ ['--d' as string]: '.36s' }}>
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.src}
              className={`hero-dot ${idx === current ? 'active' : ''}`}
              aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
              onClick={() => setCurrent(idx)}
            >
              <span className="dot-label">{slide.tag}</span>
              <span className="dot-bar" />
            </button>
          ))}
        </div>

        <span className="scroll-cue fadeup" style={{ ['--d' as string]: '.42s' }} aria-hidden="true" />
      </div>
    </section>
  );
}

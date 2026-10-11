'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { filters, portfolio, type Category, Photo } from '@/data/site';
import { blurFor } from '@/lib/blur';

const tintOf: Record<Category, 'blush' | 'lavender' | 'mint' | 'peach'> = {
  weddings: 'blush',
  'baby-shower': 'blush',
  'baby-shoots': 'peach',
  fashion: 'lavender',
  editorials: 'peach',
  celebrities: 'mint',
  commercial: 'lavender',
  corporate: 'mint',
  television: 'mint',
};

const categoryStories: Record<Category | 'all', { theme: string; quote: string; gradient: string }> = {
  all: {
    theme: 'Selected Masterpieces',
    quote: 'Where cinematic light meets raw emotion and timeless composition.',
    gradient: 'from-amber-900/40 via-purple-950/60 to-stone-950',
  },
  television: {
    theme: 'Television & Media Stills',
    quote: 'On-set production, broadcast shows, and celebrity charisma in live motion.',
    gradient: 'from-blue-950/60 via-purple-950/60 to-slate-950',
  },
  weddings: {
    theme: 'Bridal & Sacred Vows',
    quote: 'Timeless South Indian bridal splendor, gold temple heirlooms, and authentic love.',
    gradient: 'from-rose-950/60 via-amber-950/50 to-stone-950',
  },
  fashion: {
    theme: 'Haute Couture & Western',
    quote: 'Avant-garde silhouettes, dramatic drapery, and high-fashion aesthetics.',
    gradient: 'from-purple-950/70 via-indigo-950/60 to-neutral-950',
  },
  celebrities: {
    theme: 'Celebrity & Stills',
    quote: 'Expressive personality and polished glamour crafted under cinematic lights.',
    gradient: 'from-emerald-950/60 via-teal-950/50 to-stone-950',
  },
  'baby-shower': {
    theme: 'Maternity & New Beginnings',
    quote: 'Tender celebrations of new life, motherhood, and cherished family warmth.',
    gradient: 'from-pink-950/50 via-rose-950/40 to-stone-950',
  },
  'baby-shoots': {
    theme: 'Milestones & Wonder',
    quote: 'Pure joy, childhood milestones, and heartwarming timeless portraits.',
    gradient: 'from-orange-950/50 via-amber-950/40 to-stone-950',
  },
  corporate: {
    theme: 'Corporate & Summit',
    quote: 'Commanding brand imagery and dynamic event summits that tell the enterprise story.',
    gradient: 'from-slate-900/60 via-cyan-950/50 to-stone-950',
  },
  editorials: {
    theme: 'Creative Concepts',
    quote: 'Pushing artistic boundaries with reflective textures, color theories, and bold vision.',
    gradient: 'from-fuchsia-950/60 via-violet-950/60 to-stone-950',
  },
  commercial: {
    theme: 'Commercial Campaigns',
    quote: 'High-impact visual narratives engineered to elevate brands.',
    gradient: 'from-zinc-900/60 via-stone-900/50 to-stone-950',
  },
};

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [viewMode, setViewMode] = useState<'book' | 'grid'>('book');
  const [bookSpread, setBookSpread] = useState(0);
  const [turnState, setTurnState] = useState<'turn-next' | 'turn-prev' | null>(null);
  const [idx, setIdx] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);
  const lastTile = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleFilterClick = (id: 'all' | Category, e: React.MouseEvent<HTMLButtonElement>) => {
    setFilter(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const handleFilterMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = filtersRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleFilterMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = filtersRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleFilterMouseUp = () => {
    isDragging.current = false;
  };

  const handleFilterWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = filtersRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  const visible = useMemo(
    () => (filter === 'all' ? portfolio : portfolio.filter((p) => p.category === filter)),
    [filter]
  );

  // Group visible photos into pairs for two-page book spreads
  const spreads = useMemo(() => {
    const pairs: [Photo, Photo | null][] = [];
    for (let i = 0; i < visible.length; i += 2) {
      pairs.push([visible[i], visible[i + 1] || null]);
    }
    return pairs;
  }, [visible]);

  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [density, setDensity] = useState<'compact' | 'large'>('compact');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => {
      setIsMobile(mq.matches);
      if (mq.matches) {
        setViewMode('grid');
      }
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Reset spread and mobile expand when category filter changes
  useEffect(() => {
    setBookSpread(0);
    setTurnState(null);
    setExpanded(false);
  }, [filter]);

  const goToSpread = (targetIdx: number) => {
    if (turnState || targetIdx === bookSpread || targetIdx < 0 || targetIdx >= spreads.length) return;
    const dir = targetIdx > bookSpread ? 'turn-next' : 'turn-prev';
    setTurnState(dir);

    // Swap spread at the apex of the bottom-right corner peel
    setTimeout(() => {
      setBookSpread(targetIdx);
    }, 260);

    setTimeout(() => {
      setTurnState(null);
    }, 560);
  };

  const goSpread = (dir: 'next' | 'prev') => {
    if (turnState || spreads.length <= 1) return;
    const nextIdx =
      dir === 'next'
        ? (bookSpread + 1) % spreads.length
        : (bookSpread - 1 + spreads.length) % spreads.length;
    goToSpread(nextIdx);
  };

  const go = useCallback((d: number) => {
    setLoaded(false);
    setIdx((i) => (i === null ? i : (i + d + visible.length) % visible.length));
  }, [visible.length]);

  const open = (i: number, el?: HTMLButtonElement | null) => {
    if (el) lastTile.current = el;
    setLoaded(false);
    setIdx(i);
    dlg.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const onClose = () => {
      document.body.style.overflow = '';
      setIdx(null);
      lastTile.current?.focus();
    };
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, []);

  // Keyboard navigation for Book View
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (idx !== null) return; // Lightbox open
      if (viewMode === 'book') {
        if (e.key === 'ArrowRight') goSpread('next');
        if (e.key === 'ArrowLeft') goSpread('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, idx, spreads.length, turnState]);

  const current = idx !== null ? visible[idx] : null;
  const currentSpread = spreads[bookSpread] || [visible[0], null];
  const storyInfo = categoryStories[filter];

  const displayedPhotos = useMemo(() => {
    if (isMobile && !expanded) {
      return visible.slice(0, 6);
    }
    return visible;
  }, [isMobile, expanded, visible]);

  return (
    <section id="portfolio" className="portfolio-sec">
      <div className="sh">
        <div className="rv">
          <p className="eyebrow">Portfolio</p>
          <h2>Selected <em>stories</em></h2>
        </div>

        {/* View Mode Switcher + Category Filters */}
        <div className="port-controls">
          {!isMobile && (
            <div className="view-toggle glass" role="group" aria-label="View mode">
              <button
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                aria-label="Grid Masonry View"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" />
                </svg>
                <span>Masonry</span>
              </button>
              <button
                className={`toggle-btn ${viewMode === 'book' ? 'active' : ''}`}
                onClick={() => setViewMode('book')}
                aria-pressed={viewMode === 'book'}
                aria-label="Lookbook Album View"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21 4H3a2 2 0 00-2 2v13a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zM3 19V6h8v13H3zm18 0h-8V6h8v13z" />
                </svg>
                <span>Lookbook 📖</span>
              </button>
            </div>
          )}

          <div
            ref={filtersRef}
            className="filters glass"
            role="group"
            aria-label="Filter portfolio"
            onMouseDown={handleFilterMouseDown}
            onMouseMove={handleFilterMouseMove}
            onMouseUp={handleFilterMouseUp}
            onMouseLeave={handleFilterMouseUp}
            onWheel={handleFilterWheel}
          >
            {filters.map((f) => (
              <button
                key={f.id}
                aria-pressed={filter === f.id}
                onClick={(e) => handleFilterClick(f.id, e)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= VIEW 1: MASONRY GRID ================= */}
      {viewMode === 'grid' && (
        <>
          {isMobile && (
            <div className="mobile-gallery-toolbar">
              <div className="photo-count-pill">
                <span className="count-dot" />
                <span className="count-text">
                  <strong>{displayedPhotos.length}</strong> of <strong>{visible.length}</strong> stories
                </span>
              </div>
              <div className="density-toggle" role="group" aria-label="Grid layout">
                <button
                  type="button"
                  className={`density-btn ${density === 'compact' ? 'active' : ''}`}
                  onClick={() => setDensity('compact')}
                  aria-pressed={density === 'compact'}
                  aria-label="2-Column grid view"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
                  </svg>
                  <span>2-Col</span>
                </button>
                <button
                  type="button"
                  className={`density-btn ${density === 'large' ? 'active' : ''}`}
                  onClick={() => setDensity('large')}
                  aria-pressed={density === 'large'}
                  aria-label="Large single column view"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M3 4h18v16H3z" />
                  </svg>
                  <span>Large</span>
                </button>
              </div>
            </div>
          )}

          <div className={`grid ${isMobile ? `mobile-${density}` : ''}`}>
            {displayedPhotos.map((p, i) => (
              <button
                key={`${filter}-${p.src}`}
                className="tile"
                data-cursor="VIEW"
                aria-haspopup="dialog"
                aria-label={`Open ${p.title}`}
                onClick={(e) => open(i, e.currentTarget)}
                style={{
                  animationDelay: `${i * 35}ms`,
                  aspectRatio: `${p.w} / ${p.h}`,
                }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={blurFor(p.src, tintOf[p.category])}
                  style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                />
                <span className="cap glass-dark">
                  <span>
                    <small>{p.category.toUpperCase()}</small>
                  </span>
                  <span className="ring" aria-hidden="true">↗</span>
                </span>
              </button>
            ))}
          </div>

          {isMobile && visible.length > 6 && (
            <div className="mobile-expand-wrap">
              <button
                type="button"
                className="btn gold mobile-expand-btn"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? (
                  <>Show Curated (6) ↑</>
                ) : (
                  <>View All {visible.length} Stories ({visible.length - 6} more) ↓</>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* ================= VIEW 2: 3D EDITORIAL LOOKBOOK ALBUM (TABLET & DESKTOP ONLY) ================= */}
      {!isMobile && viewMode === 'book' && (
        <div className="lookbook-stage rv" data-category={filter}>
          {/* Ambient Lighting Glow Background */}
          <div className="lookbook-ambient" />

          <div className="lookbook-header">
            <div className="lookbook-meta">
              <span className="edition-badge">LEO PICTUREZ · VOL. {bookSpread + 1}</span>
              <h3>{storyInfo.theme}</h3>
            </div>
            <p className="lookbook-quote">“{storyInfo.quote}”</p>
          </div>

          {/* Hardcover Open Book Spread with 3D Magazine Page Turning */}
          <div className={`book-container ${turnState ? turnState : ''}`}>
            {/* Left Page (Plate 2N + 1) */}
            {currentSpread[0] && (
              <div
                className="book-page book-page-left"
                onClick={() => open(bookSpread * 2)}
                aria-label={`Open plate ${bookSpread * 2 + 1}`}
              >
                <div className="page-inner">
                  <div className="page-matting">
                    <div className="page-photo-wrap">
                      <Image
                        src={currentSpread[0].src}
                        alt={currentSpread[0].alt}
                        fill
                        unoptimized
                        sizes="(max-width: 860px) 95vw, 45vw"
                        priority={bookSpread === 0}
                        loading={bookSpread === 0 ? 'eager' : 'lazy'}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>

                  <div className="page-footer">
                    <span className="folio-tag">PLATE No. {String(bookSpread * 2 + 1).padStart(2, '0')}</span>
                    <h4>{currentSpread[0].category.toUpperCase()}</h4>
                    <span className="page-num">{bookSpread * 2 + 1}</span>
                  </div>
                </div>
                <div className="spine-shadow left-spine" />
              </div>
            )}

            {/* Right Page (Plate 2N + 2 or Monogram Editorial Card) */}
            <div
              className="book-page book-page-right"
              onClick={() => currentSpread[1] && open(bookSpread * 2 + 1)}
              aria-label={currentSpread[1] ? `Open plate ${bookSpread * 2 + 2}` : 'Editorial card'}
            >
              {currentSpread[1] ? (
                <div className="page-inner">
                  <div className="page-matting">
                    <div className="page-photo-wrap">
                      <Image
                        src={currentSpread[1].src}
                        alt={currentSpread[1].alt}
                        fill
                        unoptimized
                        sizes="(max-width: 860px) 95vw, 45vw"
                        priority={bookSpread === 0}
                        loading={bookSpread === 0 ? 'eager' : 'lazy'}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>

                  <div className="page-footer">
                    <span className="folio-tag">PLATE No. {String(bookSpread * 2 + 2).padStart(2, '0')}</span>
                    <h4>{currentSpread[1].category.toUpperCase()}</h4>
                    <span className="page-num">{bookSpread * 2 + 2}</span>
                  </div>
                </div>
              ) : (
                <div className="page-editorial-card">
                  <div className="gold-monogram-logo">
                    <Image
                      src="/logo.png"
                      alt="Leo Picturez Monogram"
                      width={64}
                      height={64}
                      unoptimized
                      className="monogram-img"
                    />
                  </div>
                  <span className="editorial-label">CURATED PORTFOLIO</span>
                  <h3>The Art Behind The Lens</h3>
                  <p>
                    Every shoot is a bespoke collaboration. From lighting design to fine retouches,
                    our lens captures elegance in motion.
                  </p>
                  <div className="editorial-signature">Leo Picturez</div>
                  <span className="page-num">{bookSpread * 2 + 2}</span>
                </div>
              )}
              <div className="spine-shadow right-spine" />
            </div>
          </div>

          {/* Book Navigation Bar */}
          <div className="book-controls">
            <button
              className="book-nav-btn"
              onClick={() => goSpread('prev')}
              disabled={bookSpread === 0}
              aria-label="Previous page spread"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              <span>Prev Spread</span>
            </button>

            <div className="spread-indicator">
              <span>SPREAD {bookSpread + 1} OF {spreads.length}</span>
              <div className="spread-dots">
                {spreads.map((_, idx) => {
                  const isVisible =
                    spreads.length <= 9 ||
                    Math.abs(idx - bookSpread) <= 2 ||
                    idx === 0 ||
                    idx === spreads.length - 1;
                  if (!isVisible) return null;
                  return (
                    <button
                      key={idx}
                      className={`spread-dot ${idx === bookSpread ? 'active' : ''}`}
                      onClick={() => goToSpread(idx)}
                      aria-label={`Jump to spread ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            <button
              className="book-nav-btn"
              onClick={() => goSpread('next')}
              disabled={bookSpread === spreads.length - 1}
              aria-label="Next page spread"
            >
              <span>Next Spread</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>

          {/* Lookbook Filmstrip Ribbon */}
          <div className="lookbook-ribbon">
            {spreads.map((spread, sIdx) => (
              <button
                key={sIdx}
                className={`ribbon-thumb ${sIdx === bookSpread ? 'active' : ''}`}
                onClick={() => goToSpread(sIdx)}
                aria-label={`Spread ${sIdx + 1}`}
              >
                <div className="thumb-pair">
                  {spread[0] && (
                    <div className="mini-img">
                      <img
                        src={spread[0].src}
                        alt={spread[0].title || `Page ${sIdx * 2 + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="mini-thumb-img"
                      />
                    </div>
                  )}
                  {spread[1] ? (
                    <div className="mini-img">
                      <img
                        src={spread[1].src}
                        alt={spread[1].title || `Page ${sIdx * 2 + 2}`}
                        loading="lazy"
                        decoding="async"
                        className="mini-thumb-img"
                      />
                    </div>
                  ) : (
                    <div className="mini-img mini-img-empty">
                      <span>LP</span>
                    </div>
                  )}
                </div>
                <span>{sIdx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= FULLSCREEN ZOOM LIGHTBOX ================= */}
      <dialog
        ref={dlg}
        className="lb"
        aria-label="Portfolio gallery"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dlg.current?.close();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const d = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(d) > 50) go(d < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && (
          <>
            <div className="lb-stage">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                unoptimized
                sizes="100vw"
                className={loaded ? 'on' : ''}
                onLoad={() => setLoaded(true)}
              />
            </div>
            <div className="lb-cap glass-dark" aria-live="polite">
              <small>{current.category.toUpperCase()}</small>
            </div>
            <p className="lb-cnt">
              {(idx ?? 0) + 1} / {visible.length}
            </p>
          </>
        )}
        <button
          className="lb-btn lb-x glass-dark"
          aria-label="Close gallery"
          onClick={() => {
            dlg.current?.close();
          }}
          autoFocus
        >
          ×
        </button>
        <button className="lb-btn lb-p glass-dark" aria-label="Previous image" onClick={() => go(-1)}>
          ←
        </button>
        <button className="lb-btn lb-n glass-dark" aria-label="Next image" onClick={() => go(1)}>
          →
        </button>
      </dialog>
    </section>
  );
}

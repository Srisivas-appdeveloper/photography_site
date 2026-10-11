'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { fashionReels, images, Reel } from '@/data/site';
import { blurFor } from '@/lib/blur';

export default function Showreel() {
  const dlg = useRef<HTMLDialogElement>(null);
  const activeVideoRef = useRef<HTMLVideoElement>(null);
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const activeReel: Reel | null = activeReelIndex !== null ? fashionReels[activeReelIndex] : null;

  const openReel = (index: number) => {
    setActiveReelIndex(index);
    setIsPlaying(true);
    dlg.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    dlg.current?.close();
    setActiveReelIndex(null);
    setIsPlaying(false);
    document.body.style.overflow = '';
  };

  const nextReel = () => {
    if (activeReelIndex === null) return;
    const nextIdx = (activeReelIndex + 1) % fashionReels.length;
    setActiveReelIndex(nextIdx);
  };

  const prevReel = () => {
    if (activeReelIndex === null) return;
    const prevIdx = (activeReelIndex - 1 + fashionReels.length) % fashionReels.length;
    setActiveReelIndex(prevIdx);
  };

  const togglePlay = () => {
    const v = activeVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  // Play video whenever active reel changes
  useEffect(() => {
    if (activeReelIndex === null) return;
    setIsPlaying(true);
    const t = setTimeout(() => {
      const v = activeVideoRef.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }, 60);
    return () => clearTimeout(t);
  }, [activeReelIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === 'Escape') close();
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay(); }
      if (e.key === 'ArrowRight') nextReel();
      if (e.key === 'ArrowLeft') prevReel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex]);

  return (
    <section id="reels" className="reels-sec" aria-label="Fashion reels and cinematography">
      <div className="container">
        {/* Section Header */}
        <div className="reels-hdr rv">
          <p className="eyebrow">Motion & Direction</p>
          <h2>Fashion Reels & <em>Cinematography</em></h2>
          <p>High-definition vertical storytelling, couture movement, and editorial lookbooks captured by Leo Picturez.</p>
        </div>

        {/* 4 Fashion Reels Grid */}
        <div className="reels-grid">
          {fashionReels.map((reel, idx) => (
            <article
              key={reel.id}
              className="reel-card rv"
              style={{ animationDelay: `${idx * 120}ms` }}
              onClick={() => openReel(idx)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openReel(idx); } }}
              tabIndex={0}
              role="button"
              aria-label={`Watch ${reel.title} reel`}
            >
              <div className="reel-card-media">
                <Image
                  src={reel.posterSrc}
                  alt={reel.title}
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL={blurFor(reel.posterSrc, 'lavender')}
                />
              </div>

              <div className="reel-overlay">
                <div className="reel-badge-top">
                  <span className="reel-tag">{reel.tag}</span>
                  <span className="reel-dur">{reel.duration}</span>
                </div>

                <div className="reel-center-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>

                <div className="reel-info-bottom">
                  <h3>{reel.title}</h3>
                  <p>{reel.tag}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <dialog
        ref={dlg}
        className="reel-modal"
        aria-label="Fashion reel video player"
        onClose={close}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <button
          className="reel-modal-mute"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          onClick={() => setIsMuted((prev) => !prev)}
          type="button"
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        <button
          className="reel-modal-close"
          aria-label="Close reel player"
          onClick={close}
          type="button"
        >
          ✕
        </button>

        {activeReel && (
          <div className="reel-modal-in">
            <video
              ref={activeVideoRef}
              key={activeReel.videoSrc}
              src={activeReel.videoSrc}
              poster={activeReel.posterSrc}
              playsInline
              autoPlay
              loop
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="reel-modal-video"
            />

            <div
              className="reel-touch-surface"
              onClick={togglePlay}
              role="button"
              tabIndex={0}
              aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
            >
              {!isPlaying && (
                <div className="reel-modal-play-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="reel-modal-nav">
              <button
                className="reel-nav-btn"
                aria-label="Previous reel"
                onClick={(e) => {
                  e.stopPropagation();
                  prevReel();
                }}
                type="button"
              >
                ‹
              </button>
              <button
                className="reel-nav-btn"
                aria-label="Next reel"
                onClick={(e) => {
                  e.stopPropagation();
                  nextReel();
                }}
                type="button"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

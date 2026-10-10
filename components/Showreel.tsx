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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === 'Escape') close();
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
        <button className="lb-btn lb-x glass-dark" aria-label="Close reel" onClick={close}>×</button>

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
              controls
              className="reel-modal-video"
            />

            <div className="reel-modal-nav">
              <button className="reel-nav-btn" aria-label="Previous reel" onClick={prevReel}>
                ‹
              </button>
              <button className="reel-nav-btn" aria-label="Next reel" onClick={nextReel}>
                ›
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

import Image from 'next/image';
import { images } from '@/data/site';
import { blurFor } from '@/lib/blur';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-vis rv">
        <div className="main">
          <Image
            src={images.aboutMain.src}
            alt={images.aboutMain.alt}
            fill
            unoptimized
            sizes="(max-width: 860px) 88vw, 44vw"
            placeholder="blur"
            blurDataURL={blurFor(images.aboutMain.src, 'lavender')}
            style={{ objectPosition: 'center 15%' }}
          />
        </div>
        <div className="detail glass">
          <div>
            <Image
              src={images.aboutDetail.src}
              alt={images.aboutDetail.alt}
              fill
              unoptimized
              sizes="(max-width: 860px) 46vw, 22vw"
              placeholder="blur"
              blurDataURL={blurFor(images.aboutDetail.src, 'peach')}
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        </div>
        <div className="badge glass sheen">
          <b>8+</b>
          <span>YEARS</span>
        </div>
      </div>

      <div className="rv">
        <p className="eyebrow">About Leo</p>
        <h2>More than a photographer.<br /><em>A storyteller.</em></h2>
        <p>
          Leo’s work has been part of productions with Vijay Television, including Sound Party and Cooku with Comali, and he has
          photographed alongside celebrities, actors, models and creative professionals.
        </p>
        <blockquote className="quote-card glass sheen">
          At Leo Picturez, every frame is crafted with a distinctive vision — combining sophisticated composition, cinematic
          lighting, authentic emotions, and contemporary fashion aesthetics.
        </blockquote>
        <p>Every photograph should feel timeless, powerful and personal.</p>
        <ul className="chips">
          <li>Vijay Television</li>
          <li>Sound Party</li>
          <li>Cooku with Comali</li>
        </ul>
        <p className="big" aria-hidden="true">Every frame tells a story.</p>
      </div>
    </section>
  );
}

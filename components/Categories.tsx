import Image from 'next/image';
import { categories } from '@/data/site';
import { blurFor } from '@/lib/blur';

export default function Categories() {
  return (
    <section className="cats" aria-label="Featured categories">
      {categories.map((c, i) => (
        <a key={c.title} className="card rv" href="#portfolio" data-tint={c.tint} data-cursor="EXPLORE" style={{ ['--d' as string]: `${i * 0.12}s` }}>
          <Image src={c.img.src} alt={c.img.alt} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
            placeholder="blur" blurDataURL={blurFor(c.img.src, c.tint)} style={{ objectPosition: 'center 15%' }} />
          <div className="body glass-dark sheen">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <span className="more">EXPLORE <span aria-hidden="true">→</span></span>
          </div>
        </a>
      ))}
    </section>
  );
}

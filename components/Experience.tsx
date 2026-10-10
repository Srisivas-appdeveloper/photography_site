import Image from 'next/image';
import { experience, images } from '@/data/site';
import { blurFor } from '@/lib/blur';

const marquee = 'VIJAY TELEVISION • SOUND PARTY • COOKU WITH COMALI • FASHION • WEDDINGS • CELEBRITIES •';

export default function Experience() {
  return (
    <section className="dark-wrap" id="experience">
      <div className="dark">
        <div className="exp">
          <div className="rv">
            <p className="eyebrow">Experience</p>
            <h2>Behind the <em>scenes</em></h2>
            <ul>
              {experience.map((e, i) => (
                <li key={e}>{e}<small>{String(i + 1).padStart(2, '0')}</small></li>
              ))}
            </ul>
          </div>
          <div className="bts rv-img">
            <Image src={images.behindScenes.src} alt={images.behindScenes.alt} fill unoptimized sizes="(max-width: 860px) 92vw, 45vw"
              placeholder="blur" blurDataURL={blurFor(images.behindScenes.src, 'lavender')} style={{ objectPosition: 'center 15%' }} />
            <p className="float glass-dark">On set with television, celebrities and creative teams.</p>
          </div>
        </div>
        <div className="mq" aria-hidden="true">
          <div>{[0, 1, 2, 3].map((k) => <span key={k}>{marquee}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

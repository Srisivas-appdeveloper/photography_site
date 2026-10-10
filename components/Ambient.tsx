import Image from 'next/image';

/** Fixed pastel light field + grain + intro loader with animated logo emblem. Pure CSS, no JS cost. */
export default function Ambient() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <span className="orb a" />
        <span className="orb b" />
        <span className="orb c" />
        <span className="orb d" />
        <span className="grain" />
      </div>
      <div className="loader" aria-hidden="true">
        <div className="loader-inner">
          <div className="loader-logo-wrap">
            <Image
              src="/logo.png"
              alt="Leo Picturez"
              width={90}
              height={90}
              unoptimized
              className="loader-logo"
            />
            <div className="loader-pulse" />
          </div>
          <span>LEO PICTUREZ</span>
          <small>PHOTOGRAPHY &amp; CREATIVE STUDIO</small>
        </div>
      </div>
      <noscript>
        <style>{`.loader{display:none}.rv,.fadeup,.hero h1 .line>span{opacity:1!important;transform:none!important}.rv-img{clip-path:none!important}`}</style>
      </noscript>
    </>
  );
}

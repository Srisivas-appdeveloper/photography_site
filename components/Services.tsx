import { services } from '@/data/site';

const icons: Record<string, React.ReactNode> = {
  rings: <><circle cx="12" cy="16" r="7" /><circle cx="20" cy="16" r="7" /></>,
  star: <path d="M16 4l3 8h8l-6.5 5 2.5 9-7-5-7 5 2.5-9L5 12h8z" />,
  person: <><circle cx="16" cy="11" r="5" /><path d="M6 28c0-6 4-9 10-9s10 3 10 9" /></>,
  camera: <><rect x="4" y="9" width="24" height="16" rx="2" /><circle cx="16" cy="17" r="4.5" /><path d="M12 9l2-3h4l2 3" /></>,
  frame: <><rect x="5" y="5" width="22" height="22" rx="2" /><path d="M5 20l7-7 6 6 4-4 5 5" /></>,
  pen: <path d="M4 28L22 10l4 4L8 32zM21 5l2-2 6 6-2 2z" />,
};

export default function Services() {
  return (
    <section id="services">
      <div className="rv">
        <p className="eyebrow">Services</p>
        <h2>What I <em>create</em></h2>
      </div>
      <div className="srv-grid">
        {services.map((s, i) => (
          <a key={s.title} href="#contact" className="srv glass sheen rv" style={{ ['--d' as string]: `${(i % 3) * 0.1}s` }}>
            <div className="top">
              <span className="ico"><svg viewBox="0 0 32 32" aria-hidden="true">{icons[s.icon]}</svg></span>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <span className="go">ENQUIRE <span aria-hidden="true">→</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

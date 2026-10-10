import { stats } from '@/data/site';

export default function Stats() {
  return (
    <section className="stats" aria-label="Experience in numbers">
      {stats.map((s, i) => (
        <div key={s.label} className="stat glass sheen rv" style={{ ['--d' as string]: `${i * 0.1}s` }}>
          {'value' in s ? (
            <b data-count={s.value} data-pad={'pad' in s ? s.pad : undefined} data-suffix={s.suffix}>
              {String(s.value).padStart('pad' in s ? s.pad : 0, '0')}{s.suffix}
            </b>
          ) : (
            <b className="t">{s.text}</b>
          )}
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  );
}

import { useReveal } from '@/hooks/useReveal';

export default function MarqueeBanner() {
  const { ref, visible } = useReveal();
  const items = [
    'docker compose up',
    'open source',
    'self-hostable',
    'no cloud required',
    '72 hours',
    'role isolation',
    'score normalization',
    'judge assignment',
    'audit trails',
    'API first',
    'fair judging',
    '1–4 members',
  ];

  return (
    <section className="relative py-6 border-y border-white/5 overflow-hidden bg-[#0d0d14]" ref={ref}>
      <div className={`reveal ${visible ? 'visible' : ''} flex overflow-hidden`}>
        <div className="flex animate-marquee gap-8 shrink-0">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="text-sm font-mono text-zinc-600 whitespace-nowrap flex items-center gap-3">
              {item}
              <span className="text-cyan-400/30">/</span>
            </span>
          ))}
        </div>
        <div className="flex animate-marquee gap-8 shrink-0" aria-hidden>
          {[...items, ...items].map((item, i) => (
            <span key={i} className="text-sm font-mono text-zinc-600 whitespace-nowrap flex items-center gap-3">
              {item}
              <span className="text-cyan-400/30">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

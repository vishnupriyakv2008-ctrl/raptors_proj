import { useReveal } from '@/hooks/useReveal';

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative max-w-5xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// THE CHALLENGE</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-8">
            One challenge. <span className="text-gradient">One product.</span> Everyone builds it.
          </h2>
        </div>

        <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="glass rounded-2xl p-8 md:p-10 mb-8">
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6">
              Dogfood 2026 is a 72-hour online hackathon built around one challenge: build the
              platform that will judge you.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Hackathon Raptors has run 35+ hackathons across 85+ countries, and this challenge
              comes directly from the problems encountered while running them. Registration, team
              formation, submissions, eligibility, judge assignment, scoring, normalization,
              results, certificates, and archiving all form one complex data pipeline.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Your challenge is to build a modern, open-source, self-hostable hackathon submission
              and judging platform that handles this entire lifecycle. Everyone builds the same
              product against the same published specification. There are no tracks. This is not a
              hackathon where you build a demo of a platform — we are asking you to build ours.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { stat: '35+', label: 'Hackathons Run', sub: 'Since 2023' },
            { stat: '85+', label: 'Countries', sub: 'Global community' },
            { stat: '300+', label: 'Projects', sub: 'Last hackathon alone' },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-xl p-6 text-center`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div className="text-4xl font-bold text-gradient-cyan mb-2">{item.stat}</div>
              <div className="text-sm font-medium text-white">{item.label}</div>
              <div className="text-xs text-zinc-500 mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

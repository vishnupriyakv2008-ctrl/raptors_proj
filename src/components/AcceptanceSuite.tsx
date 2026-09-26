import { useReveal } from '@/hooks/useReveal';
import { FlaskConical, Database, CheckCircle2, AlertTriangle } from 'lucide-react';

const resources = [
  {
    icon: Database,
    name: 'Fixture Dataset',
    desc: 'A synthetic dataset built to the shape of a real Raptors event: roughly 40 projects, 30 judges, 8 tracks, and a full set of scores. No real names, no real submissions.',
    points: [
      '40 projects with full submission fields',
      '30 judges with varying completion rates',
      '8 tracks with prize configurations',
      'Edge cases baked in: a reviewer who rates everything the same, an incomplete batch, and a duplicate entry',
    ],
    note: 'If your portal only works on tidy input, you will find out on Friday rather than on Monday.',
  },
  {
    icon: FlaskConical,
    name: 'Acceptance Suite',
    desc: 'A test suite published at kickoff that runs against your running portal and reports pass or fail per tier requirement.',
    points: [
      'You run it yourself, as often as you like',
      'Commit the output as acceptance-report.txt',
      'Judges run the same suite against your build',
      'Tier claims verified by the suite, not the README',
    ],
    note: 'Nobody is guessing. The suite produces a tier-by-tier pass report that both you and the judges can read.',
  },
];

export default function AcceptanceSuite() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative max-w-5xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-lime-400 tracking-widest">// THE TOOLING</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            The <span className="text-gradient-cyan">fixture data</span> & acceptance suite
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            We publish the spec, a real anonymised dataset, and an acceptance suite you run against
            your own build. You ship it open source. We take the winner and run our events on it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {resources.map((res, i) => {
            const Icon = res.icon;
            return (
              <div
                key={res.name}
                className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-2xl p-7`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-lg bg-lime-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-lime-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{res.name}</h3>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{res.desc}</p>

                <ul className="space-y-2.5 mb-5">
                  {res.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-lime-400/60 mt-0.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/5 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-orange-400/70 mt-0.5 shrink-0" />
                  <p className="text-xs text-zinc-500 italic leading-relaxed">{res.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

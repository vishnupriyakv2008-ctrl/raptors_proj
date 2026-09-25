import { useReveal } from '@/hooks/useReveal';
import { Award, Scale, Wrench, Lightbulb } from 'lucide-react';

const criteria = [
  { icon: Award, pct: '40%', name: 'Tier Completion & Correctness', desc: 'How far up the tier ladder the project reaches, verified by the acceptance suite. Correctness matters more than feature count. Honest gap reporting is rewarded.' },
  { icon: Scale, pct: '25%', name: 'Judging Integrity', desc: 'How well the platform handles role isolation, judge assignment, score normalization, auditability, and voting abuse. The judging system must be technically defensible.' },
  { icon: Wrench, pct: '20%', name: 'Adoptability & Operability', desc: 'Whether Hackathon Raptors could realistically run the software. One-command startup, seeded data, documentation, clean licensing, self-hosting.' },
  { icon: Lightbulb, pct: '15%', name: 'Code Quality & Innovation', desc: 'Code quality, maintainability, schema design, architecture, and the technical decisions that make the project stand out.' },
];

const bonuses = [
  { name: 'Normalization Proof', points: '+5', desc: 'Implement cross-judge normalization and demonstrate its effect using provided fixture data.' },
  { name: 'Pairwise Mode', points: '+5', desc: 'Add pairwise project comparisons and recover rankings using a Bradley-Terry style estimator.' },
  { name: 'Threat Model', points: '+3', desc: 'Publish a written threat model covering voting and submission abuse: Sybil voting, ballot stuffing, judge collusion, deadline gaming.' },
  { name: 'API First', points: '+3', desc: 'Expose every UI action through a documented API and publish an OpenAPI specification.' },
];

export default function Judging() {
  const { ref, visible } = useReveal();

  return (
    <section id="judging" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Judging Criteria */}
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-orange-400 tracking-widest">// JUDGING CRITERIA</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            How projects are <span className="text-gradient">evaluated</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {criteria.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-xl p-6 relative overflow-hidden`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-4 right-4 text-5xl font-bold font-mono text-white/5">{item.pct}</div>
                <Icon className="w-6 h-6 text-cyan-400 mb-4" />
                <div className="text-2xl font-bold font-mono text-gradient mb-2">{item.pct}</div>
                <h3 className="text-sm font-semibold text-white mb-2">{item.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bonus Challenges */}
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-lime-400 tracking-widest">// BONUS CHALLENGES</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Optional <span className="text-gradient-cyan">stretch goals</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Maximum bonus: <span className="text-lime-400 font-mono font-bold">+16 points</span>. One
            challenge done properly beats four unfinished features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {bonuses.map((bonus, i) => (
            <div
              key={bonus.name}
              className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-xl p-6 flex items-start gap-5 hover:bg-white/[0.05] transition-colors`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="shrink-0 w-14 h-14 rounded-xl bg-lime-500/10 flex items-center justify-center font-mono font-bold text-lime-400 text-lg">
                {bonus.points}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{bonus.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{bonus.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useReveal } from '@/hooks/useReveal';
import { Check } from 'lucide-react';

const tiers = [
  {
    tag: 'T1',
    name: 'Core',
    color: 'cyan',
    badge: 'Minimum requirement',
    desc: 'Authentication, roles, events, teams, submissions, deadlines, and a public gallery.',
    features: [
      'Authentication and sessions',
      'Participant / judge / organizer / admin roles',
      'Event creation with configurable dates',
      'Tracks and prizes',
      'Team formation via invite links',
      'Project submission with draft & edit',
      'Deadline enforcement',
      'Searchable public gallery',
    ],
  },
  {
    tag: 'T2',
    name: 'Judging',
    color: 'orange',
    badge: 'Judging integrity',
    desc: 'Judge assignment, configurable rubrics, score normalization, and role isolation.',
    features: [
      'Judge invitation and assignment',
      'Batch or algorithmic assignment',
      'Weighted, configurable rubrics',
      'Backend-enforced role isolation',
      'Judge progress dashboards',
      'Cross-judge score normalization',
      'CSV export throughout the workflow',
    ],
  },
  {
    tag: 'T3',
    name: 'Public',
    color: 'lime',
    badge: 'Community layer',
    desc: 'Community voting, comments, hidden results, randomized ordering, and audit trails.',
    features: [
      'Configurable community voting',
      'Comments on projects',
      'Hidden results during voting',
      'Randomized project ordering',
      'Rate limiting & duplicate detection',
      'Audit trails',
      'Defensible alternative voting mechanisms',
    ],
  },
  {
    tag: 'T4',
    name: 'Stretch',
    color: 'violet',
    badge: 'Going further',
    desc: 'REST API, webhooks, certificates, signed judge records, embeddable widgets, bulk I/O.',
    features: [
      'REST API & webhooks for all UI actions',
      'Certificate and record generation',
      'Signed, verifiable judge participation records',
      'Embeddable gallery widget',
      'Bulk import and export',
    ],
  },
];

const colorMap: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  cyan: { text: 'text-cyan-400', border: 'hover:border-cyan-400/30', bg: 'from-cyan-500/10', glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]' },
  orange: { text: 'text-orange-400', border: 'hover:border-orange-400/30', bg: 'from-orange-500/10', glow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]' },
  lime: { text: 'text-lime-400', border: 'hover:border-lime-400/30', bg: 'from-lime-500/10', glow: 'hover:shadow-[0_0_30px_rgba(132,204,22,0.15)]' },
  violet: { text: 'text-violet-400', border: 'hover:border-violet-400/30', bg: 'from-violet-500/10', glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]' },
};

export default function Tiers() {
  const { ref, visible } = useReveal();

  return (
    <section id="tiers" className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative max-w-7xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// THE TIER LADDER</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Climb the ladder. <span className="text-gradient">Correctly.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Everyone builds against the same spec. Teams are evaluated on how far they climb — and
            how correctly they implement each tier. A clean, correct T2 is better than a broken T4.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {tiers.map((tier, i) => {
            const c = colorMap[tier.color];
            return (
              <div
                key={tier.tag}
                className={`reveal-scale ${visible ? 'visible' : ''} group relative glass rounded-2xl p-7 transition-all duration-300 ${c.border} ${c.glow} bg-gradient-to-br ${c.bg} to-transparent`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`text-3xl font-bold font-mono ${c.text}`}>{tier.tag}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${c.text}`}>{tier.badge}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 mb-5">{tier.desc}</p>

                <ul className="space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <Check className={`w-4 h-4 ${c.text} mt-0.5 shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={`reveal ${visible ? 'visible' : ''} mt-8 text-center`}>
          <p className="text-sm text-zinc-500 font-mono">
            Tier claims are verified through the acceptance suite, not through the README.
          </p>
        </div>
      </div>
    </section>
  );
}

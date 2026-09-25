import { Code2, Users, Shield, BarChart3, Server, Trophy, GitBranch, Eye } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const reasons = [
  { icon: Code2, title: 'Build a complete platform', desc: 'From registration through results — the entire hackathon lifecycle in one system.' },
  { icon: Shield, title: 'Backend-enforced role isolation', desc: 'Design a permission system that actually holds up. Participant, judge, organizer, admin.' },
  { icon: BarChart3, title: 'Score normalization', desc: 'Solve cross-judge scoring with weighted, configurable rubrics and statistical methods.' },
  { icon: Eye, title: 'Anti-abuse voting', desc: 'Design fairer community voting with rate limiting, duplicate detection, and audit trails.' },
  { icon: Server, title: 'Self-hostable by design', desc: 'A platform an organizer can actually deploy. One command. No cloud dependencies.' },
  { icon: GitBranch, title: 'API-first architecture', desc: 'Expose every UI action through a documented API. Build for integrations from day one.' },
  { icon: Trophy, title: 'Real adoption', desc: 'The winning project gets forked and put into production for future Hackathon Raptors events.' },
  { icon: Users, title: 'Open source, you keep ownership', desc: 'No assignment, no transfer, no CLA. Your work stays yours, and stays open.' },
];

export default function WhyParticipate() {
  const { ref, visible } = useReveal();

  return (
    <section id="why" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <span className="text-xs font-mono text-orange-400 tracking-widest">// WHY PARTICIPATE</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Hard problems. <span className="text-gradient">Real engineering.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Hackathon platforms have converged on the same basic features. The interesting work is
            what happens underneath.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`reveal-scale ${visible ? 'visible' : ''} group glass rounded-xl p-6 hover:bg-white/[0.06] transition-all duration-300 hover:border-cyan-400/20`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{reason.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useReveal } from '@/hooks/useReveal';
import { FileText, Github, Video, FlaskConical, BookOpen, Database, Scale, ScrollText } from 'lucide-react';

const deliverables = [
  { icon: Github, name: 'Public GitHub repository', desc: 'Public at submission time.' },
  { icon: FileText, name: 'OSI-approved open-source license', desc: 'Clean licensing required.' },
  { icon: FlaskConical, name: 'Working implementation', desc: 'docker compose up starts a seeded portal.' },
  { icon: ScrollText, name: 'acceptance-report.txt', desc: 'Tier-by-tier pass report from the acceptance suite.' },
  { icon: BookOpen, name: 'README.md', desc: 'Setup, usage, and architecture overview.' },
  { icon: FileText, name: 'ARCHITECTURE.md', desc: 'System design and major technical decisions.' },
  { icon: Database, name: 'DATA-MODEL.md', desc: 'Schema documentation and import/export paths.' },
  { icon: Scale, name: 'JUDGING.md', desc: 'Assignment strategy, scoring methodology, normalization method.' },
  { icon: Video, name: '5-minute demo video', desc: 'Showing one complete event lifecycle.' },
  { icon: FlaskConical, name: 'Tests', desc: 'Test suite demonstrating correctness.' },
];

export default function Submission() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative max-w-7xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// WHAT TO SUBMIT</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            The <span className="text-gradient">deliverables</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {deliverables.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-xl p-5 hover:bg-white/[0.05] transition-colors`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <Icon className="w-5 h-5 text-cyan-400 mb-3" />
                <h3 className="text-xs font-semibold text-white mb-1.5 leading-snug">{item.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Constraints banner */}
        <div className={`reveal ${visible ? 'visible' : ''} mt-10 glass rounded-2xl p-6 md:p-8 border-l-2 border-orange-400`}>
          <h3 className="text-sm font-mono text-orange-400 mb-3 tracking-wider">// HARD CONSTRAINTS</h3>
          <p className="text-zinc-300 leading-relaxed mb-4">
            The project must not depend on:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {['Hosted databases', 'Authentication-as-a-service', 'External APIs', 'Cloud accounts', 'Proprietary services', 'Network connectivity'].map((dep) => (
              <span key={dep} className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-300 text-xs font-mono border border-orange-400/10">
                {dep}
              </span>
            ))}
          </div>
          <p className="text-sm text-zinc-400 mt-5">
            If the project cannot run on a laptop with the network turned off, it cannot be adopted.
          </p>
        </div>
      </div>
    </section>
  );
}

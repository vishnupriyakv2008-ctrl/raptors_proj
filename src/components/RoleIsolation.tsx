import { useReveal } from '@/hooks/useReveal';
import { Check, X, Lock } from 'lucide-react';

const actors = ['Visitor', 'Participant', 'Judge', 'Organizer', 'Admin'];
const columns = ['Own Scores', 'Peer Scores', 'Other Track', 'Aggregate', 'Audit Log'];

type CellType = 'none' | 'own' | 'all' | 'partial';

const matrix: CellType[][] = [
  // Visitor
  ['none', 'none', 'none', 'none', 'none'],
  // Participant
  ['none', 'none', 'none', 'none', 'none'],
  // Judge
  ['own', 'none', 'none', 'none', 'none'],
  // Organizer
  ['all', 'none', 'none', 'all', 'all'],
  // Admin
  ['all', 'all', 'all', 'all', 'all'],
];

function Cell({ type }: { type: CellType }) {
  if (type === 'none') return <X className="w-4 h-4 text-zinc-700 mx-auto" />;
  if (type === 'own') return <Check className="w-4 h-4 text-cyan-400 mx-auto" />;
  if (type === 'all') return <Check className="w-4 h-4 text-lime-400 mx-auto" />;
  return <Lock className="w-3.5 h-3.5 text-orange-400/60 mx-auto" />;
}

export default function RoleIsolation() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative max-w-5xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-lime-400 tracking-widest">// ROLE ISOLATION</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Who sees <span className="text-gradient-cyan">what</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Role isolation enforced in the backend, not painted on the frontend. This matrix is the
            access control spec — every cell is a policy decision, not a UI suggestion.
          </p>
        </div>

        <div className={`reveal-scale ${visible ? 'visible' : ''} overflow-x-auto`}>
          <table className="w-full glass rounded-2xl overflow-hidden">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-4 text-xs font-mono text-zinc-400 uppercase tracking-wider">Actor</th>
                {columns.map((col) => (
                  <th key={col} className="px-3 py-4 text-xs font-mono text-zinc-400 uppercase tracking-wider text-center min-w-[100px]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {actors.map((actor, i) => (
                <tr key={actor} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-white">{actor}</td>
                  {matrix[i].map((cell, j) => (
                    <td key={j} className="px-3 py-4 text-center">
                      <Cell type={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`reveal ${visible ? 'visible' : ''} mt-6 flex flex-wrap gap-6 justify-center text-xs font-mono text-zinc-500`}>
          <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-cyan-400" /> Own data only</span>
          <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-400" /> Full access</span>
          <span className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-zinc-700" /> No access</span>
        </div>

        <div className={`reveal ${visible ? 'visible' : ''} mt-8 glass rounded-xl p-6 border-l-2 border-lime-400/40`}>
          <p className="text-sm text-zinc-400 leading-relaxed">
            <span className="text-lime-400 font-mono">// The point:</span> A participant cannot see
            another participant's scores. A judge sees only the projects assigned to them and only
            their own scores. An organizer sees aggregates and the audit log, never individual judge
            scores before normalization. An admin sees everything — and every action is logged.
          </p>
        </div>
      </div>
    </section>
  );
}

import { useReveal } from '@/hooks/useReveal';
import { Calendar, Flag, Users, FlagTriangleRight, Timer, CheckCircle2 } from 'lucide-react';

const dates = [
  { date: 'Aug 24, 2026', label: 'Registration opens', icon: Flag, status: 'upcoming' },
  { date: 'Sep 4, 2026', label: 'Judging panel announced', icon: Users, status: 'upcoming' },
  { date: 'Sep 21, 2026', label: 'Team formation', icon: FlagTriangleRight, status: 'upcoming' },
  { date: 'Sep 24, 2026', label: 'Full specification published', icon: Calendar, status: 'upcoming' },
  { date: 'Sep 25, 2026 · 18:00 UTC', label: 'Hackathon begins', icon: Timer, status: 'live' },
  { date: 'Sep 28, 2026 · 18:00 UTC', label: 'Code freeze & submission deadline', icon: CheckCircle2, status: 'deadline' },
  { date: 'Sep 28 – Oct 8, 2026', label: 'Judging window', icon: Users, status: 'judging' },
  { date: 'Oct 5, 2026 · 18:00 UTC', label: 'Write Up Quest closes', icon: Calendar, status: 'judging' },
  { date: 'Oct 9, 2026', label: 'Winners announced', icon: FlagTriangleRight, status: 'end' },
];

const statusColors: Record<string, string> = {
  upcoming: 'text-zinc-400 border-zinc-700',
  live: 'text-cyan-400 border-cyan-400/30 bg-cyan-500/5',
  deadline: 'text-orange-400 border-orange-400/30 bg-orange-500/5',
  judging: 'text-lime-400 border-lime-400/30 bg-lime-500/5',
  end: 'text-violet-400 border-violet-400/30 bg-violet-500/5',
};

export default function Timeline() {
  const { ref, visible } = useReveal();

  return (
    <section id="timeline" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// IMPORTANT DATES</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            The <span className="text-gradient">timeline</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-orange-400/30 to-transparent" />

          <div className="space-y-8">
            {dates.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.label}
                  className={`reveal ${visible ? 'visible' : ''} relative flex items-center gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  {/* Node */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-3 h-3 rounded-full border-2 ${statusColors[item.status].split(' ')[1]} ${statusColors[item.status].split(' ')[0].replace('text-', 'bg-')}`} />
                  </div>

                  {/* Content */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <div className={`glass rounded-xl p-5 border-l-2 ${statusColors[item.status]}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-4 h-4 ${statusColors[item.status].split(' ')[0]}`} />
                        <span className={`text-xs font-mono ${statusColors[item.status].split(' ')[0]}`}>{item.date}</span>
                      </div>
                      <p className="text-sm text-white font-medium">{item.label}</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

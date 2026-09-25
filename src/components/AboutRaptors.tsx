import { useReveal } from '@/hooks/useReveal';
import { Globe2, Trophy, CalendarDays, Users2 } from 'lucide-react';

export default function AboutRaptors() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// ORGANIZER</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Hackathon <span className="text-gradient">Raptors</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            A Community Interest Company that runs online hackathons for working engineers and
            developers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Trophy, stat: '35+', label: 'Hackathons run since 2023' },
            { icon: Globe2, stat: '85+', label: 'Countries represented' },
            { icon: CalendarDays, stat: '~12', label: 'Events per year' },
            { icon: Users2, stat: '300+', label: 'Projects in last event' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-xl p-6 text-center`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gradient-cyan mb-1">{item.stat}</div>
                <div className="text-xs text-zinc-500">{item.label}</div>
              </div>
            );
          })}
        </div>

        <div className={`reveal ${visible ? 'visible' : ''} glass rounded-2xl p-8 md:p-10 text-center`}>
          <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
            Dogfood is built around one simple proposition:
          </p>
          <p className="text-2xl md:text-4xl font-bold text-gradient mt-4">
            Build the platform that will judge you.
          </p>
        </div>
      </div>
    </section>
  );
}

import { useReveal } from '@/hooks/useReveal';
import { ScrollText } from 'lucide-react';

const rules = [
  'Teams must contain 1–4 members.',
  'Solo participation is allowed.',
  'All project code must be written during the official 72-hour hackathon window.',
  'Planning, research, documentation reading, and AI prompt preparation are allowed before kickoff.',
  'No project code may be committed before kickoff.',
  'T1 must be completed for the project to be judged.',
  'The submitted GitHub repository must be public at submission time.',
  'The project must use an OSI-approved open-source license.',
  'The project must run locally without hosted-service dependencies.',
  'docker compose up must produce a working, seeded portal.',
  'The final project must be self-hostable and work without network connectivity.',
  'Existing projects cannot be submitted as-is.',
  'Renamed copies or rewrites of existing open-source hackathon platforms are not allowed.',
  'Tier claims must be honest and supported by the acceptance report.',
  'AI coding assistants are allowed.',
  'Frameworks, libraries, boilerplate generators, and development tools are allowed.',
  'The final software must be something the team can explain and defend.',
  'Any project that cannot be run and evaluated as required may not be considered for adoption.',
];

export default function Rules() {
  const { ref, visible } = useReveal();

  return (
    <section id="rules" className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative max-w-4xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-orange-400 tracking-widest">// THE RULES</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Play <span className="text-gradient">fair</span>
          </h2>
        </div>

        <div className="glass rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {rules.map((rule, i) => (
              <div
                key={i}
                className={`reveal ${visible ? 'visible' : ''} flex items-start gap-3`}
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <span className="shrink-0 w-6 h-6 rounded-md bg-orange-500/10 text-orange-400 font-mono text-xs flex items-center justify-center mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-zinc-300 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`reveal ${visible ? 'visible' : ''} mt-6 flex items-center justify-center gap-2 text-xs font-mono text-zinc-600`}>
          <ScrollText className="w-3.5 h-3.5" />
          <span>The winning team keeps ownership. No assignment, transfer, CLA, or exclusivity agreement required.</span>
        </div>
      </div>
    </section>
  );
}

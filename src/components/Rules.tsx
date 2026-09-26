import { useReveal } from '@/hooks/useReveal';
import { ScrollText, Container, Shield, Cloud, Lock, Terminal, Users, Code2, FileText, Eye } from 'lucide-react';

const pillars = [
  {
    num: '01',
    icon: Container,
    title: 'One Command To Running',
    rule: 'docker compose up brings up a working, seeded portal on a laptop. No cloud account, no hosted service, no external API. If we cannot run it, we cannot adopt it.',
  },
  {
    num: '02',
    icon: Shield,
    title: 'Open Source, You Keep It',
    rule: 'MIT or Apache-2.0 preferred. Public at submission. You keep ownership of your repository. We do not ask for an assignment, a transfer, or a CLA.',
  },
  {
    num: '03',
    icon: Terminal,
    title: 'Clear T1 Or You Are Not Judged',
    rule: 'T1 is the floor. Auth, roles, event, submission, gallery. A project that does not reach it is not scored, however good the parts are.',
  },
  {
    num: '04',
    icon: Code2,
    title: 'Code Written In The Window',
    rule: 'All project code written during the 72-hour window. Frameworks, libraries, boilerplate generators and AI assistance are all fair game. A pre-existing project of yours, or a renamed copy of an existing platform, is not.',
  },
  {
    num: '05',
    icon: Cloud,
    title: 'No Hosted-Service Dependency',
    rule: 'It runs offline on a laptop. This is not an aesthetic preference, it is the condition for the winner being adoptable at all.',
  },
  {
    num: '06',
    icon: Users,
    title: 'Teams of 1–4, Anywhere',
    rule: 'Solo or up to four. Cross-college, cross-discipline, any country. The challenge is the same for everyone.',
  },
  {
    num: '07',
    icon: FileText,
    title: 'Honest Tier Claims',
    rule: 'Tier claims are verified through the acceptance suite, not through the README. Honest gap reporting is rewarded. Inflated claims are penalised.',
  },
  {
    num: '08',
    icon: Eye,
    title: 'We Can Explain And Defend It',
    rule: 'The final software must be something the team can explain and defend. Any project that cannot be run and evaluated as required may not be considered for adoption.',
  },
];

export default function Rules() {
  const { ref, visible } = useReveal();

  return (
    <section id="rules" className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-500/8 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-orange-400 tracking-widest">// THE RULES</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            If we cannot <span className="text-gradient">run it</span>, we cannot adopt it
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Every rule below is downstream of that one. These are not preferences — they are the
            conditions for adoption.
          </p>
        </div>

        {/* Pillar rules — large, prominent cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className={`reveal-scale ${visible ? 'visible' : ''} group glass rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300 hover:border-orange-400/20`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-2xl font-bold font-mono text-white/10">{pillar.num}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-3 leading-snug">{pillar.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{pillar.rule}</p>
              </div>
            );
          })}
        </div>

        {/* Additional rules — compact list */}
        <div className={`reveal ${visible ? 'visible' : ''} glass rounded-2xl p-8 md:p-10`}>
          <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">Additional Rules</h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              'All project code must be written during the official 72-hour hackathon window.',
              'Planning, research, documentation reading, and AI prompt preparation are allowed before kickoff.',
              'No project code may be committed before kickoff.',
              'The submitted GitHub repository must be public at submission time.',
              'The project must use an OSI-approved open-source license.',
              'The final project must be self-hostable and work without network connectivity.',
              'Existing projects cannot be submitted as-is.',
              'Renamed copies or rewrites of existing open-source hackathon platforms are not allowed.',
              'AI coding assistants are allowed.',
              'Frameworks, libraries, boilerplate generators, and development tools are allowed.',
            ].map((rule, i) => (
              <div
                key={i}
                className={`reveal ${visible ? 'visible' : ''} flex items-start gap-3`}
                style={{ transitionDelay: `${200 + i * 30}ms` }}
              >
                <span className="shrink-0 w-6 h-6 rounded-md bg-white/5 text-zinc-400 font-mono text-xs flex items-center justify-center mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-zinc-400 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ownership note */}
        <div className={`reveal ${visible ? 'visible' : ''} mt-6 flex items-center justify-center gap-2 text-xs font-mono text-zinc-600`}>
          <Lock className="w-3.5 h-3.5 text-lime-400" />
          <span>The winning team keeps ownership. No assignment, transfer, CLA, or exclusivity agreement required.</span>
        </div>
      </div>
    </section>
  );
}

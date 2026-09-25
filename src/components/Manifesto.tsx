import { useReveal } from '@/hooks/useReveal';
import { ArrowRight } from 'lucide-react';

const pipeline = [
  { num: '01', name: 'Registration' },
  { num: '02', name: 'Teams' },
  { num: '03', name: 'Submissions' },
  { num: '04', name: 'Eligibility' },
  { num: '05', name: 'Judge Assignment' },
  { num: '06', name: 'Scoring' },
  { num: '07', name: 'Normalization' },
  { num: '08', name: 'Results' },
  { num: '09', name: 'Certificates' },
  { num: '10', name: 'Archive' },
];

const incumbents = [
  { name: 'Devpost', issue: 'No weighted judging criteria. Docs say: judge offline in a spreadsheet.' },
  { name: 'Devfolio', issue: '"Automatic score normalization" advertised. Zero methodology published.' },
  { name: 'DoraHacks', issue: 'Community voting conceded as gameable. Advice: keep prizes small.' },
  { name: 'HackerEarth', issue: 'No official public API. Integration layer is scrapers and spreadsheets.' },
];

const openSource = [
  { name: 'Gavel', origin: 'HackMIT', note: 'Pairwise judging via Bradley-Terry estimator.' },
  { name: 'JunctionApp', origin: 'Open source', note: 'Self-hostable, but narrow scope.' },
  { name: 'Dribdat', origin: 'Open source', note: 'Self-hostable, but narrow scope.' },
  { name: 'Quill', origin: 'Open source', note: 'Self-hostable, but narrow scope.' },
  { name: 'Hibiscus', origin: 'Open source', note: 'Self-hostable, but narrow scope.' },
];

export default function Manifesto() {
  const { ref, visible } = useReveal();

  return (
    <section id="manifesto" className="relative py-28 px-6">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`reveal ${visible ? 'visible' : ''} mb-16`}>
          <span className="text-xs font-mono text-orange-400 tracking-widest">// THE MANIFESTO</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mt-3 leading-[0.95]">
            Why this <span className="text-gradient">exists</span>
          </h2>
        </div>

        {/* The pipeline */}
        <div className={`reveal ${visible ? 'visible' : ''} mb-20`}>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8 max-w-3xl">
            Registration, teams, submissions, eligibility, judge assignment, scoring,
            normalization, results, certificates, and an archive somebody can query two years
            later. Ten stages, each with its own state, each feeding the next. Get one wrong and
            the part that suffers is the judging — which is the part participants actually came for.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {pipeline.map((stage, i) => (
              <div
                key={stage.num}
                className={`reveal-scale ${visible ? 'visible' : ''} group flex items-center gap-3 px-4 py-2.5 glass rounded-lg hover:border-cyan-400/30 transition-all`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="text-xs font-mono text-cyan-400">{stage.num}</span>
                <span className="text-sm text-zinc-300">{stage.name}</span>
                {i < pipeline.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-cyan-400/50 transition-colors" />
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl font-mono">
            Hackathon Raptors has run thirty-five events on this pipeline since 2023, across 85
            countries and roughly a dozen a year. We know which stage breaks first, which one nobody
            budgets for, and which one every organizer ends up doing by hand on the Sunday night.
            We have opinions earned the expensive way.
          </p>
        </div>

        {/* The incumbent critique */}
        <div className={`reveal ${visible ? 'visible' : ''} mb-20`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-5">
            The incumbents <span className="text-zinc-600 font-normal">converged. Then stopped.</span>
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-8 max-w-3xl">
            Devpost, Devfolio, TAIKAI, DoraHacks, HackerEarth and Unstop all ship the same nine
            things: an event microsite, registration, team formation, project submission, a public
            gallery, judge scoring, community voting, an organizer dashboard, and a CSV export. That
            list is not exotic — it is a weekend of work for a team that knows what it is doing.
            Then they stopped.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {incumbents.map((item, i) => (
              <div
                key={item.name}
                className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-xl p-5 border-l-2 border-red-400/20`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                  <span className="text-sm font-semibold text-white">{item.name}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.issue}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl mt-6 font-mono">
            Not one of them has an official public API. The integration layer of an entire industry
            is unofficial scrapers and downloaded spreadsheets.
          </p>
        </div>

        {/* Pull quote */}
        <div className={`reveal ${visible ? 'visible' : ''} mb-20`}>
          <div className="relative glass rounded-2xl p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
            <p className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
              <span className="text-gradient">Build the platform</span>
              <br />
              <span className="text-white">that will judge you.</span>
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-orange-400 to-transparent" />
          </div>
        </div>

        {/* Open source landscape */}
        <div className={`reveal ${visible ? 'visible' : ''} mb-20`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-5">
            The open-source tier proves <span className="text-gradient-cyan">the appetite is real.</span>
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-8 max-w-3xl">
            Gavel came out of HackMIT with a genuine idea inside it: stop asking judges for absolute
            scores and ask them which of two projects is better, then recover a global ranking with
            a Bradley-Terry estimator. JunctionApp, Dribdat, Quill and Hibiscus all exist and are
            all self-hostable. What nobody has assembled is a modern, self-hostable, API-first whole
            that a working organizer can run on Monday.
          </p>

          <div className="flex flex-wrap gap-3">
            {openSource.map((proj, i) => (
              <div
                key={proj.name}
                className={`reveal-scale ${visible ? 'visible' : ''} group glass rounded-lg px-4 py-3 hover:border-lime-400/20 transition-all`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{proj.name}</span>
                  <span className="text-[10px] font-mono text-lime-400/60 px-1.5 py-0.5 rounded bg-lime-500/5">{proj.origin}</span>
                </div>
                <p className="text-xs text-zinc-500">{proj.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The gap */}
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="glass rounded-2xl p-8 md:p-12 border-l-2 border-cyan-400">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              That is the gap. <span className="text-gradient">It is real, it is narrow, and it fits in 72 hours.</span>
            </h3>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Dogfood is a 72-hour hackathon with one product in it. Everyone builds the same thing
              against the same spec: a submission and judging portal. We publish the spec, a real
              anonymised dataset, and an acceptance suite you run against your own build. You ship
              it open source. We take the winner, self-host it, and run our events on it.
            </p>
            <p className="text-lg text-white font-medium mt-6">
              We are not asking you to build a demo of a platform.{' '}
              <span className="text-gradient">We are asking you to build ours.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

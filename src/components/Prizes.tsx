import { useReveal } from '@/hooks/useReveal';
import { Trophy, DollarSign, Award, PenLine, Shield } from 'lucide-react';

const mainPrizes = [
  {
    place: 'Winner',
    amount: '$1,000',
    desc: 'The project Hackathon Raptors forks, self-hosts, and puts into production. The platform that clears every tier, enforces its own rules in the backend, starts with one command, and reads like software somebody intends to maintain.',
    highlight: true,
  },
  {
    place: 'Runner-Up',
    amount: '$500',
    desc: 'Exceptional work across the board. Strong tier completion, defensible judging maths, documentation that respects the reader. Close enough that we will be reading it for ideas.',
  },
  {
    place: 'Third Place',
    amount: '$300',
    desc: 'A standout, either for how far it climbed in 72 hours or for one decision nobody else made.',
  },
  {
    place: 'Fourth Place',
    amount: '$200',
    desc: 'Finished the climb and left something behind worth reading. Solid tier completion, honest scope, no shortcuts hiding in the backend.',
  },
  {
    place: 'Fifth Place',
    amount: '$100',
    desc: 'Made the top five out of everyone who started. Something in this build works better than it had any right to after 72 hours.',
  },
];

const categoryPrizes = [
  {
    icon: Shield,
    name: 'Judging Integrity Prize',
    amount: '$300',
    desc: 'For the team whose judging layer was the most defensible. Assignment strategy, normalization method, role isolation, audit trail. The category prize for the problem the whole industry quietly avoids.',
  },
  {
    icon: PenLine,
    name: 'Write-Up Quest',
    amount: '$100 × 4',
    desc: 'Building a platform in 72 hours is hard. Explaining what actually happened is rarer, and more useful to everyone else. Four $100 prizes for the best write-ups. Optional, does not affect your main score.',
  },
];

export default function Prizes() {
  const { ref, visible } = useReveal();

  return (
    <section id="prizes" className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <span className="text-xs font-mono text-orange-400 tracking-widest">// PRIZES</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            $2,500 in <span className="text-gradient">prizes</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            The winning project gets forked, self-hosted, and put into production for Hackathon
            Raptors events. That is the prize behind the prize.
          </p>
        </div>

        {/* Main prizes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {mainPrizes.map((prize, i) => (
            <div
              key={prize.place}
              className={`reveal-scale ${visible ? 'visible' : ''} relative glass rounded-2xl p-6 flex flex-col ${
                prize.highlight ? 'border-orange-400/30 bg-gradient-to-br from-orange-500/10 to-transparent' : ''
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {prize.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-black text-[10px] font-mono font-bold tracking-wider">
                  ADOPTED
                </div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <Trophy className={`w-5 h-5 ${prize.highlight ? 'text-orange-400' : 'text-zinc-500'}`} />
                <span className="text-sm font-semibold text-white">{prize.place}</span>
              </div>
              <div className={`text-3xl font-bold font-mono mb-4 ${prize.highlight ? 'text-gradient' : 'text-zinc-300'}`}>
                {prize.amount}
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed flex-grow">{prize.desc}</p>
            </div>
          ))}
        </div>

        {/* Category prizes */}
        <div className="grid md:grid-cols-2 gap-4">
          {categoryPrizes.map((prize, i) => {
            const Icon = prize.icon;
            return (
              <div
                key={prize.name}
                className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-2xl p-7 border-l-2 border-cyan-400/40`}
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-white">{prize.name}</h3>
                      <span className="text-lg font-bold font-mono text-gradient-cyan">{prize.amount}</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{prize.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* What happens to winner */}
        <div className={`reveal ${visible ? 'visible' : ''} mt-8 glass rounded-2xl p-8 md:p-10 border-l-2 border-orange-400`}>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-mono text-orange-400 tracking-wider">WHAT HAPPENS TO THE WINNER</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-zinc-300 leading-relaxed">
            <div>
              <p className="mb-3">Ship under MIT or Apache-2.0. The repo is yours. We do not ask for an assignment, a transfer, a CLA, or an exclusivity clause. There is nothing to sign.</p>
              <p>The winning project gets forked, self-hosted, and put into production for Hackathon Raptors events. That is the prize behind the prize.</p>
            </div>
            <div>
              <p className="mb-3">Not a thank-you tweet. A credit line on every event page the platform powers, for as long as it powers them.</p>
              <p>Every fix, hardening pass and feature we add on top gets sent back to your repository as a pull request. If you want them, take them. If you have moved on, the fork carries on and the credit stays.</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-zinc-500 leading-relaxed">
              <span className="text-orange-400 font-mono">// One honest caveat:</span> if the top entries are close, we may adopt one and borrow ideas from another, with credit to both. We will say so publicly and in detail. What we will not do is quietly take your architecture and call it ours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

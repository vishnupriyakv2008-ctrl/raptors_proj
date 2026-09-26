import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What can I do before kickoff?',
    a: 'No project code. Planning, sketching schemas, reading the spec, choosing your stack, tuning prompts — all fine and encouraged. Any project code committed before kickoff disqualifies the submission.',
  },
  {
    q: 'Does it have to be docker compose up?',
    a: 'docker compose up is the default and the safest choice. If your stack has a genuinely equivalent single command that needs nothing but a laptop, use it and say so clearly in your README. The test is whether a stranger gets a running portal from one command, not which tool printed the logs.',
  },
  {
    q: 'What license should I use?',
    a: 'Any OSI-approved license. MIT or Apache-2.0 preferred, because those are the ones we can adopt without a legal conversation. Copyleft is allowed and will not cost you points.',
  },
  {
    q: 'What happens to the winning project?',
    a: 'We fork it, self-host it, and run our events on it. Credit your team on every event page it powers. Send our changes back to you as pull requests. See the Prizes section for the full statement.',
  },
  {
    q: 'Do I keep ownership of my code?',
    a: 'Yes, entirely. No assignment, no transfer, no CLA, nothing to sign. You are licensing your work to the world under an open license, and we are one of the people using it.',
  },
  {
    q: 'What if two entries are very close?',
    a: 'We will say so publicly, adopt one, and credit both, describing exactly what we took from where. We will not quietly merge someone\'s architecture without naming them.',
  },
  {
    q: 'Is AI assistance allowed?',
    a: 'AI coding assistants are allowed and expected — Claude Code, Cursor, Aider, GitHub Copilot, local models, and others. AI usage itself is not scored. We evaluate whether the final implementation works and whether the team can explain and defend what they built.',
  },
  {
    q: 'What is the acceptance suite?',
    a: 'A test suite we publish at kickoff that runs against your running portal and reports pass or fail per tier requirement. You run it yourself, as often as you like, and commit the output. Judges run the same suite. Nobody is guessing.',
  },
  {
    q: 'What is the fixture dataset?',
    a: 'A synthetic dataset built to the shape of a real Raptors event: roughly 40 projects, 30 judges, 8 tracks, and a full set of scores. No real names, no real submissions. It is deliberately built with edge cases: a reviewer who rates everything the same, an incomplete batch, and a duplicate entry.',
  },
];

export default function FAQ() {
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Questions, <span className="text-gradient">answered</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`reveal ${visible ? 'visible' : ''} glass rounded-xl overflow-hidden transition-all duration-300 ${
                open === i ? 'border-cyan-400/20' : ''
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left group"
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform duration-300 group-hover:text-cyan-400 ${
                    open === i ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '200px' : '0px' }}
              >
                <div className="px-6 pb-5 text-sm text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

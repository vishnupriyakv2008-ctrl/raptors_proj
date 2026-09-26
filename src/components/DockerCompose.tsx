import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { Copy, Check, Terminal, Container, Database, Zap } from 'lucide-react';

const steps = [
  {
    icon: Container,
    title: 'Clone',
    cmd: 'git clone https://github.com/your-team/dogfood.git',
    desc: 'Clone the repo. No cloud account, no hosted service, no external API.',
  },
  {
    icon: Terminal,
    title: 'Compose',
    cmd: 'docker compose up',
    desc: 'One command. The portal boots, seeds itself with fixture data, and is ready to use.',
  },
  {
    icon: Database,
    title: 'Seed',
    cmd: '→ 40 projects · 30 judges · 8 tracks',
    desc: 'A synthetic dataset built to the shape of a real event. Edge cases included.',
  },
  {
    icon: Zap,
    title: 'Run',
    cmd: 'open http://localhost:3000',
    desc: 'Working portal. Registration, teams, submissions, judging, results — all live.',
  },
];

export default function DockerCompose() {
  const { ref, visible } = useReveal();
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <section id="docker" className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px]" />

      <div className="relative max-w-5xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// ONE COMMAND TO RUNNING</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            <span className="font-mono text-gradient">docker compose up</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            That is it. The portal starts, seeds itself, and works. No cloud account, no hosted
            database, no authentication provider, no network connection. If it cannot run on a
            laptop with the network turned off, it cannot be adopted.
          </p>
        </div>

        {/* Terminal mockup */}
        <div className={`reveal-scale ${visible ? 'visible' : ''} mb-10`}>
          <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-black/40">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-zinc-500 ml-2">bash — dogfood — 80x24</span>
            </div>
            {/* Terminal body */}
            <div className="p-6 font-mono text-sm leading-relaxed bg-black/30">
              <div className="text-zinc-500">$ <span className="text-white">git clone https://github.com/your-team/dogfood.git</span></div>
              <div className="text-zinc-600">Cloning into 'dogfood'...</div>
              <div className="text-zinc-600">remote: Enumerating objects: 482, done.</div>
              <div className="text-lime-400">remote: Total 482 (delta 0), reused 0 (delta 0)</div>
              <div className="text-zinc-600 mt-1">Receiving objects: 100% (482/482), 2.1 MiB, done.</div>
              <div className="text-zinc-500 mt-2">$ <span className="text-white">cd dogfood && docker compose up</span></div>
              <div className="text-cyan-400 mt-1">[+] Running 5/5</div>
              <div className="text-zinc-400 pl-4">✔ Container dogfood-db      Started</div>
              <div className="text-zinc-400 pl-4">✔ Container dogfood-api     Started</div>
              <div className="text-zinc-400 pl-4">✔ Container dogfood-web     Started</div>
              <div className="text-zinc-400 pl-4">✔ Container dogfood-worker  Started</div>
              <div className="text-zinc-400 pl-4">✔ Container dogfood-seed    Exited (0)</div>
              <div className="text-orange-400 mt-1">[seed] Seeding fixture data: 40 projects, 30 judges, 8 tracks...</div>
              <div className="text-lime-400">[seed] Done in 3.2s</div>
              <div className="text-zinc-500 mt-2">[web]  ➜  Local:   http://localhost:3000/</div>
              <div className="text-white mt-1">[web]  ➜  Portal is live. Ready to judge.</div>
              <div className="text-zinc-500 mt-2 flex items-center gap-1">
                $ <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const stepId = `step-${i}`;
            const isCopyable = i < 2;
            return (
              <div
                key={step.title}
                className={`reveal-scale ${visible ? 'visible' : ''} group glass rounded-xl p-5 hover:bg-white/[0.06] transition-all duration-300 hover:border-cyan-400/20`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-xs font-mono text-zinc-600">0{i + 1}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/5 mb-3 ${
                    isCopyable ? 'cursor-pointer hover:border-cyan-400/20' : ''
                  }`}
                  onClick={() => isCopyable && copy(step.cmd, stepId)}
                >
                  <code className="text-xs font-mono text-cyan-400 truncate flex-1">{step.cmd}</code>
                  {isCopyable && (
                    copied === stepId ? (
                      <Check className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-500 shrink-0 group-hover:text-cyan-400 transition-colors" />
                    )
                  )}
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Constraints reminder */}
        <div className={`reveal ${visible ? 'visible' : ''} mt-8 flex flex-wrap gap-3 justify-center`}>
          {['No cloud account', 'No hosted database', 'No auth provider', 'No external API', 'No network required'].map((tag) => (
            <span key={tag} className="px-3.5 py-1.5 rounded-lg glass text-xs font-mono text-zinc-400 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-lime-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

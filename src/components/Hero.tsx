import { ArrowRight, Github, Zap, Terminal, Trophy, Globe } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

export default function Hero() {
  const { days, hours, minutes, seconds, expired } = useCountdown();

  const timeBlocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass text-xs font-mono tracking-wider text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          HACKATHON RAPTORS PRESENTS
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-6 leading-[0.85]">
          <span className="block text-white">DOGFOOD</span>
          <span className="block text-gradient animate-gradient">2026</span>
        </h1>

        <p className="text-xl md:text-3xl text-zinc-300 max-w-3xl mx-auto mb-4 font-light">
          Build the platform that will judge you.
        </p>
        <p className="text-sm md:text-base text-zinc-500 max-w-2xl mx-auto mb-10 font-mono">
          September 25–28, 2026 · Online · Free entry · $2,500 in prizes
        </p>

        {!expired && (
          <div className="flex gap-3 md:gap-4 justify-center mb-10">
            {timeBlocks.map((block) => (
              <div key={block.label} className="glass rounded-xl px-4 py-3 md:px-6 md:py-4 min-w-[80px] md:min-w-[110px]">
                <div className="text-3xl md:text-5xl font-bold font-mono text-white tabular-nums">
                  {String(block.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-widest mt-1">
                  {block.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {expired && (
          <div className="glass rounded-xl px-8 py-4 mb-10 inline-block">
            <span className="text-lg font-mono text-orange-400">The hackathon has begun.</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#register"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black rounded-xl font-medium hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            Register Your Team
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#manifesto"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 glass rounded-xl font-medium text-white hover:bg-white/10 transition-all duration-300"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            Read the Manifesto
          </a>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center text-xs font-mono text-zinc-600">
          <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-orange-400" />72 HOURS</span>
          <span className="flex items-center gap-1.5"><Github className="w-3.5 h-3.5 text-cyan-400" />OPEN SOURCE</span>
          <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-lime-400" />85+ COUNTRIES</span>
          <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-orange-400" />$2,500 IN PRIZES</span>
          <span>1–4 MEMBERS</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </div>
      </div>
    </section>
  );
}

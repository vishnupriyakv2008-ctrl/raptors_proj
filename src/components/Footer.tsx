import { Terminal, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 px-6">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-orange-500 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight">DOGFOOD</span>
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest">2026</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              A 72-hour online hackathon by Hackathon Raptors. Build the platform that will judge
              you.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">Navigate</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#manifesto" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">Manifesto</a>
              <a href="#tiers" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">Tier Ladder</a>
              <a href="#prizes" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">Prizes</a>
              <a href="#judges" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">Judges</a>
              <a href="#timeline" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">Timeline</a>
              <a href="#faq" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">FAQ</a>
              <a href="#register" className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">Register</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/20 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/20 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#register"
              className="inline-flex items-center px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-cyan-400 transition-all duration-300"
            >
              Register Your Team
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600 font-mono">
            Hackathon Raptors — Community Interest Company
          </p>
          <p className="text-xs text-zinc-600 font-mono">
            Sept 25–28, 2026 · 18:00 UTC
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg md:text-xl font-bold text-gradient">
            Build the platform that will judge you.
          </p>
        </div>
      </div>
    </footer>
  );
}

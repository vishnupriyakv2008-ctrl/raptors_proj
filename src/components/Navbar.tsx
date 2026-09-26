import { useEffect, useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import UserMenu from '@/components/UserMenu';

const navLinks = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Tiers', href: '#tiers' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Judges', href: '#judges' },
  { label: 'Docker', href: '#docker' },
  { label: 'Platform', href: '#platform' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onSignInClick }: { onSignInClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-orange-500 flex items-center justify-center transition-transform group-hover:scale-110">
            <Terminal className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">DOGFOOD</span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest">2026</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <UserMenu onSignInClick={onSignInClick} />
          <a
            href="#register"
            className="px-5 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            Register
          </a>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass-strong mt-3 mx-6 rounded-xl p-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onSignInClick(); }}
            className="px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white text-left"
          >
            Sign In
          </button>
          <a
            href="#register"
            onClick={() => setMobileOpen(false)}
            className="px-4 py-3 text-sm font-medium bg-white text-black rounded-lg text-center mt-2"
          >
            Register
          </a>
        </div>
      )}
    </header>
  );
}

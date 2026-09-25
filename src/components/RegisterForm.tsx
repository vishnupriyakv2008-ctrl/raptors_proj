import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useReveal } from '@/hooks/useReveal';
import { Send, Loader2, CheckCircle2, AlertCircle, Users } from 'lucide-react';
import type { Registration } from '@/types';

export default function RegisterForm() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({
    team_name: '',
    email: '',
    team_size: 1,
    members: '',
    country: '',
    solo: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [regCount, setRegCount] = useState(0);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  async function fetchRegistrations() {
    const { data, error } = await supabase
      .from('public_registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setRegistrations(data as Registration[]);
      setRegCount(data.length);
    }

    const { count } = await supabase
      .from('public_registrations')
      .select('*', { count: 'exact', head: true });
    if (count !== null) setRegCount(count);
  }

  function handleChange(field: keyof typeof form, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSoloChange(solo: boolean) {
    setForm((prev) => ({
      ...prev,
      solo,
      team_size: solo ? 1 : prev.team_size === 1 ? 2 : prev.team_size,
      members: solo ? prev.members.split(',')[0] || '' : prev.members,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      team_name: form.team_name.trim(),
      email: form.email.trim(),
      team_size: form.solo ? 1 : form.team_size,
      members: form.solo ? form.members.trim().split(',')[0] || form.team_name.trim() : form.members.trim(),
      country: form.country.trim(),
      solo: form.solo,
    };

    if (!payload.team_name || !payload.email || !payload.country || !payload.members) {
      setStatus('error');
      setErrorMsg('Please fill in all fields.');
      return;
    }

    const { error } = await supabase.from('registrations').insert([payload]);

    if (error) {
      setStatus('error');
      setErrorMsg(error.message || 'Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    setForm({ team_name: '', email: '', team_size: 1, members: '', country: '', solo: false });
    fetchRegistrations();
    setTimeout(() => setStatus('idle'), 5000);
  }

  return (
    <section id="register" className="relative py-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// JOIN THE HACKATHON</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Register your <span className="text-gradient">team</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Teams of 1–4 members. Solo participation allowed. Registration is open to anyone, from
            any country.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className={`reveal-scale ${visible ? 'visible' : ''} lg:col-span-3`}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 md:p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Team Name</label>
                  <input
                    type="text"
                    value={form.team_name}
                    onChange={(e) => handleChange('team_name', e.target.value)}
                    placeholder="The Raptors"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="team@example.com"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    placeholder="United Kingdom"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Members (names)</label>
                  <input
                    type="text"
                    value={form.members}
                    onChange={(e) => handleChange('members', e.target.value)}
                    placeholder="Jane Doe, John Smith"
                    disabled={form.solo}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none transition-colors disabled:opacity-40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider">Participation Mode</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleSoloChange(false)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                      !form.solo
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                        : 'bg-black/20 text-zinc-500 border border-white/5 hover:border-white/15'
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-1.5" /> Team (1–4)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSoloChange(true)}
                    className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                      form.solo
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-400/40'
                        : 'bg-black/20 text-zinc-500 border border-white/5 hover:border-white/15'
                    }`}
                  >
                    Solo (1 person)
                  </button>
                </div>
              </div>

              {!form.solo && (
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
                    Team Size: <span className="text-cyan-400">{form.team_size}</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={4}
                    value={form.team_size}
                    onChange={(e) => handleChange('team_size', Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                    <span>2</span><span>3</span><span>4</span>
                  </div>
                </div>
              )}

              {/* Status messages */}
              {status === 'error' && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-400/20 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}
              {status === 'success' && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-green-500/10 border border-green-400/20 text-green-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Registration successful! See you on September 25.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-xl font-medium hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
                ) : (
                  <>Register Team <Send className="w-4 h-4" /></>
                )}
              </button>

              <p className="text-[11px] text-zinc-600 text-center">
                By registering, you agree to the hackathon rules. Your email and member names are
                private — only team name, country, and size are publicly shown.
              </p>
            </form>
          </div>

          {/* Live registrations list */}
          <div className={`reveal-scale ${visible ? 'visible' : ''} lg:col-span-2`} style={{ transitionDelay: '120ms' }}>
            <div className="glass rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Registered Teams
                </h3>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono">
                  {regCount} {regCount === 1 ? 'team' : 'teams'}
                </span>
              </div>

              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {registrations.length === 0 ? (
                  <div className="text-center py-12 text-zinc-600 text-sm">
                    <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    No teams registered yet. Be the first!
                  </div>
                ) : (
                  registrations.map((reg, i) => (
                    <div
                      key={`${reg.team_name}-${i}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-cyan-400/20 transition-colors"
                    >
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center text-xs font-mono text-cyan-400">
                        {reg.team_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-white font-medium truncate">{reg.team_name}</div>
                        <div className="text-xs text-zinc-500 truncate">{reg.country}</div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5">
                        {reg.solo && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/10 text-orange-400">SOLO</span>
                        )}
                        <span className="text-xs font-mono text-zinc-400">{reg.team_size}x</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

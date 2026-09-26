import { useReveal } from '@/hooks/useReveal';
import { Gavel, Shield } from 'lucide-react';

const judges = [
  {
    name: 'Anuj Kapoor',
    role: 'Senior Software Engineer, Microsoft',
    creds: 'IEEE Senior Member. 16 years building AI and cloud platforms at Microsoft, Amazon and Priceline. Agentic AI, multi-agent systems, enterprise automation and distributed systems.',
  },
  {
    name: 'Smit Nitinkumar Shah',
    role: 'Senior Software Engineer, Microsoft',
    creds: 'Large-scale cloud platforms, distributed systems, Kubernetes and confidential computing. Led platform work across Azure security, compliance, reliability and workflow orchestration.',
  },
  {
    name: 'Rupesh Kumar Prasad',
    role: 'Principal Architect',
    creds: '18 years designing secure, scalable enterprise platforms across Azure, AWS and the Microsoft stack. Cloud architecture, identity and security, APIs, DevOps and data platforms.',
  },
  {
    name: 'Narasimha Reddy Annapareddy',
    role: 'Software Engineering Manager, NetSuite',
    creds: 'Leading business systems platform engineering. Enterprise applications, integrations, and platform reliability at scale.',
  },
  {
    name: 'Nail Iarmukhametov',
    role: 'Cloud Infrastructure & DevOps Lead',
    creds: 'Ten years operating production systems on Kubernetes, AWS and Azure. Infrastructure as code, CI/CD, cloud security and reliability — the ground the one-command requirement stands on.',
  },
];

export default function Judges() {
  const { ref, visible } = useReveal();

  return (
    <section id="judges" className="relative py-28 px-6">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-16`}>
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// THE PANEL</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            The <span className="text-gradient">judges</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Senior engineers, architects and technical leaders who have built and operated evaluation
            systems, run production software at scale, and sat on the other side of a judging form
            knowing it could have been better.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {judges.map((judge, i) => (
            <div
              key={judge.name}
              className={`reveal-scale ${visible ? 'visible' : ''} group glass rounded-2xl p-7 hover:bg-white/[0.06] transition-all duration-300 hover:border-cyan-400/20`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 flex items-center justify-center text-lg font-bold text-cyan-400 font-mono">
                  {judge.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{judge.name}</h3>
                  <p className="text-xs text-cyan-400 mt-0.5">{judge.role}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">{judge.creds}</p>
            </div>
          ))}

          {/* More judges card */}
          <div
            className={`reveal-scale ${visible ? 'visible' : ''} glass rounded-2xl p-7 flex flex-col items-center justify-center text-center border-dashed`}
            style={{ transitionDelay: `${judges.length * 80}ms` }}
          >
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-3">
              <Gavel className="w-6 h-6 text-zinc-500" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Full Panel Seated</h3>
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              30+ judges from Microsoft, Amazon, Google, and across the engineering community.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
              <Shield className="w-3.5 h-3.5 text-cyan-400/50" />
              Assignments issued
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

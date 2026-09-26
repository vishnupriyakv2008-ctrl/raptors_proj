import { useReveal } from '@/hooks/useReveal';

export default function WhyNow() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-28 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/8 rounded-full blur-[140px]" />

      <div className="relative max-w-4xl mx-auto" ref={ref}>
        <div className={`reveal ${visible ? 'visible' : ''} text-center mb-14`}>
          <span className="text-xs font-mono text-orange-400 tracking-widest">// WHY NOW</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            The category <span className="text-gradient">stopped moving</span>
          </h2>
        </div>

        <div className="space-y-5">
          <div className={`reveal ${visible ? 'visible' : ''} glass rounded-2xl p-7 md:p-8`}>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Every hackathon platform in the world converged on the same nine features, and then
              stopped moving. The category leader still cannot weight judging criteria and tells
              organizers to use a spreadsheet instead. Score normalization, the one genuinely hard
              statistical problem in the whole domain, is advertised as a feature by multiple
              platforms and documented by none of them.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Community voting is treated as an unsolvable abuse surface to be managed with small
              prizes and hidden results rather than fixed with engineering. Pricing is sales-gated
              across the board, so a volunteer organizer running a free event cannot even find out
              what it costs. And after fifteen years and millions of developers, not one of them
              ships a public API, leaving an entire industry to integrate through screen scrapers
              and downloaded spreadsheets.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              The open-source alternatives are better than their reputation. Gavel brought a real
              idea from mathematical psychology into judging and has been quietly producing fairer
              rankings at HackMIT for years. JunctionApp, Dribdat, Quill and Hibiscus are all real
              and all self-hostable. What is missing is a modern one, assembled as a whole, that a
              working organizer can deploy without becoming its maintainer.
            </p>
          </div>

          <div className={`reveal ${visible ? 'visible' : ''} glass rounded-2xl p-8 md:p-10 text-center border-l-2 border-cyan-400`}>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6">
              We are not writing this as analysts. We are writing it as operators, from thirty-five
              events of knowing precisely which stage of the pipeline the tooling abandons you at.
            </p>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6">
              Generating a CRUD app is trivial now. Building an evaluation system that is fair, that
              enforces its own rules, that an organizer can actually operate, and that you can hand
              to someone else without a handover call, is the part that still takes engineers.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-gradient mt-8">
              That is the hackathon. 72 hours. One product. We run the winner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

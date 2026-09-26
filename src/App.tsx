import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeBanner from '@/components/MarqueeBanner';
import Manifesto from '@/components/Manifesto';
import About from '@/components/About';
import WhyParticipate from '@/components/WhyParticipate';
import Tiers from '@/components/Tiers';
import RoleIsolation from '@/components/RoleIsolation';
import Judging from '@/components/Judging';
import Prizes from '@/components/Prizes';
import AcceptanceSuite from '@/components/AcceptanceSuite';
import Submission from '@/components/Submission';
import Judges from '@/components/Judges';
import Timeline from '@/components/Timeline';
import Rules from '@/components/Rules';
import RegisterForm from '@/components/RegisterForm';
import WhyNow from '@/components/WhyNow';
import AboutRaptors from '@/components/AboutRaptors';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <main>
        <Hero />
        <MarqueeBanner />
        <Manifesto />
        <About />
        <WhyParticipate />
        <Tiers />
        <RoleIsolation />
        <Judging />
        <Prizes />
        <AcceptanceSuite />
        <Submission />
        <Judges />
        <Timeline />
        <Rules />
        <RegisterForm />
        <WhyNow />
        <AboutRaptors />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeBanner from '@/components/MarqueeBanner';
import Manifesto from '@/components/Manifesto';
import About from '@/components/About';
import WhyParticipate from '@/components/WhyParticipate';
import Tiers from '@/components/Tiers';
import Judging from '@/components/Judging';
import Submission from '@/components/Submission';
import Timeline from '@/components/Timeline';
import Rules from '@/components/Rules';
import RegisterForm from '@/components/RegisterForm';
import AboutRaptors from '@/components/AboutRaptors';
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
        <Judging />
        <Submission />
        <Timeline />
        <Rules />
        <RegisterForm />
        <AboutRaptors />
      </main>
      <Footer />
    </div>
  );
}

export default App;

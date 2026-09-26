import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
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
import DockerCompose from '@/components/DockerCompose';
import Submission from '@/components/Submission';
import Judges from '@/components/Judges';
import Timeline from '@/components/Timeline';
import Rules from '@/components/Rules';
import RegisterForm from '@/components/RegisterForm';
import WhyNow from '@/components/WhyNow';
import AboutRaptors from '@/components/AboutRaptors';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import Platform from '@/components/Platform';

function AppContent() {
  const [authOpen, setAuthOpen] = useState(false);

  // Handle ?join=INVITE_TOKEN in URL for team invite links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinToken = params.get('join');
    if (joinToken) {
      // Scroll to platform section; actual join happens after sign-in
      const platformEl = document.getElementById('platform');
      if (platformEl) platformEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar onSignInClick={() => setAuthOpen(true)} />
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
        <DockerCompose />
        <Platform onSignInClick={() => setAuthOpen(true)} />
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
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

import { Navbar } from '@/widgets/navbar/Navbar';
import { Footer } from '@/widgets/footer/Footer';
import { HeroSection } from '@/pages/landing/ui/HeroSection';
import { StatsSection } from '@/pages/landing/ui/StatsSection';
import { FeaturesSection } from '@/pages/landing/ui/FeaturesSection';
import { ToursSection } from '@/pages/landing/ui/ToursSection';
import { SocialProofSection } from '@/pages/landing/ui/SocialProofSection';
import { PartnersPressSection } from '@/pages/landing/ui/PartnersPressSection';
import { SubscribeSection } from '@/pages/landing/ui/SubscribeSection';

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-brand-ink">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ToursSection />
        <SocialProofSection />
        <PartnersPressSection />
        <SubscribeSection />
      </main>
      <Footer />
    </div>
  );
}

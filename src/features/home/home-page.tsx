import { AboutSection } from "@/components/sections/about-section";
import { ApproachOverviewSection } from "@/components/sections/approach-overview-section";
import { CommunityPartnersStrip } from "@/components/sections/community-partners-strip";
import { EducationalPartnersStrip } from "@/components/sections/educational-partners-strip";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FounderSection } from "@/components/sections/founder-section";
import { HeaderSection } from "@/components/sections/header-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { ProgramsSection } from "@/components/sections/programs-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export function HomePage() {
  return (
    <div className="constraint-shell relative isolate min-h-screen bg-background text-foreground">
      <div className="constraint-layer relative z-20">
        <HeaderSection />
        <main id="site-main">
          <HeroSection />
          <ApproachOverviewSection />
          <EducationalPartnersStrip />
          <div className="constraint-divider">
            <AboutSection />
          <CommunityPartnersStrip />
          </div>
          <div className="constraint-divider">
            <ProgramsSection />
          </div>
          <div className="constraint-divider">
            <ImpactSection />
          </div>
          <div className="constraint-divider">
            <TestimonialsSection />
            {/* <FounderSection /> */}
            <FaqSection />
          </div>
        </main>
        <FooterSection />
      </div>
    </div>
  );
}

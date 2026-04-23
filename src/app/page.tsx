import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FounderSection } from "@/components/sections/founder-section";
import { HeaderSection } from "@/components/sections/header-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { ProgramsSection } from "@/components/sections/programs-section";
import SplashCursor from "@/components/SplashCursor";

export default function Home() {
  return (
    <div className="constraint-shell relative isolate min-h-screen bg-white text-foreground">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#A855F7"
      />

      <div className="constraint-layer relative z-20">
        <HeaderSection />
        <main>
          <div className="constraint-divider">
            <HeroSection />
          </div>
          <div className="constraint-divider">
            <AboutSection />
          </div>
          <div className="constraint-divider">
            <ProgramsSection />
          </div>
          <div className="constraint-divider">
            <ImpactSection />
          </div>
          <div className="constraint-divider">
            <PartnersSection />
          </div>
          <div className="constraint-divider">
            <FounderSection />
          </div>
          <div className="constraint-divider">
            <FaqSection />
          </div>
          <div className="constraint-divider">
            <ContactSection />
          </div>
        </main>
        <div className="constraint-divider">
          <FooterSection />
        </div>
      </div>
    </div>
  );
}

import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationalPartnersStrip } from "@/components/sections/educational-partners-strip";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FounderSection } from "@/components/sections/founder-section";
import { HeaderSection } from "@/components/sections/header-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { ProgramsSection } from "@/components/sections/programs-section";


export default function Home() {
  return (
    <div className="constraint-shell relative isolate min-h-screen bg-background text-foreground">
      

      <div className="constraint-layer relative z-20">
        <HeaderSection />
        <main>
            <HeroSection />
          <div className="constraint-divider">
            <EducationalPartnersStrip />
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

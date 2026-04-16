import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EventsSection } from "@/components/sections/events-section";
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
    <div className="min-h-screen bg-white text-slate-900">
      <HeaderSection />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <ImpactSection />
        <EventsSection />
        <PartnersSection />
        <FounderSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}

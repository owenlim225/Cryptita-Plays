import TimelineDemo from "@/components/timeline-demo";
import { FooterSection } from "@/components/sections/footer-section";
import { HeaderSection } from "@/components/sections/header-section";

export default function OurStoryPage() {
  return (
    <div className="constraint-shell relative isolate min-h-screen bg-background text-foreground">
      <div className="constraint-layer relative z-20">
        <HeaderSection />
        <main>
          <TimelineDemo />
        </main>
        <div className="constraint-divider">
          <FooterSection />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Gallery4 } from "@/components/ui/gallery4";
import { impactGalleryItems } from "@/features/home/data/content";

export function ImpactSection() {
  return (
    <section id="impact" className="py-20">
      <Gallery4
        contained
        description="Reach, education, and partnerships that grow with every program we run."
        items={impactGalleryItems}
        title="Impact"
      />
      <p className="mt-8 text-center text-lg font-medium text-(--text-muted)">Different ecosystems, one shared mission.</p>

    </section>
  );
}

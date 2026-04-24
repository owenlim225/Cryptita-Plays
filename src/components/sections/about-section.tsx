"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TiltedSurface } from "@/components/TiltedCard";
import MagicBento from "@/components/magic-bento/magic-bento";
import { aboutBentoItems } from "@/features/shared-content/data/about-bento-content";
import { siteConfig } from "@/features/shared-content/data/site-config";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="constraint-content w-full">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Who We Are</h2>
            <p className="mt-5 text-lg leading-8 text-(--text-muted)">{siteConfig.mission}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <TiltedSurface
              className="relative overflow-hidden rounded-3xl border border-(--primary) bg-(--primary) p-2 shadow-xl"
              captionText="Mission — Education First, Hype Last"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div
                className="pointer-events-none absolute top-0 -right-3 z-10 h-full w-3 bg-size-[10px_10px] text-white/20 bg-[repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] md:-right-10 md:w-10"
                aria-hidden
              />
              <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-(--primary)">
                <Image
                  src="/brand/primary-logo.png"
                  alt=""
                  fill
                  className="object-contain object-right p-6 opacity-[0.10] brightness-0 invert"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 z-1 flex flex-col justify-end bg-linear-to-t from-(--primary)/95 via-(--primary)/55 to-transparent p-5 md:p-6">
                  <p className="text-xs font-medium text-white/80">Mission</p>
                  <h2 className="mt-2 text-lg font-bold text-white md:text-xl">Education First, Hype Last</h2>
                  <p className="mt-3 text-sm leading-6 text-white/90">
                    We make learning accessible, safe, and inclusive through beginner-friendly materials,
                    community-based outreach, and long-term support for underserved youth.
                  </p>
                </div>
              </div>
            </TiltedSurface>
          </motion.div>
        </div>
        <div
          id="approach"
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl bg-(--surface-alt) p-6 sm:p-8"
        >
          <h3 className="text-2xl font-bold text-foreground">Our Approach</h3>
          <p className="mt-4 text-(--text-muted)">
            We combine traditional and digital learning methods including books, storytelling,
            workshops, and simplified Web3 materials to keep learning beginner-friendly, safe,
            and community-based.
          </p>
          <div id="problem" className="mt-8 min-w-0">
            <MagicBento
              className="w-full"
              items={aboutBentoItems}
              gridVariant="threeColumnFive"
              textAutoHide={false}
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt
              enableMagnetism
              clickEffect
              spotlightRadius={330}
              particleCount={12}
              glowColor="151, 28, 230"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

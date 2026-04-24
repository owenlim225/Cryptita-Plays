"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { HeroStage } from "@/components/sections/hero-stage";
import ShinyText from "@/components/shiny-text";
import SplitText from "@/components/split-text";
import { siteConfig } from "@/features/shared-content/data/site-config";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="hero"
      className="relative w-full min-w-0 min-h-0 overflow-x-clip overflow-y-visible bg-background pb-0"
    >
      <HeroStage sectionRef={sectionRef}>
        <div className="flex min-w-0 flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2.5">
            <Image
              src="/brand/icon-mark.ico"
              alt=""
              width={20}
              height={20}
              className="size-4 shrink-0 object-contain"
              aria-hidden
            />
            <SplitText
              text="Community-driven initiative"
              tag="p"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-muted)"
              splitType="words"
              delay={40}
              duration={0.55}
              ease="power3.out"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
            />
          </div>
          <h1 className="mt-3 w-full text-center text-3xl font-black leading-tight tracking-tight sm:text-4xl sm:leading-tight">
            <ShinyText
              text={siteConfig.tagline}
              className="max-w-full text-balance"
              color="#5b1a9e"
              shineColor="#e9d5ff"
              speed={2.4}
              delay={0.35}
              spread={110}
              direction="left"
            />
          </h1>
          <SplitText
            text={siteConfig.mission}
            tag="p"
            className="mt-5 max-w-xl text-base leading-7 text-(--text-muted)"
            splitType="words"
            delay={28}
            duration={0.5}
            ease="power3.out"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#programs"
              className="rounded-full bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--primary-hover)"
            >
              Sponsor
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="rounded-full border border-(--border-subtle) px-5 py-2.5 text-sm text-(--text-muted) transition hover:border-(--primary) hover:text-(--primary)"
            >
              Volunteer
            </motion.a>
          </div>
        </div>
      </HeroStage>
    </section>
  );
}

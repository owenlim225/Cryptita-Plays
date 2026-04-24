"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroIllustration } from "@/components/hero-illustration";
import { siteConfig } from "../site-data";

const heroFloatTransition = {
  duration: 5.5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export function HeroSection() {
  const svgId = `hero-illu-${useId().replace(/:/g, "")}`;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-linear-to-br from-background via-[#fcfaf6] to-[#f2efe6] py-16 md:py-20"
    >
      <div className="constraint-content relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="order-2 flex justify-center lg:order-1"
          >
            <motion.div
              className="w-full max-w-[min(100%,28rem)] shrink-0 will-change-transform"
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              transition={reduceMotion ? undefined : heroFloatTransition}
            >
              <HeroIllustration
                idPrefix={svgId}
                className="h-auto w-full aspect-1081/1080"
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="order-1 flex min-w-0 flex-col items-center text-center lg:order-2"
          >
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" aria-hidden>
                <HeroIllustration
                  idPrefix={`${svgId}-eyebrow`}
                  className="h-full w-full"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-muted)">
                Community-driven initiative
              </p>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl sm:leading-tight">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-(--text-muted)">
              {siteConfig.mission}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#programs"
              className="rounded-full bg-(--primary) px-5 py-2.5 text-sm text-white transition hover:bg-(--primary-hover)"
            >
              Sponsor
            </a>
            <a
              href="#contact"
              className="rounded-full border border-(--border-subtle) px-5 py-2.5 text-sm text-(--text-muted) transition hover:border-(--primary) hover:text-(--primary)"
            >
              Volunteer
            </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

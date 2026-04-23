"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../site-data";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-linear-to-b from-(--primary-soft) to-white py-16">
      <Image
        src="/brand/photos/hero.jpg"
        alt="Cryptita Plays community learners"
        fill
        priority
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/85 to-white" />
      <div className="constraint-content relative z-10 grid w-full gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--primary)">
            Community-driven initiative
          </p>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-(--text-muted)">{siteConfig.mission}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#programs"
              className="rounded-full bg-(--primary) px-5 py-2.5 text-sm text-white transition hover:bg-(--primary-hover)"
            >
              Sponsor Us
            </a>
            <a
              href="#contact"
              className="rounded-full border border-(--border-subtle) px-5 py-2.5 text-sm text-(--text-muted) transition hover:border-(--primary) hover:text-(--primary)"
            >
              Volunteer With Us
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-(--primary) bg-(--primary) p-7 shadow-xl"
        >
          <div className="absolute top-0 -right-4 h-full w-4 bg-size-[10px_10px] text-(--primary)/10 bg-[repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] md:-right-14 md:w-14" />
          <p className="mt-3 text-xs font-medium text-white/80">Mission</p>
          <h2 className="mt-2 text-xl font-bold text-white">Education First, Hype Last</h2>
          <p className="mt-4 text-sm leading-6 text-white/85">
            We make learning accessible, safe, and inclusive through beginner-friendly materials,
            community-based outreach, and long-term support for underserved youth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

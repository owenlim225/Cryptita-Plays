"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../site-data";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[var(--primary-soft)] to-white px-6 py-20">
      <Image
        src="/brand/photos/hero.jpg"
        alt="Cryptita Plays community learners"
        fill
        priority
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white" />
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative z-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Community-driven initiative
          </p>
          <h1 className="text-4xl font-black tracking-tight text-[var(--foreground)] sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-muted)]">{siteConfig.mission}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#programs"
              className="rounded-full bg-[var(--primary)] px-6 py-3 text-white transition hover:bg-[var(--primary-hover)]"
            >
              Sponsor Us
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[var(--border-subtle)] px-6 py-3 text-[var(--text-muted)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
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
          className="relative z-10 rounded-3xl border border-[var(--primary)] bg-[var(--primary)] p-8 shadow-xl"
        >
          <p className="mt-4 text-sm font-medium text-white/80">Mission</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Education First, Hype Last</h2>
          <p className="mt-4 text-white/85">
            We make learning accessible, safe, and inclusive through beginner-friendly materials,
            community-based outreach, and long-term support for underserved youth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

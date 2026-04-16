"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../site-data";

export function HeroSection() {
  return (
    <section id="hero" className="bg-gradient-to-b from-amber-50 to-white px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Binance-charity-inspired movement
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{siteConfig.mission}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#programs" className="rounded-full bg-slate-900 px-6 py-3 text-white">
              Explore Programs
            </a>
            <a href="#contact" className="rounded-full border border-slate-300 px-6 py-3 text-slate-700">
              Contact Team
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-amber-100 bg-white p-8 shadow-xl shadow-amber-100/40"
        >
          <p className="text-sm font-medium text-slate-500">Current Campaign</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Code, Play, and Care 2026</h2>
          <p className="mt-4 text-slate-600">
            A national fundraiser connecting creators, gamers, and civic groups to sponsor digital
            education and emergency relief for underserved communities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

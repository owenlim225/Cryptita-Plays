"use client";

import { motion } from "framer-motion";
import { TiltedSurface } from "@/components/TiltedCard";
import { programs } from "../site-data";

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-[var(--surface-alt)] py-20">
      <div className="constraint-content w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">Core Programs</h2>
        <div className="programs-grid mt-8 grid gap-6">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="mx-auto grid w-full max-w-5xl items-center gap-10 rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm lg:grid-cols-2 lg:gap-12"
            >
              <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-none lg:text-left">
                <h3 className="text-xl font-semibold text-[var(--foreground)]">{program.title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-muted)]">{program.description}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="min-w-0"
              >
                <TiltedSurface
                  className="relative overflow-hidden rounded-3xl border border-(--primary) bg-(--primary) p-2 shadow-xl"
                  captionText={`Core Program ${index + 1}`}
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
                    <div className="absolute inset-0 z-1 flex flex-col justify-end bg-linear-to-t from-(--primary)/95 via-(--primary)/55 to-transparent p-5 md:p-6">
                      <p className="text-xs font-medium text-white/80">Core Program</p>
                      <h4 className="mt-2 text-lg font-bold text-white md:text-xl">{program.title}</h4>
                    </div>
                  </div>
                </TiltedSurface>
              </motion.div>
            </motion.article>
          ))}
        </div>
        <div id="materials" className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-white p-8">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">Educational Materials</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
            <li>Barya to Blockchain: Young Learners Encyclopedia</li>
            <li>Web3 activity books for kids</li>
            <li>Coloring and storytelling books</li>
            <li>Digital safety and awareness materials</li>
          </ul>
        </div>
        <div
          id="acis"
          className="mt-8 rounded-2xl border border-[var(--primary)] bg-[var(--primary-soft)] p-8"
        >
          <h3 className="text-2xl font-bold text-[var(--foreground)]">Adopt-a-Child Iskolar Program (ACIS)</h3>
          <p className="mt-3 text-[var(--text-muted)]">
            Provides selected students with monthly educational assistance, school supplies and
            learning materials, and access to Mini-Library resources.
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
            Coverage model: Up to 5 students per Mini-Library area.
          </p>
          <a
            href="#contact"
            className="mt-5 inline-block rounded-full bg-[var(--primary)] px-5 py-2.5 font-semibold text-white transition hover:bg-[var(--primary-hover)]"
          >
            Support ACIS Scholars
          </a>
        </div>
      </div>
    </section>
  );
}

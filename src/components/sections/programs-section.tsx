"use client";

import { motion } from "framer-motion";
import { programs } from "../site-data";

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-[var(--surface-alt)] px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">Core Programs</h2>
        <div className="programs-grid mt-8 grid gap-6 md:grid-cols-3">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{program.title}</h3>
              <p className="mt-3 leading-7 text-[var(--text-muted)]">{program.description}</p>
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

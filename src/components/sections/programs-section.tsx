"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { TiltedSurface } from "@/components/TiltedCard";
import { programs } from "@/features/home/data/content";

export function ProgramsSection() {
  useEffect(() => {
    const runId = "run-1";
    const programsGrid = document.querySelector("#programs .programs-grid");
    // #region agent log
    fetch("http://127.0.0.1:7282/ingest/c5064a4c-f1b4-4fcd-801c-1edd4355fe1e", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "250da2" },
      body: JSON.stringify({
        sessionId: "250da2",
        runId,
        hypothesisId: "H2_H4",
        location: "programs-section.tsx:12",
        message: "ProgramsSection mounted",
        data: {
          programsGridInlineStyle: programsGrid?.getAttribute("style") ?? null,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  return (
    <section id="programs" className="bg-[var(--surface-alt)] py-20">
      <div className="constraint-content w-full">
        <h2 className="text-center text-3xl font-bold text-[var(--primary)]">Core Programs</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--text-muted)]">
          Explore our flagship initiatives designed to equip learners with digital literacy, creativity,
          and future-ready skills.
        </p>
        <div className="programs-grid mt-8 grid gap-6">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="mx-auto grid w-full max-w-5xl items-center gap-10 py-2 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={`mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-none lg:text-left ${
                  index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <h3 className="text-xl font-semibold text-[var(--primary)]">{program.title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-muted)]">{program.description}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`min-w-0 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
              >
                <TiltedSurface
                  className="relative overflow-hidden rounded-3xl shadow-lg"
                  captionText={`Core Program ${index + 1}`}
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                >
                  <div className="relative h-[228px] w-full overflow-hidden rounded-3xl">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TiltedSurface>
              </motion.div>
            </motion.article>
          ))}
        </div>
        <div id="materials" className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-white p-8">
          <h3 className="text-2xl font-bold text-[var(--primary)]">Educational Materials</h3>
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
          <h3 className="text-2xl font-bold text-[var(--primary)]">Adopt-a-Child Iskolar Program (ACIS)</h3>
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

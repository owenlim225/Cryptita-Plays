"use client";

import { motion } from "framer-motion";
import { TiltedSurface } from "@/components/TiltedCard";
import { programs } from "@/features/home/data/content";

const PROGRAM_CARD_SCALE = 1.618;
const programCardWidthClass = `max-w-[min(100%,calc(100%/${PROGRAM_CARD_SCALE}))]`;

export function ProgramsSection() {
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
        <div className="mt-10 p-6 md:px-6 md:pb-12 md:pt-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-3 md:perspective-[1000px]">
            <div
              id="materials"
              className="transform-3d flex min-w-0 scroll-mt-20 justify-center md:transform-[rotateY(20deg)]"
            >
              <div
                className={`relative aspect-9/16 w-full min-h-0 min-w-0 ${programCardWidthClass} mx-auto`}
              >
                <TiltedSurface
                  className="box-border flex h-full min-h-0 w-full min-w-0 flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 text-left shadow-md sm:p-6"
                  figureClassName="!m-0 h-full w-full"
                  containerHeight="100%"
                  containerWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                >
                  <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg sm:h-40 sm:rounded-xl">
                    <img
                      src="/brand/young-learners-encyclopedia.png"
                      alt="Barya to Blockchain: Young Learners Encyclopedia — Web3 Young Learners book cover"
                      className="h-full w-full object-cover"
                      width={400}
                      height={600}
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[var(--primary)] sm:mt-5 sm:text-xl md:text-2xl">
                    Educational Materials
                  </h3>
                  <ul className="mt-3 min-h-0 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-[var(--text-muted)] sm:mt-4 sm:space-y-2 sm:pl-5 sm:text-base">
                    <li>Barya to Blockchain: Young Learners Encyclopedia</li>
                    <li>Web3 activity books for kids</li>
                    <li>Coloring and storytelling books</li>
                    <li>Digital safety and awareness materials</li>
                  </ul>
                </TiltedSurface>
              </div>
            </div>
            <div
              id="acis"
              className="transform-3d flex min-w-0 scroll-mt-20 justify-center md:transform-[rotateY(-20deg)]"
            >
              <div
                className={`relative aspect-9/16 w-full min-h-0 min-w-0 ${programCardWidthClass} mx-auto`}
              >
                <TiltedSurface
                  className="box-border flex h-full min-h-0 w-full min-w-0 flex-col justify-between overflow-y-auto overflow-x-hidden rounded-2xl border border-[var(--primary)] bg-[var(--primary-soft)] p-5 text-left shadow-md sm:p-6"
                  figureClassName="!m-0 h-full w-full"
                  containerHeight="100%"
                  containerWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                >
                  <div className="min-h-0 min-w-0">
                    <h3 className="text-lg font-bold text-[var(--primary)] sm:text-xl md:text-2xl">
                      Adopt-a-Child Iskolar Program (ACIS)
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                      Provides selected students with monthly educational assistance, school supplies and
                      learning materials, and access to Mini-Library resources.
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[var(--primary)] sm:text-base">
                      Coverage model: Up to 5 students per Mini-Library area.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex shrink-0 self-start rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] sm:mt-6 sm:py-2.5"
                  >
                    Support ACIS Scholars
                  </a>
                </TiltedSurface>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

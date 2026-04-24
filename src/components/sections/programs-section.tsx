"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { TiltedSurface } from "@/components/TiltedCard";
import { programs } from "@/features/home/data/content";
import { cn } from "@/lib/utils";

const PROGRAM_CARD_SCALE = 1.618;
const PROGRAM_SUBCARD_VISUAL_SCALE = 0.7;
const programSubgridCardWidthClass = `max-w-[min(100%,calc(100%*${PROGRAM_SUBCARD_VISUAL_SCALE}/${PROGRAM_CARD_SCALE}))]`;

const programSubcardTiltClass = cn(
  "program-subcard-animated-border animate-border relative w-full min-w-0",
  "aspect-4/5 min-h-0 overflow-hidden rounded-2xl border border-transparent",
  "shadow-md transition-shadow motion-safe:hover:shadow-xl",
  programSubgridCardWidthClass,
);

const MATERIALS_IMAGE = {
  imageSrc: "/brand/young-learners-encyclopedia.png",
  imageAlt: "Cover of Barya to Blockchain: Young Learners Encyclopedia",
} as const;

const MATERIALS_TITLE = "Barya to Blockchain: Young Learners Encyclopedia" as const;

/** Same cover art; carousel swaps supporting lines only. */
const MATERIALS_SLIDES = [
  {
    bullets: ["Web3 activity books and resources for kids"] as const,
  },
  {
    bullets: ["Coloring, storytelling, and digital safety handouts"] as const,
  },
] as const;

function ProgramMaterialsCarouselCard({ id, staticTiltClassName }: { id: string; staticTiltClassName: string }) {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  const active = MATERIALS_SLIDES[current] ?? MATERIALS_SLIDES[0];
  const textTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      id={id}
      className={cn("transform-3d flex min-w-0 scroll-mt-20 justify-center", staticTiltClassName)}
    >
      <TiltedSurface
        className={programSubcardTiltClass}
        figureClassName="!m-0 w-full !max-w-none"
        containerHeight="auto"
        containerWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}
      >
        <div className="absolute inset-0 z-0 min-h-0">
          <div className="relative h-full w-full min-h-0">
            <Image
              src={MATERIALS_IMAGE.imageSrc}
              alt={MATERIALS_IMAGE.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-[#120618]/90 via-[#120618]/40 to-[#120618]/10"
          aria-hidden
        />
        <p className="sr-only" aria-live="polite">
          Book {current + 1} of {MATERIALS_SLIDES.length}
        </p>
        <div className="absolute inset-0 z-2 flex min-h-0 flex-col justify-end p-4 sm:p-5">
          <div className="pointer-events-none min-w-0">
            <h3 className="text-base font-bold leading-snug text-white drop-shadow-sm sm:text-lg md:text-xl">
              {MATERIALS_TITLE}
            </h3>
            <motion.div
              key={current}
              className="min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={textTransition}
            >
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-white/90 marker:text-(--primary) sm:text-[0.9375rem]">
                {active.bullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </motion.div>
          </div>
          <nav
            className="pointer-events-auto mt-4 flex items-center justify-center gap-1.5 sm:mt-5"
            aria-label="Book slides"
          >
            {MATERIALS_SLIDES.map((_, i) => {
              const isActive = i === current;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`${isActive ? "Current slide: " : "Go to slide "}${i + 1} of ${MATERIALS_SLIDES.length}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full p-0",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80",
                    "motion-reduce:transition-none",
                  )}
                >
                  <span
                    className={cn(
                      "block h-2 rounded-full transition-all duration-300 ease-out",
                      isActive
                        ? "w-6 bg-(--primary) shadow-[0_0_10px_rgba(151,28,230,0.5)]"
                        : "w-2 bg-white/50 hover:bg-white/75",
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </TiltedSurface>
    </div>
  );
}

function ProgramSpotlightCard({
  id,
  staticTiltClassName,
  imageSrc,
  imageAlt,
  priority = false,
  children,
}: {
  id: string;
  staticTiltClassName: string;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn("transform-3d flex min-w-0 scroll-mt-20 justify-center", staticTiltClassName)}
    >
      <TiltedSurface
        className={programSubcardTiltClass}
        figureClassName="!m-0 w-full !max-w-none"
        containerHeight="auto"
        containerWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}
      >
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority={priority}
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#120618]/95 via-[#120618]/40 to-[#120618]/15"
          aria-hidden
        />
        <div className="absolute inset-0 z-[2] flex min-h-0 flex-col justify-end p-4 sm:p-5">{children}</div>
      </TiltedSurface>
    </div>
  );
}

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
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <h3 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
              Learning resources &amp; scholar support
            </h3>
            <p className="mt-3 text-[var(--text-muted)] sm:text-base">
              Printed and digital materials for young learners, plus the Adopt-a-Child Iskolar Program
              for ongoing educational assistance.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-3 md:perspective-[1000px]">
            <ProgramMaterialsCarouselCard id="materials" staticTiltClassName="md:transform-[rotateY(20deg)]" />
            <ProgramSpotlightCard
              id="acis"
              staticTiltClassName="md:transform-[rotateY(-20deg)]"
              imageSrc="/brand/photos/why.jpg"
              imageAlt="Adopt-a-Child Iskolar Program — students supported with educational assistance and supplies"
            >
              <h3 className="text-base font-bold text-white drop-shadow-sm sm:text-lg md:text-xl">
                Adopt-a-Child Iskolar Program (ACIS)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-[0.9375rem]">
                Monthly support, school supplies, and Mini-Library access for selected scholars (up to{" "}
                <span className="font-semibold text-white">5 students</span> per area).
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex shrink-0 self-start rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--primary-hover)] sm:mt-5"
              >
                Support ACIS Scholars
              </a>
            </ProgramSpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}

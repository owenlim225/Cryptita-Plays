"use client";

import type { ReactNode } from "react";

import BorderGlow from "@/components/BorderGlow";
import CountUp from "@/components/CountUp";
import { Magnet } from "@/components/ui/magnet";

const summaryCards: { title: string; copy: ReactNode; cta: string }[] = [
  {
    title: "Our Commitments",
    copy:
      "We enable Web3 as a driver of social transformation by making education and research accessible to all, and advancing global solutions for local humanitarian impact.",
    cta: "Learn More",
  },
  {
    title: "Our Impact",
    copy: (
      <>
        To date, we have helped over{" "}
        <CountUp
          from={0}
          to={2}
          direction="up"
          duration={1.2}
          className="count-up-text font-semibold text-foreground tabular-nums"
          separator=""
        />{" "}
        million people in more than{" "}
        <CountUp
          from={0}
          to={54}
          direction="up"
          duration={1.2}
          className="count-up-text font-semibold text-foreground tabular-nums"
          separator=""
        />{" "}
        countries by committing over $
        <CountUp
          from={0}
          to={23}
          direction="up"
          duration={1.2}
          className="count-up-text font-semibold text-foreground tabular-nums"
          separator=""
        />{" "}
        million to fund{" "}
        <CountUp
          from={0}
          to={32}
          direction="up"
          duration={1.2}
          className="count-up-text font-semibold text-foreground tabular-nums"
          separator=""
        />{" "}
        projects.
      </>
    ),
    cta: "Learn More",
  },
];

function SummaryCard({ title, copy, cta }: { title: string; copy: ReactNode; cta: string }) {
  return (
    <Magnet
      magnetStrength={9}
      padding={48}
      wrapperClassName="h-full w-full !block min-h-0"
      innerClassName="h-full min-h-0 w-full"
    >
      <BorderGlow
        className="h-full min-h-0 rounded-2xl"
        edgeSensitivity={34}
        glowColor="276 95 74"
        backgroundColor="#f8f4ff"
        borderRadius={18}
        glowRadius={22}
        glowIntensity={0.7}
        coneSpread={22}
        colors={["#a855f7", "#c084fc", "#7c3aed"]}
        fillOpacity={0.2}
      >
        <article className="flex h-full min-h-0 flex-col rounded-2xl border border-(--border-subtle)/80 bg-white px-5 py-5 shadow-[0_10px_26px_rgba(105,65,198,0.10)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="relative mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-(--primary)/10"
              >
                <span className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-(--primary)/55" />
                <span className="h-2 w-5 rounded bg-(--primary)" />
              </span>
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
            </div>
            <a
              href="#about"
              className="shrink-0 text-sm font-semibold text-(--primary) transition hover:text-(--primary-hover)"
            >
              {cta}
            </a>
          </div>
          <p className="mt-3 flex-1 text-sm leading-6 text-(--text-muted)">{copy}</p>
        </article>
      </BorderGlow>
    </Magnet>
  );
}

const approachItems = [
  {
    title: "Direct Giving",
    copy:
      "We transfer support directly to beneficiaries, so more of every donation reaches those who need it most.",
  },
  {
    title: "Transparency",
    copy:
      "We make giving transparent by addressing process inefficiencies and improving accountability across aid delivery.",
  },
  {
    title: "Transformative Tech",
    copy:
      "We repurpose emerging technologies as practical tools for social good and long-term community impact.",
  },
  {
    title: "Research",
    copy:
      "We invest in innovation and research to better understand and support scalable Web3 solutions.",
  },
];

export function ApproachOverviewSection() {
  return (
    <section
      id="approach-overview"
      className="relative -mt-3 overflow-hidden bg-(--surface-alt) py-12 md:py-18"
    >
      <div className="constraint-content relative z-10 w-full">
        <div className="grid gap-4 md:grid-cols-2">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} title={card.title} copy={card.copy} cta={card.cta} />
          ))}
        </div>

        <aside className="relative mx-auto mt-6 flex w-full max-w-[673px] flex-wrap items-center justify-center gap-12 p-10 text-center">
            <div className="flex shrink-0 flex-col items-center justify-center text-center">
              <p className="text-2xl font-extrabold tracking-tight text-(--primary)">
                <CountUp
                  from={0}
                  to={8}
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  separator=","
                />
              </p>
              <p className="mt-1 text-2xl font-medium text-(--text-muted)">Years of Service</p>
            </div>
            <div className="flex shrink-0 flex-col items-center justify-center text-center">
              <p className="text-2xl font-extrabold tracking-tight text-(--primary)">
                <CountUp
                  from={0}
                  to={10_000}
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  separator=","
                />
              </p>
              <p className="mt-1 text-2xl font-medium text-(--text-muted)">Beneficiaries</p>
            </div>
            <div className="flex shrink-0 flex-col items-center justify-center text-center">
              <p className="text-2xl font-extrabold tracking-tight text-(--primary)">
                <CountUp
                  from={0}
                  to={500}
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  separator=","
                />{" "}
                +
              </p>
              <p className="mt-1 text-2xl font-medium text-(--text-muted)">Events held</p>
            </div>
          </aside>
      </div>
    </section>
  );
}

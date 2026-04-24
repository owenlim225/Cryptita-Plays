"use client";

import BorderGlow from "@/components/BorderGlow";

const summaryCards = [
  {
    title: "Our Commitments",
    copy:
      "We enable Web3 as a driver of social transformation by making education and research accessible to all, and advancing global solutions for local humanitarian impact.",
    cta: "Learn More",
  },
  {
    title: "Our Impact",
    copy:
      "To date, we have helped over 2 million people in more than 54 countries by committing over $23 million to fund 32 projects.",
    cta: "Learn More",
  },
];

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
    <section id="approach-overview" className="bg-(--surface-alt) py-14 md:py-18">
      <div className="constraint-content w-full">
        <div className="grid gap-4 md:grid-cols-2">
          {summaryCards.map((card) => (
            <BorderGlow
              key={card.title}
              className="rounded-2xl"
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
              <article className="rounded-2xl border border-(--border-subtle)/80 bg-white px-5 py-5 shadow-[0_10px_26px_rgba(105,65,198,0.10)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="relative mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-(--primary)/10"
                    >
                      <span className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-(--primary)/55" />
                      <span className="h-2 w-5 rounded bg-(--primary)" />
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                  </div>
                  <a
                    href="#about"
                    className="shrink-0 text-sm font-semibold text-(--primary) transition hover:text-(--primary-hover)"
                  >
                    {card.cta}
                  </a>
                </div>
                <p className="mt-3 text-sm leading-6 text-(--text-muted)">{card.copy}</p>
              </article>
            </BorderGlow>
          ))}
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="relative flex min-h-[300px] items-center justify-center rounded-full border border-(--primary)/20 bg-white p-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_14px_36px_rgba(105,65,198,0.08)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgb(151_28_230/0.16),transparent_56%),radial-gradient(circle_at_70%_75%,rgb(151_28_230/0.10),transparent_52%)]"
            />
            <div className="space-y-7">
              <div>
                <p className="text-5xl font-extrabold tracking-tight text-(--primary)">2,085,823</p>
                <p className="mt-2 text-sm text-(--text-muted)">Total Beneficiaries</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold tracking-tight text-(--primary)">12,453</p>
                <p className="mt-2 text-sm text-(--text-muted)">Amount Donations</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold tracking-tight text-(--primary)">1,524 BTC</p>
                <p className="mt-2 text-sm text-(--text-muted)">Bitcoin Donations Raised</p>
              </div>
            </div>
          </aside>

          <div className="rounded-2xl border border-(--border-subtle) bg-white p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-4xl font-bold tracking-tight text-foreground">Our Approach</h2>
              <a
                href="#contact"
                className="rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold text-white transition hover:bg-(--primary-hover)"
              >
                Donate Now
              </a>
            </div>
            <div className="mt-2 h-0.5 w-20 rounded-full bg-(--primary)/60" />
            <div className="mt-4 h-px w-full bg-(--border-subtle)" />
            <div className="mt-6 grid gap-7 md:grid-cols-2">
              {approachItems.map((item) => (
                <article key={item.title}>
                  <h3 className="text-[1.65rem] font-bold leading-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-(--text-muted)">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

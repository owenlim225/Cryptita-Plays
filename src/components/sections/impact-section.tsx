import { impactStatements } from "../site-data";

export function ImpactSection() {
  return (
    <section id="impact" className="py-20">
      <div className="constraint-content w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">Impact</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStatements.map((statement) => (
            <article
              key={statement}
              className="impact-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--primary-soft)] p-6"
            >
              <p className="text-lg font-semibold leading-8 text-[var(--foreground)]">{statement}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-lg font-medium text-[var(--text-muted)]">
          Different ecosystems, one shared mission.
        </p>
      </div>
    </section>
  );
}

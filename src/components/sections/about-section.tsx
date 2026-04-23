import { siteConfig } from "../site-data";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">Who We Are</h2>
        <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">{siteConfig.mission}</p>
      </div>
      <div id="problem" className="mx-auto mt-14 w-full max-w-5xl rounded-2xl bg-[var(--surface-alt)] p-8">
        <h3 className="text-2xl font-bold text-[var(--foreground)]">The Problem</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
          <li>Limited access to quality educational resources.</li>
          <li>Limited digital literacy and Web3 awareness.</li>
          <li>High exposure to misinformation and online risks.</li>
          <li>Financial constraints that disrupt school continuity.</li>
        </ul>
      </div>
      <div id="approach" className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-[var(--border-subtle)] bg-white p-8">
        <h3 className="text-2xl font-bold text-[var(--foreground)]">Our Approach</h3>
        <p className="mt-4 text-[var(--text-muted)]">
          We combine traditional and digital learning methods including books, storytelling,
          workshops, and simplified Web3 materials to keep learning beginner-friendly, safe,
          and community-based.
        </p>
      </div>
    </section>
  );
}

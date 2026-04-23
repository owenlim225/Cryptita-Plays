export function FaqSection() {
  return (
    <section id="next" className="py-20">
      <div className="constraint-content relative z-10">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">What&apos;s Next</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">
            We continue expanding safe and beginner-friendly learning access through Mini-Libraries,
            educational materials, and community-led partnerships that sustain long-term support.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
            <li>Expand Mini-Library communities with sustained resource support.</li>
            <li>Strengthen local and ecosystem collaborations for education initiatives.</li>
            <li>Support more students through the ACIS coverage model.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

import { siteConfig } from "../site-data";

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-slate-900">About Cryptita Plays</h2>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          {siteConfig.name} is a one-page giving hub where digital communities contribute to
          community-first programs. We combine clear storytelling, measurable milestones, and
          trusted local collaborations.
        </p>
      </div>
    </section>
  );
}

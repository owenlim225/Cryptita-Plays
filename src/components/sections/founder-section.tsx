import { founder } from "../site-data";

export function FounderSection() {
  return (
    <section id="founder" className="bg-amber-50 px-6 py-20">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900">Founder Message</h2>
        <blockquote className="mt-6 rounded-2xl border border-amber-200 bg-white p-8 text-lg leading-8 text-slate-700">
          <span aria-hidden>&ldquo;</span>
          {founder.bio}
          <span aria-hidden>&rdquo;</span>
          <footer className="mt-6 text-base font-semibold text-slate-900">{founder.name}</footer>
        </blockquote>
      </div>
    </section>
  );
}

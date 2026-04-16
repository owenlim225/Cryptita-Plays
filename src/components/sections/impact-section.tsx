import { impactStats } from "../site-data";

export function ImpactSection() {
  return (
    <section id="impact" className="px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900">Impact Snapshot</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((item) => (
            <article key={item.label} className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
              <p className="text-3xl font-black text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-600">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

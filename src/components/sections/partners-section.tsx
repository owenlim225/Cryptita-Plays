import { partners } from "../site-data";

export function PartnersSection() {
  return (
    <section id="partners" className="px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900">Partners</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <article
              key={partner}
              className="rounded-xl border border-slate-200 bg-white p-5 text-center font-semibold text-slate-700 shadow-sm"
            >
              {partner}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

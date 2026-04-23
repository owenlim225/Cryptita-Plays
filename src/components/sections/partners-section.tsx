import Image from "next/image";
import { communityPartners, educationalPartners } from "../site-data";

export function PartnersSection() {
  return (
    <section id="partners" className="px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">Partners and Collaborators</h2>
        <p className="mt-4 text-[var(--text-muted)]">Supported by and working together with:</p>
        <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
          Educational Partners
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {educationalPartners.map((partner) => (
            <article
              key={partner.name}
              className="flex min-h-[116px] items-center justify-center rounded-xl border border-[var(--primary)] bg-[var(--primary)] p-5 text-center shadow-sm"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={52}
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </article>
          ))}
        </div>
        <h3 className="mt-10 text-sm font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
          Community Partners
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {communityPartners.map((partner) => (
            <article
              key={partner.name}
              className="flex min-h-[116px] items-center justify-center rounded-xl border border-[var(--primary)] bg-[var(--primary)] p-5 text-center shadow-sm"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={52}
                  className="h-11 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="text-sm font-semibold text-white">{partner.name}</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

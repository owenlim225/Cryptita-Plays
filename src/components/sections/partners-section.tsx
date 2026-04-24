import Image from "next/image";
import { communityPartners, educationalPartners } from "../site-data";

export function PartnersSection() {
  const partnerCardClassName =
    "group flex min-h-[116px] cursor-pointer items-center justify-center rounded-xl border border-[var(--primary)] bg-transparent p-5 text-center shadow-sm transition-colors duration-300 hover:bg-[var(--primary)]/5";
  const educationalPartnerLogoClassName = "h-11 w-auto max-w-[200px] object-contain";
  const communityPartnerLogoClassName =
    "h-11 w-auto object-contain grayscale brightness-0 transition duration-300 group-hover:grayscale-0 group-hover:brightness-100";

  return (
    <section id="partners" className="py-20">
      <div className="constraint-content relative z-10">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">Partners and Collaborators</h2>
        <p className="mt-4 text-[var(--text-muted)]">Supported by and working together with:</p>
        <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
          Educational Partners
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {educationalPartners.map((partner) => (
            <article
              key={partner.name}
              className={partnerCardClassName}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={52}
                className={educationalPartnerLogoClassName}
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
              className={partnerCardClassName}
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={52}
                  className={communityPartnerLogoClassName}
                />
              ) : (
                <span className="text-sm font-semibold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--primary)]">
                  {partner.name}
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

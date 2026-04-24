import Image from "next/image";
import { educationalPartners } from "../site-data";

const headingId = "educational-partners-strip-heading";

export function EducationalPartnersStrip() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-950 py-16"
      aria-labelledby={headingId}
    >
      <div className="constraint-content relative z-10 w-full">
        <h2
          id={headingId}
          className="text-center text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 sm:text-sm"
        >
          Our educational partners
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {educationalPartners.map((partner) => (
            <div
              key={partner.name}
              className="group flex h-11 shrink-0 items-center justify-center px-2"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={52}
                className="h-9 w-auto max-w-[140px] object-contain brightness-0 invert opacity-90 transition-[filter,opacity] duration-300 ease-out group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(180,100,40,0.28),transparent_65%)]"
        aria-hidden
      />
    </section>
  );
}

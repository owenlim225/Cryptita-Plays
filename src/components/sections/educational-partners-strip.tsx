import { educationalPartners } from "../site-data";
import LogoLoop from "../LogoLoop";

const headingId = "educational-partners-strip-heading";

const educationalPartnerLogos = educationalPartners.map((partner) => ({
  src: partner.logo,
  alt: partner.name,
}));

export function EducationalPartnersStrip() {
  return (
    <section
      className="relative overflow-hidden py-20"
      aria-labelledby={headingId}
    >
      <div className="constraint-content relative z-10 w-full">
        <h2
          id={headingId}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-sm"
        >
          Our educational partners
        </h2>
        <div className="mt-10 w-full min-h-11">
          <LogoLoop
            logos={educationalPartnerLogos}
            width="100%"
            logoHeight={36}
            gap={40}
            direction="left"
            speed={90}
            pauseOnHover={false}
            ariaLabel="Educational partner logos"
          />
        </div>
      </div>
    </section>
  );
}

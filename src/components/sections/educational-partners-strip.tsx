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
      className="overflow-hidden border-t border-(--border-subtle) bg-background/90"
      aria-labelledby={headingId}
    >
      <div className="constraint-content w-full px-(--constraint-divider-nested-pad) pt-10 pb-16 sm:pt-12 sm:pb-20">
        <h2
          id={headingId}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-sm"
        >
          Our educational partners
        </h2>
        <div className="mt-6 w-full min-h-12 sm:mt-8">
          <LogoLoop
            logos={educationalPartnerLogos}
            width="100%"
            logoHeight={44}
            gap={56}
            direction="left"
            speed={58}
            pauseOnHover={false}
            ariaLabel="Educational partner logos"
          />
        </div>
      </div>
      <div
        className="h-px w-full shrink-0 bg-[linear-gradient(90deg,transparent_0%,var(--constraint-stroke)_50%,transparent_100%)]"
        aria-hidden
      />
    </section>
  );
}

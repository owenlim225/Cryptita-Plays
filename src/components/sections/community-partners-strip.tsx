import { communityPartners } from "../site-data";
import LogoLoop from "../LogoLoop";

const headingId = "community-partners-strip-heading";

const communityPartnerLogos = communityPartners.map((partner) =>
  partner.logo
    ? {
        src: partner.logo,
        alt: partner.name,
      }
    : {
        node: (
          <span className="rounded-full border border-(--primary)/40 bg-white/70 px-4 py-2 text-xs font-semibold text-foreground">
            {partner.name}
          </span>
        ),
        ariaLabel: partner.name,
      }
);

export function CommunityPartnersStrip() {
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
          Our community partners
        </h2>
        <div className="mt-6 w-full min-h-12 sm:mt-8">
          <LogoLoop
            logos={communityPartnerLogos}
            width="100%"
            logoHeight={44}
            gap={56}
            direction="right"
            speed={58}
            pauseOnHover={false}
            ariaLabel="Community partner logos"
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

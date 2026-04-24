import { communityPartners } from "@/features/home/data/content";
import LogoLoop from "../LogoLoop";

const headingId = "community-partners-strip-heading";

/** Public URL base for `public/brand/partners/community/` (Next.js serves from `/`). */
const COMMUNITY_PARTNER_LOGO_BASE = "/brand/partners/community";

const communityPartnerLogos = communityPartners.map((partner) => {
  if (partner.logo) {
    const filename = partner.logo.replace(/^.*\//, "");
    return {
      src: `${COMMUNITY_PARTNER_LOGO_BASE}/${filename}`,
      alt: partner.name,
    };
  }
  return {
    node: (
      <span className="rounded-full border border-(--primary)/40 bg-white/70 px-4 py-2 text-xs font-semibold text-foreground">
        {partner.name}
      </span>
    ),
    ariaLabel: partner.name,
  };
});

export function CommunityPartnersStrip() {
  return (
    <section
      className="overflow-hidden border-t border-(--border-subtle) bg-background"
      aria-labelledby={headingId}
    >
      <div className="constraint-content w-full px-(--constraint-divider-nested-pad) pt-10 pb-16 sm:pt-12 sm:pb-20">
        <h2
          id={headingId}
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-sm"
        >
          Our community partners
        </h2>
        <div className="mt-6 w-full min-h-12 translate-y-1.5 sm:mt-8 sm:translate-y-2">
          <LogoLoop
            logos={communityPartnerLogos}
            className="[&_img]:filter-none [&_img]:[image-rendering:auto]"
            width="100%"
            logoHeight={44}
            gap={56}
            direction="right"
            speed={58}
            pauseOnHover={false}
            fadeOut={false}
            scaleOnHover={false}
            ariaLabel="Community partner logos"
          />
        </div>
      </div>
    </section>
  );
}

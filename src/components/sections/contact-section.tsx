import { siteConfig } from "../site-data";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--primary)] py-20 text-white">
      <div className="constraint-content relative z-10">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="text-3xl font-bold">Join / Contact</h2>
          <p className="mt-4 text-white/85">
            Partner with us to bring Web3 education to more communities.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="rounded-xl border border-white/30 bg-white/10 p-5"
            >
              <p className="text-sm text-white/75">Email</p>
              <p className="mt-1 font-semibold">{siteConfig.contactEmail}</p>
            </a>
            <div className="rounded-xl border border-white/30 bg-white/10 p-5">
              <p className="text-sm text-white/75">Social</p>
              <p className="mt-1 font-semibold">{siteConfig.socialHandle}</p>
            </div>
            <a
              href={`tel:${siteConfig.phoneNumber}`}
              className="rounded-xl border border-white/30 bg-white/10 p-5"
            >
              <p className="text-sm text-white/75">Phone</p>
              <p className="mt-1 font-semibold">{siteConfig.phoneNumber}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { siteConfig } from "../site-data";

export function ContactSection() {
  return (
    <section id="contact" className="bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="mt-4 text-slate-300">
          Collaborate with us on campaigns, events, or local community impact projects.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="rounded-xl border border-slate-700 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-1 font-semibold">{siteConfig.contactEmail}</p>
          </a>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Social</p>
            <p className="mt-1 font-semibold">{siteConfig.socialHandle}</p>
          </div>
          <a href={`tel:${siteConfig.phoneNumber}`} className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Phone</p>
            <p className="mt-1 font-semibold">{siteConfig.phoneNumber}</p>
          </a>
        </div>
      </div>
    </section>
  );
}

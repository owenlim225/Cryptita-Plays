import Image from "next/image";
import { founder } from "../site-data";

export function FounderSection() {
  return (
    <section id="why" className="bg-[var(--primary-soft)] py-20">
      <div className="constraint-content relative z-10">
        <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative h-72 overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
            <Image
              src="/brand/photos/why.jpg"
              alt="Community learning moment with Cryptita Plays"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[var(--foreground)]">Why We Do This</h2>
            <blockquote className="founder-quote mt-6 rounded-2xl border border-[var(--border-subtle)] bg-white p-8 text-lg leading-8 text-[var(--text-muted)]">
              <span aria-hidden>&ldquo;</span>
              {founder.bio}
              <span aria-hidden>&rdquo;</span>
              <footer className="mt-6 text-base font-semibold text-[var(--foreground)]">{founder.name}</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

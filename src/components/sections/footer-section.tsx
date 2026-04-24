import Image from "next/image";
import { siteConfig } from "../site-data";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-background py-8">
      <div className="constraint-content relative z-10">
        <div className="flex w-full flex-col gap-2 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/long-logo.png"
              alt={siteConfig.name}
              width={170}
              height={32}
              className="h-7 w-auto"
            />
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          </div>
          <p>Education-first, community-based, and built for long-term impact.</p>
        </div>
      </div>
    </footer>
  );
}

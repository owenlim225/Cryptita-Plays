import { siteConfig } from "../site-data";

export function FooterSection() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>Built with purpose for communities that deserve more opportunities.</p>
      </div>
    </footer>
  );
}

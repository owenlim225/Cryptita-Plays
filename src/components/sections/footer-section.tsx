import Image from "next/image";
import Link from "next/link";
import {
  footerContactLinks,
  footerInfoLinks,
  footerSitemapLinks,
  footerSocialLinks,
} from "@/features/shared-content/data/footer";
import { siteConfig } from "@/features/shared-content/data/site-config";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-label="Contact and site links"
      className="border-t border-(--border-subtle) bg-background"
    >
      <div className="constraint-content relative z-10 pt-12 pb-5 md:pt-14">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="space-y-4 md:max-w-sm lg:col-span-3 xl:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/long-logo.png"
                alt={siteConfig.name}
                width={210}
                height={42}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-(--text-muted)">{siteConfig.tagline}</p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex text-sm font-medium text-(--primary) transition hover:text-(--primary-hover)"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <FooterColumn
            title="Sitemap"
            links={footerSitemapLinks}
          />

          <FooterColumn
            title="Information"
            links={footerInfoLinks}
          />

          <FooterColumn
            title="Contact Us"
            links={footerContactLinks}
            externalOnly
          />

          <div>
            <h3 className="mb-4 text-sm font-bold text-(--primary)">Follow us</h3>
            <div className="flex items-center gap-2.5">
              {footerSocialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center text-(--text-muted) transition hover:text-(--primary)"
                >
                  <SocialIcon label={item.label} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-(--border-subtle) pt-5 text-center text-xs text-(--text-muted) md:text-sm">
          Copyright © 2018–{currentYear} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "Twitter") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path
          d="M18.901 3H21l-6.876 7.86L22.5 21h-6.563l-5.137-6.164L5.405 21H3.304l7.353-8.405L1.5 3h6.73l4.644 5.581L18.901 3zm-2.3 16.438h1.164L7.61 4.476H6.36L16.6 19.438z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 7.382a4.618 4.618 0 100 9.236 4.618 4.618 0 000-9.236zm0 7.622A3.007 3.007 0 018.997 12 3.007 3.007 0 0112 8.997 3.007 3.007 0 0115.004 12 3.007 3.007 0 0112 15.004z"
          fill="currentColor"
        />
        <path d="M17.884 7.197a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3c-2.448 0-2.746.01-3.713.051-.957.052-1.615.196-2.18.422a4.311 4.311 0 00-1.595 1.039 4.311 4.311 0 00-1.039 1.594c-.226.566-.37 1.224-.422 2.18C3.011 9.255 3 9.553 3 12s.01 2.746.051 3.713c.042.957.196 1.615.422 2.18.226.597.535 1.091 1.039 1.595.504.504.998.813 1.594 1.039.576.226 1.224.37 2.18.422.957.04 1.266.051 3.714.051s2.746-.01 3.713-.051c.957-.042 1.615-.196 2.18-.422a4.311 4.311 0 001.595-1.039 4.311 4.311 0 001.039-1.594c.226-.576.37-1.224.422-2.18.04-.957.051-1.266.051-3.714s-.01-2.746-.051-3.713c-.042-.957-.196-1.615-.422-2.18a4.312 4.312 0 00-1.039-1.595 4.311 4.311 0 00-1.594-1.039c-.576-.226-1.224-.37-2.18-.422C14.745 3.011 14.447 3 12 3zm0 1.625c2.407 0 2.685.01 3.641.052.874.04 1.358.185 1.666.308.422.165.72.36 1.04.669.318.319.514.617.668 1.039.123.318.267.792.308 1.666.042.946.052 1.234.052 3.641s-.01 2.685-.052 3.641c-.04.874-.185 1.358-.308 1.666-.165.422-.36.72-.669 1.04a2.66 2.66 0 01-1.039.668c-.318.123-.792.267-1.666.308-.946.042-1.234.052-3.641.052s-2.685-.01-3.641-.052c-.874-.04-1.358-.185-1.666-.308a2.911 2.911 0 01-1.04-.669 2.659 2.659 0 01-.668-1.039c-.123-.318-.267-.792-.308-1.666-.042-.946-.052-1.234-.052-3.641s.01-2.685.052-3.641c.04-.874.185-1.358.308-1.666.165-.422.36-.72.669-1.04a2.658 2.658 0 011.039-.668c.318-.123.792-.267 1.666-.308.956-.042 1.234-.052 3.641-.052z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path
          d="M19.663 3H4.327A1.32 1.32 0 003 4.306v15.398C3 20.424 3.597 21 4.327 21h15.336c.74 0 1.337-.576 1.337-1.296V4.306C21 3.586 20.403 3 19.663 3zM8.338 18.346H5.664V9.758h2.674v8.588zM7.001 8.575a1.54 1.54 0 01-1.543-1.543c0-.854.69-1.553 1.543-1.553.854 0 1.553.7 1.553 1.553 0 .854-.7 1.543-1.553 1.543zm11.335 9.771h-2.664V14.17c0-.997-.02-2.283-1.389-2.283-1.388 0-1.604 1.09-1.604 2.211v4.248h-2.664V9.758h2.561v1.172h.03c.36-.679 1.235-1.388 2.531-1.388 2.705 0 3.199 1.78 3.199 4.093v4.711z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path
        d="M20.622 3.743L2.928 10.562c-1.208.517-1.208 1.208-.173 1.467l4.488 1.467 10.53-6.646c.517-.259.949-.172.604.173l-8.545 7.681.087.173-.087-.173-.345 4.66c.432 0 .69-.172.95-.43l2.243-2.159 4.575 3.366c.863.432 1.467.26 1.64-.776l3.02-14.24c.345-1.209-.431-1.727-1.294-1.382z"
        fill="currentColor"
      />
    </svg>
  );
}

type FooterLink = {
  label: string;
  href: string;
};

function FooterColumn({
  title,
  links,
  externalOnly = false,
}: {
  title: string;
  links: FooterLink[];
  externalOnly?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold text-(--primary)">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((item) => {
          const isHttp = item.href.startsWith("http://") || item.href.startsWith("https://");
          const openInNewTab = externalOnly && isHttp;

          return (
            <li key={`${item.label}-${item.href}`}>
              <Link
                href={item.href}
                target={openInNewTab ? "_blank" : undefined}
                rel={openInNewTab ? "noreferrer" : undefined}
                className="text-sm text-(--text-muted) transition hover:text-(--primary)"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import type { FooterLink } from "@/types/content";
import { siteConfig } from "@/features/shared-content/data/site-config";

const mailto = (subject: string) =>
  `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}`;

export const footerSitemapLinks: FooterLink[] = [
  { label: "Who We Are", href: "/#about" },
  { label: "Our Approach", href: "/#approach-overview" },
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
  { label: "Partners", href: "/#partners" },
  { label: "FAQ", href: "/#faq" },
  { label: "Our Story", href: "/our-story" },
];

export const footerInfoLinks: FooterLink[] = [
  { label: "Mission", href: "/#about" },
  { label: "Approach", href: "/#approach-overview" },
  { label: "Impact", href: "/#impact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export const footerContactLinks: FooterLink[] = [
  { label: "General inquiry", href: mailto("General inquiry") },
  { label: "Partnership inquiry", href: mailto("Partnership inquiry") },
  { label: siteConfig.phoneNumber, href: "tel:+639060925761" },
];

export const footerSocialLinks: FooterLink[] = [
  { label: "Twitter", href: "https://x.com/cryptitaplays" },
  { label: "Instagram", href: "https://www.instagram.com/cryptitaplays/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cryptitaplays/" },
  { label: "Telegram", href: "https://t.me/cryptitaplays" },
];

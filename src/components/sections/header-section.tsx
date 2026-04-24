"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "../site-data";

export function HeaderSection() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--border-subtle) bg-background/90 backdrop-blur">
      <div className="constraint-content flex w-full items-center justify-between py-3.5">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/brand/primary-logo.png"
            alt={siteConfig.name}
            width={152}
            height={44}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <nav className="hidden gap-5 text-xs font-medium text-(--text-muted) md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-(--primary)">
              {item.label}
            </Link>
          ))}
        </nav>
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          href="/#contact"
          className="rounded-full bg-(--primary) px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-(--primary-hover)"
        >
          Support Us
        </motion.a>
      </div>
    </header>
  );
}

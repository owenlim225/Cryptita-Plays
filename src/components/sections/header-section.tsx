"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { navItems, siteConfig } from "../site-data";

export function HeaderSection() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="inline-flex items-center">
          <Image
            src="/brand/primary-logo.png"
            alt={siteConfig.name}
            width={152}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </a>
        <nav className="hidden gap-5 text-sm font-medium text-[var(--text-muted)] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[var(--primary)]">
              {item.label}
            </a>
          ))}
        </nav>
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          href="#contact"
          className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-hover)]"
        >
          Join the Cryptita Plays Initiative
        </motion.a>
      </div>
    </header>
  );
}

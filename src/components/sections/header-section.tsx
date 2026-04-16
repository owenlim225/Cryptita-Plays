"use client";

import { motion } from "framer-motion";
import { navItems, siteConfig } from "../site-data";

export function HeaderSection() {
  return (
    <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold tracking-tight text-slate-900">
          {siteConfig.name}
        </a>
        <nav className="hidden gap-5 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-amber-600">
              {item.label}
            </a>
          ))}
        </nav>
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          href="#contact"
          className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm"
        >
          Join Us
        </motion.a>
      </div>
    </header>
  );
}

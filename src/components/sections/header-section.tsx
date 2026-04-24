"use client";

import { Dialog } from "@base-ui/react/dialog";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/features/shared-content/data/navigation";
import { siteConfig } from "@/features/shared-content/data/site-config";

export function HeaderSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-(--border-subtle) bg-background/90 backdrop-blur">
      <div className="constraint-content flex w-full items-center justify-between gap-2 py-3.5">
        <Link href="/" className="inline-flex min-w-0 shrink-0 items-center">
          <Image
            src="/brand/primary-logo.png"
            alt={siteConfig.name}
            width={152}
            height={44}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <nav
          className="hidden flex-1 justify-center gap-5 text-xs font-medium text-(--text-muted) md:flex"
          aria-label="Main"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-(--primary)">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen} modal>
            <Dialog.Trigger
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--border-subtle) text-(--text-muted) transition hover:border-(--primary) hover:text-(--primary) md:hidden"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="size-[1.15rem] shrink-0" aria-hidden />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-300 bg-slate-900/30 backdrop-blur-sm transition-opacity data-ending-style:opacity-0" />
              <Dialog.Popup className="fixed right-0 top-0 z-300 flex h-dvh w-[min(100%,19rem)] flex-col border-l border-(--border-subtle) bg-background p-0 shadow-lg transition-transform duration-200 ease-out data-ending-style:translate-x-4 data-ending-style:opacity-0 data-starting-style:translate-x-4 data-starting-style:opacity-0">
                <div className="flex items-center justify-between border-b border-(--border-subtle) px-4 py-3.5">
                  <Dialog.Title className="text-sm font-bold text-foreground">Menu</Dialog.Title>
                  <Dialog.Close
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-(--text-muted) transition hover:bg-slate-100 hover:text-foreground"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="size-5" aria-hidden />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Site navigation and contact</Dialog.Description>
                <nav
                  className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
                  aria-label="Mobile"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-(--text-muted) transition hover:bg-slate-100 hover:text-(--primary)"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/#contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded-full bg-(--primary) px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-(--primary-hover)"
                  >
                    Support Us
                  </Link>
                </nav>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href="/#contact"
            className="rounded-full bg-(--primary) px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white shadow-sm transition hover:bg-(--primary-hover) sm:px-4"
          >
            Support Us
          </motion.a>
        </div>
      </div>
    </header>
  );
}

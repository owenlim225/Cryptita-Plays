"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { programs } from "@/features/home/data/content";

const HERO_CARDS = programs.slice(0, 3);

/**
 * Framer-style three-up: title stack + full-bleed image with object-contain in an absolute frame.
 */
export function HeroFeatureCards() {
  return (
    <div className="constraint-content relative z-20 mx-auto mt-10 w-full max-w-5xl md:mt-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HERO_CARDS.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col overflow-hidden rounded-2xl border border-(--border-subtle)/80 bg-white/80 shadow-sm backdrop-blur-sm [transform-style:preserve-3d]"
          >
            <div className="space-y-1 px-4 pt-4 text-center [transform:perspective(1200px)]">
              <h3 className="line-clamp-2 text-lg font-bold leading-tight text-(--primary) sm:text-xl">{item.title}</h3>
              <p className="line-clamp-3 text-sm font-semibold leading-snug text-(--text-muted)">{item.description}</p>
            </div>
            <div className="relative mt-3 aspect-[4/3] w-full min-h-40">
              <div className="absolute inset-0 overflow-hidden rounded-b-2xl bg-(--background)">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain object-center p-1"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

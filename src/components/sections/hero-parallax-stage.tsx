"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroParallaxMesh } from "@/components/sections/hero-parallax-mesh";
import { ParallaxScrolling } from "@/components/ui/parallax-scrolling";

gsap.registerPlugin(ScrollTrigger);

type HeroParallaxStageProps = {
  sectionRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

/**
 * Osmo-style parallax (GSAP timeline + yPercent) over AVIF layers, mesh, and exit fade.
 * Parent is `absolute inset-0` in `HeroStage` (`min-h-dvh`).
 */
export function HeroParallaxStage({ sectionRef, className }: HeroParallaxStageProps) {
  const exitOverlayRef = useRef<HTMLDivElement>(null);
  const exitScrollTriggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const exit = exitOverlayRef.current;
    if (!section || !exit) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      if (!section.isConnected) return;
      exitScrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
        onUpdate: (self) => {
          const t = Math.max(0, (self.progress - 0.5) / 0.5);
          exit.style.opacity = String(Math.min(0.4, t * 0.4));
        },
      });
    }, 0);

    return () => {
      window.clearTimeout(timer);
      exitScrollTriggerRef.current?.kill();
      exitScrollTriggerRef.current = null;
      exit.style.opacity = "";
    };
  }, [sectionRef]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 isolate z-0 ${className ?? ""}`}
      data-hero-parallax
      aria-hidden
    >
      <HeroParallaxMesh sectionRef={sectionRef} />
      <ParallaxScrolling sectionRef={sectionRef} className="z-[5]" />

      {/** Top-only scrim for nav / headline contrast — avoid full-bleed gradients that
          paint solid background over the whole hero and hide the layered images. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-12 h-[min(42%,20rem)] bg-linear-to-b from-background/35 to-transparent"
        aria-hidden
      />
      <div
        ref={exitOverlayRef}
        className="pointer-events-none absolute inset-0 z-18 bg-background opacity-0 will-change-[opacity]"
        aria-hidden
      />
    </div>
  );
}

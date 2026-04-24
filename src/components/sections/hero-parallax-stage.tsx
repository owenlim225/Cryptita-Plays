"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroParallaxMesh } from "@/components/sections/hero-parallax-mesh";
import { ParallaxLayerStack } from "@/components/sections/parallax-layer-stack";

gsap.registerPlugin(ScrollTrigger);

type HeroParallaxStageProps = {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * Four AVIF parallax layers (`/parallax/layer_*.avif`) stacked back-to-front, plus mesh
 * gradients and scroll exit fade. Parent should be sized (e.g. `absolute inset-0` in a
 * `min-h-dvh` section) so `h-full` fills the hero.
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
      className={`relative isolate h-full w-full min-h-0 ${className ?? ""}`}
      data-hero-parallax
      aria-hidden
    >
      <HeroParallaxMesh sectionRef={sectionRef} />
      <ParallaxLayerStack sectionRef={sectionRef} className="z-[5]" />

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

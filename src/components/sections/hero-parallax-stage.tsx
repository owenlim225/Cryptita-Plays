"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroParallaxMesh } from "@/components/sections/hero-parallax-mesh";
import { ParallaxLayerStack } from "@/components/sections/parallax-layer-stack";

gsap.registerPlugin(ScrollTrigger);

type HeroParallaxStageProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Base photo + four AVIF layers, gradients, and scroll exit fade into the next section.
 */
export function HeroParallaxStage({ sectionRef }: HeroParallaxStageProps) {
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
      className="relative isolate h-[min(72vh,52rem)] w-full min-h-80"
      data-hero-parallax
      aria-hidden
    >
      <HeroParallaxMesh sectionRef={sectionRef} />
      <ParallaxLayerStack sectionRef={sectionRef} className="z-[5]" />

      <div
        className="pointer-events-none absolute inset-0 z-12 bg-linear-to-b from-(--background)/30 from-0% to-transparent to-18%"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-14 bg-linear-to-b from-transparent from-40% via-(--background)/45 via-72% to-(--background) to-100%"
        aria-hidden
      />
      <div
        ref={exitOverlayRef}
        className="pointer-events-none absolute inset-0 z-18 bg-(--background) opacity-0 will-change-[opacity]"
        aria-hidden
      />
    </div>
  );
}

"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HeroParallaxMeshProps = {
  sectionRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

/**
 * Framer-style atmospheric depth: soft conic orbs + subtle scroll-tied transform (behind photo stack).
 */
export function HeroParallaxMesh({ sectionRef, className }: HeroParallaxMeshProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const group = groupRef.current;
      if (!section || !group) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tween = gsap.fromTo(
        group,
        { rotate: 0, scale: 1 },
        {
          rotate: 4,
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      return () => {
        tween.kill();
      };
    },
    { dependencies: [sectionRef] }
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none ${className ?? ""}`}
      ref={groupRef}
      aria-hidden
    >
      <div
        className="absolute -left-[20%] top-1/2 h-[120%] w-[80%] -translate-y-1/2 mix-blend-soft-light opacity-45"
        style={{
          background: "conic-gradient(from 200deg at 50% 50%, rgb(151 28 230 / 0.35), transparent 60%)",
        }}
      />
      <div
        className="absolute -right-[15%] top-[5%] h-[90%] w-[70%] mix-blend-soft-light opacity-35"
        style={{
          background: "conic-gradient(from 120deg at 40% 40%, rgb(192 132 252 / 0.4), transparent 55%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 blur-3xl mix-blend-multiply opacity-25 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_50%,black,transparent)]"
        style={{
          background: "conic-gradient(from 240deg, rgb(125 60 200 / 0.5), transparent 70%)",
        }}
      />
    </div>
  );
}

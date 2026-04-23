"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AnimatedContentProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
};

export default function AnimatedContent({
  children,
  className,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 0.7,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  ...rest
}: AnimatedContentProps) {

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const axisDistance = reverse ? -distance : distance;
    const fromVars =
      direction === "horizontal"
        ? { x: axisDistance, y: 0 }
        : { x: 0, y: axisDistance };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          ...fromVars,
          opacity: animateOpacity ? initialOpacity : 1,
          scale,
          willChange: "transform, opacity",
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration,
          ease,
          delay,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: el,
            start: `top ${Math.round((1 - threshold) * 100)}%`,
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [animateOpacity, delay, direction, distance, duration, ease, initialOpacity, reverse, scale, threshold]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}

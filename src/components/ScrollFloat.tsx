"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollFloatProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

export default function ScrollFloat({
  children,
  as = "h2",
  className,
  textClassName,
  animationDuration = 0.8,
  ease = "power3.out",
  scrollStart = "top 88%",
  scrollEnd = "top 58%",
  stagger = 0.02,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const isText = typeof children === "string";

  const splitText = useMemo(() => {
    if (!isText || typeof children !== "string") return null;
    return children.split("").map((char, index) => (
      <span className="scroll-float-char inline-block" key={`${char}-${index}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children, isText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const targets = el.querySelectorAll(".scroll-float-char");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 90,
          scaleY: 1.4,
          scaleX: 0.88,
          transformOrigin: "50% 0%",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [animationDuration, ease, scrollEnd, scrollStart, stagger]);

  const Tag = as;

  return (
    <Tag ref={containerRef} className={className}>
      <span className={textClassName}>{isText ? splitText : children}</span>
    </Tag>
  );
}

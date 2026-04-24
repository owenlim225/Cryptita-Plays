"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";
import "./parallax-scrolling.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Back (1) → front (4); yPercent = scroll parallax. offsetYPx = static stagger (20px per layer). */
const LAYERS: {
  id: "1" | "2" | "3" | "4";
  yPercent: number;
  offsetYPx: number;
  src: string;
  alt: string;
}[] = [
  { id: "1", yPercent: 70, offsetYPx: 0, src: "/parallax/layer_1.png", alt: "" },
  { id: "2", yPercent: 55, offsetYPx: 20, src: "/parallax/layer_2.png", alt: "" },
  { id: "3", yPercent: 40, offsetYPx: 40, src: "/parallax/layer_3.png", alt: "" },
  { id: "4", yPercent: 10, offsetYPx: 60, src: "/parallax/layer_4.png", alt: "" },
];

type ParallaxScrollingProps = {
  /** Section that drives scroll range (e.g. hero) — not duplicate Lenis; uses app SmoothScrollProvider. */
  sectionRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

/**
 * Osmo-style multi-layer parallax: one timeline, staggered yPercent, top-anchored artboard.
 * Does not create Lenis (root layout already wires Lenis + ScrollTrigger.update).
 */
export function ParallaxScrolling({ sectionRef, className }: ParallaxScrollingProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const triggerElement = parallaxRef.current?.querySelector("[data-parallax-layers]");
      if (!section || !triggerElement) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const layersSpec = LAYERS;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.45,
        },
      });

      layersSpec.forEach((layerObj, idx) => {
        const targets = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.id}"]`);
        if (targets.length === 0) return;
        tl.to(
          targets,
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });

      const onRefresh = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", onRefresh, { once: true });

      return () => {
        window.removeEventListener("load", onRefresh);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [sectionRef], scope: parallaxRef }
  );

  return (
    <div
      className={cn("parallax parallax--hero-underlay", className)}
      ref={parallaxRef}
    >
      <div className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />
          <div data-parallax-layers className="parallax__layers">
            {LAYERS.map((layer) => (
              <div
                key={layer.id}
                data-parallax-layer={layer.id}
                className="parallax__layer-wrap"
                style={{ paddingTop: layer.offsetYPx }}
              >
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  fill
                  sizes="100vw"
                  className="parallax__layer-img"
                  priority={layer.id === "1"}
                  onLoad={() => {
                    ScrollTrigger.refresh();
                  }}
                />
              </div>
            ))}
          </div>
          <div className="parallax__fade" />
        </div>
      </div>
    </div>
  );
}

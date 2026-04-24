"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";
import layer1 from "../../../public/parallax/layer_1.png";
import layer2 from "../../../public/parallax/layer_2.png";
import layer3 from "../../../public/parallax/layer_3.png";
import layer4 from "../../../public/parallax/layer_4.png";
import "./parallax-scrolling.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Back (1) → front (4), matching `public/parallax/layer_*.png`. yPercent = scroll-driven parallax (scrub, distinct per layer). offsetYPx = static layout nudge. */
const LAYERS: {
  id: "1" | "2" | "3" | "4";
  yPercent: number;
  offsetYPx: number;
  src: StaticImageData;
  alt: string;
}[] = [
  { id: "1", yPercent: 22, offsetYPx: 250, src: layer1, alt: "" },
  { id: "2", yPercent: 42, offsetYPx: 400, src: layer2, alt: "" },
  { id: "3", yPercent: 64, offsetYPx: 500, src: layer3, alt: "" },
  { id: "4", yPercent: 86, offsetYPx: 400, src: layer4, alt: "" },
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
        /* Same scroll range for all; different end yPercent = visible depth / parallax offset per layer. */
        tl.fromTo(
          targets,
          { yPercent: 0 },
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
      className={cn("parallax parallax--hero-underlay w-full min-w-0 max-w-full", className)}
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
              >
                {/** `fill` images ignore padding; static Y offset must live on an inner so GSAP yPercent (outer) still applies. */}
                <div
                  className="parallax__layer-offset"
                  style={{ transform: `translateY(${layer.offsetYPx}px)` }}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef, useCallback, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HERO_BASE_SRC = "/brand/photos/hero.jpg" as const;

/** z: base (back) 5, then layer_1.l..layer_4 (front) 10–40. */
const AVIF_LAYERS = [
  { src: "/parallax/layer_1.avif" as const, z: 10 },
  { src: "/parallax/layer_2.avif" as const, z: 20 },
  { src: "/parallax/layer_3.avif" as const, z: 30 },
  { src: "/parallax/layer_4.avif" as const, z: 40 },
] as const;

/**
 * [base, layer1..4] — base moves least; layer_4 most.
 * Pixel shift end (scrub) for scroll through the section.
 */
const Y_SHIFTS_PX: readonly [number, number, number, number, number] = [
  16, 32, 52, 78, 108,
];

type ParallaxLayerStackProps = {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
};

export function ParallaxLayerStack({ sectionRef, className }: ParallaxLayerStackProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const layer4 = useRef<HTMLDivElement>(null);
  const layerRefs = [baseRef, layer1, layer2, layer3, layer4] as const;

  const onLayerLoadingComplete = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const animates: gsap.core.Tween[] = [];
      for (let i = 0; i < layerRefs.length; i++) {
        const el = layerRefs[i].current;
        if (!el) continue;
        const y = -Y_SHIFTS_PX[i]!;
        const tween = gsap.fromTo(
          el,
          { y: 0 },
          {
            y,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        animates.push(tween);
      }

      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        animates.forEach((t) => t.kill());
      };
    },
    { dependencies: [sectionRef] }
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none ${className ?? ""}`}
      aria-hidden
    >
      <div
        ref={baseRef}
        className="absolute inset-0 will-change-transform bg-(--background)"
        style={{ zIndex: 5 }}
      >
        <Image
          src={HERO_BASE_SRC}
          alt=""
          fill
          className="object-contain object-center"
          sizes="100vw"
          onLoadingComplete={onLayerLoadingComplete}
          priority
        />
      </div>
      {AVIF_LAYERS.map((layer, i) => (
        <div
          key={layer.src}
          ref={layerRefs[i + 1]}
          className="absolute inset-0 will-change-transform bg-(--background)"
          style={{ zIndex: layer.z }}
        >
          <Image
            src={layer.src}
            alt=""
            fill
            className="object-contain object-center"
            sizes="100vw"
            onLoadingComplete={onLayerLoadingComplete}
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}

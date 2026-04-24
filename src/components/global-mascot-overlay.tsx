"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LOGO_SRC = "/brand/primary-logo.png" as const;
const TILT_MAX = 7;
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MAIN_ID = "site-main";
/** Above sticky header (z-40) and other UI; pointer-events still none. */
const OVERLAY_Z = 200;

type Pose = {
  x: string;
  y: string;
  scale: number;
  rotation: number;
  transformOrigin: string;
};

/** End of the intro (p=0.1) must match t=0 in the main path to avoid a jump. */
const INTRO_END = {
  yVh: 20,
  scale: 0.26,
  rotation: 0,
} as const;

/** Scaled up so only ~1/4 of the top of the head is in view; anchored near the crown. */
const HEAD_PEEK = {
  yVh: 47,
  scale: 0.9,
  rotation: -1.1,
} as const;

function getMascotPose(scrollProgress: number): Pose {
  const p = Math.min(1, Math.max(0, scrollProgress));
  if (p <= 0.1) {
    const t = p / 0.1;
    const originY = gsap.utils.interpolate(14, 50, t);
    return {
      x: "0vw",
      y: `${gsap.utils.interpolate(HEAD_PEEK.yVh, INTRO_END.yVh, t)}vh`,
      scale: gsap.utils.interpolate(HEAD_PEEK.scale, INTRO_END.scale, t),
      rotation: gsap.utils.interpolate(HEAD_PEEK.rotation, INTRO_END.rotation, t),
      transformOrigin: `50% ${originY}%`,
    };
  }
  const t = (p - 0.1) / 0.9;
  const x = Math.sin(t * Math.PI * 2) * 32;
  const y = Math.cos(t * Math.PI * 2 * 0.72) * 24 - 4;
  return {
    x: `${x}vw`,
    y: `${y}vh`,
    scale: 0.26 + Math.sin(t * Math.PI) * 0.035,
    rotation: Math.sin(t * Math.PI * 2) * 1.6,
    transformOrigin: "50% 50%",
  };
}

/**
 * Top-level `main` content blocks in DOM order: direct `section` children and
 * each `section` inside a wrapper (e.g. `.constraint-divider`).
 */
function getMainTopSections(root: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (const child of root.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.tagName === "SECTION") {
      out.push(child);
      continue;
    }
    for (const sub of child.children) {
      if (sub instanceof HTMLElement && sub.tagName === "SECTION") {
        out.push(sub);
      }
    }
  }
  return out;
}

function getActiveTopSectionIndex(sections: HTMLElement[], focusYRatio = 0.3): number {
  if (sections.length === 0) return 0;
  const yLine = window.innerHeight * focusYRatio;
  let i = 0;
  for (; i < sections.length; i++) {
    const r = sections[i].getBoundingClientRect();
    if (r.top <= yLine && r.bottom >= yLine) {
      return i;
    }
    if (r.top > yLine) {
      return i > 0 ? i - 1 : 0;
    }
  }
  return sections.length - 1;
}

/**
 * Full-viewport fixed overlay: mascot stays visible, tilts to pointer, moves and
 * shrinks on scroll. Rendered in a document.body portal; does not use pin.
 */
export function GlobalMascotOverlay() {
  const [mounted, setMounted] = useState(false);
  const scrollDrivenRef = useRef<HTMLDivElement>(null);
  const sectionFadeRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined" || window.matchMedia(MOTION_QUERY).matches) {
        return;
      }

      const scrollTarget =
        document.getElementById(MAIN_ID) ?? document.querySelector("main") ?? document.body;
      const scrollEl = scrollDrivenRef.current;
      const fadeTarget = sectionFadeRef.current;
      const tilt = tiltRef.current;
      if (!scrollTarget || !scrollEl || !tilt) return;

      let previousSection = -1;
      let lastFadeTimeline: gsap.core.Timeline | null = null;

      const playSectionCrossfade = () => {
        if (!fadeTarget) return;
        lastFadeTimeline?.kill();
        gsap.set(fadeTarget, { opacity: 1 });
        lastFadeTimeline = gsap.timeline();
        lastFadeTimeline
          .to(fadeTarget, { opacity: 0, duration: 0.22, ease: "power2.in" })
          .to(fadeTarget, { opacity: 1, duration: 0.32, ease: "power2.out" });
      };

      const applyPose = (pose: Pose) => {
        gsap.set(scrollEl, {
          x: pose.x,
          y: pose.y,
          scale: pose.scale,
          rotation: pose.rotation,
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          transformOrigin: pose.transformOrigin,
        });
      };

      const initial = getMascotPose(0);
      applyPose(initial);
      if (fadeTarget) gsap.set(fadeTarget, { opacity: 1 });

      const rotateXTo = gsap.quickTo(tilt, "rotationX", { duration: 0.45, ease: "power3.out" });
      const rotateYTo = gsap.quickTo(tilt, "rotationY", { duration: 0.45, ease: "power3.out" });
      gsap.set(tilt, { transformPerspective: 1000, transformOrigin: "50% 50%" });

      const onPointer = (e: PointerEvent) => {
        if (!tilt.isConnected) return;
        const rect = tilt.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return;
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const nx = (e.clientX - cx) / (rect.width * 0.5);
        const ny = (e.clientY - cy) / (rect.height * 0.5);
        const cxn = Math.max(-1, Math.min(1, nx));
        const cyn = Math.max(-1, Math.min(1, ny));
        rotateXTo(-cyn * TILT_MAX);
        rotateYTo(cxn * TILT_MAX);
      };

      const onLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
      };

      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointercancel", onLeave);
      document.addEventListener("mouseleave", onLeave);

      const st = ScrollTrigger.create({
        trigger: scrollTarget,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          applyPose(getMascotPose(self.progress));
          if (!fadeTarget) return;
          const mainEl = document.getElementById(MAIN_ID) as HTMLElement | null;
          if (!mainEl) return;
          const sections = getMainTopSections(mainEl);
          if (sections.length === 0) return;
          const idx = getActiveTopSectionIndex(sections);
          if (idx !== previousSection) {
            if (previousSection >= 0) {
              playSectionCrossfade();
            }
            previousSection = idx;
          }
        },
      });

      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        lastFadeTimeline?.kill();
        if (fadeTarget) gsap.set(fadeTarget, { clearProps: "opacity" });
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("pointercancel", onLeave);
        document.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("resize", onResize);
        st.kill();
        gsap.set(scrollEl, { clearProps: "transform,transformOrigin" });
        gsap.set(tilt, { clearProps: "transform" });
        rotateXTo(0);
        rotateYTo(0);
      };
    },
    { dependencies: [mounted] }
  );

  const reduced =
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(MOTION_QUERY).matches
      : false;

  if (!mounted) {
    return null;
  }

  const inner = (
    <div
      className="pointer-events-none"
      style={{ position: "fixed", inset: 0, zIndex: OVERLAY_Z, contain: "layout style paint" }}
      aria-hidden
    >
      {reduced ? (
        <div
          className="absolute top-[72%] left-1/2 w-24 max-w-[28vw] -translate-x-1/2 -translate-y-1/2 opacity-95"
        >
          <Image
            src={LOGO_SRC}
            alt=""
            width={120}
            height={120}
            className="h-auto w-full object-contain"
            priority
            sizes="120px"
          />
        </div>
      ) : (
        <div
          ref={scrollDrivenRef}
          className="absolute top-1/2 left-1/2 w-[min(96vw,40rem)] max-w-full will-change-transform"
        >
          <div ref={sectionFadeRef} className="will-change-[opacity]">
            <div
              ref={tiltRef}
              className="[transform-style:preserve-3d] [backface-visibility:hidden]"
            >
              <Image
                src={LOGO_SRC}
                alt=""
                width={640}
                height={640}
                className="h-auto w-full max-w-none select-none object-contain object-top"
                priority
                sizes="(max-width: 640px) 96vw, 40rem"
                onLoad={() => {
                  requestAnimationFrame(() => ScrollTrigger.refresh());
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (typeof document === "undefined") {
    return null;
  }
  return createPortal(inner, document.body);
}

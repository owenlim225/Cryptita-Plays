"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Particles from "@/components/particles";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LOGO_SRC = "/brand/primary-logo.png" as const;
const TILT_MAX = 7;

const motionQuery = "(prefers-reduced-motion: reduce)";

type HeroLogoPinnedStageProps = {
  children: ReactNode;
};

/**
 * Pinned first-screen stage: large logo peeks from below, rises on scroll,
 * subtle tilt toward pointer. Scroll/pin/tilt are skipped when reduced motion
 * is requested; CSS snaps the mark to a calm pose.
 */
export function HeroLogoPinnedStage({ children }: HeroLogoPinnedStageProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollDrivenRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window !== "undefined" && window.matchMedia(motionQuery).matches) return;

    const pin = pinRef.current;
    const scrollEl = scrollDrivenRef.current;
    const tilt = tiltRef.current;
    if (!pin || !scrollEl || !tilt) return;

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
      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, ny));
      rotateXTo(-clampedY * TILT_MAX);
      rotateYTo(clampedX * TILT_MAX);
    };

    const onLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointercancel", onLeave);
    document.addEventListener("mouseleave", onLeave);

    const tween = gsap.fromTo(
      scrollEl,
      {
        y: "40vh",
        scale: 0.84,
        rotation: -1.2,
      },
      {
        y: "-3vh",
        scale: 1.08,
        rotation: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=175%",
          pin: true,
          pinSpacing: true,
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      }
    );

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointercancel", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set([scrollEl, tilt], { clearProps: "transform" });
    };
  }, []);

  return (
    <div className="relative w-full [contain:layout_paint]">
      <div
        ref={pinRef}
        className="relative min-h-dvh min-h-svh w-full overflow-hidden bg-background"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(50vh,28rem)] overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_75%_at_50%_-18%,rgb(200_220_235/0.12),transparent_58%),radial-gradient(ellipse_80%_55%_at_100%_100%,rgb(190_210_225/0.08),transparent_52%),radial-gradient(ellipse_55%_40%_at_0%_88%,rgb(210_224_236/0.09),transparent_48%)]" />
          <div className="absolute inset-0 z-1">
            <Particles
              particleCount={200}
              particleSpread={10}
              speed={0.05}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
              pixelRatio={2}
              className="min-h-full"
            />
          </div>
        </div>

        <div className="constraint-content relative z-20 mx-auto w-full max-w-5xl pt-16 md:pt-20">
          {children}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[min(50vh,32rem)] overflow-hidden"
          aria-hidden
        >
          <div className="absolute bottom-0 left-1/2 w-[min(96vw,40rem)] max-w-full -translate-x-1/2">
            <div
              ref={scrollDrivenRef}
              className="hero-logo-mascot-initial will-change-transform"
            >
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
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-12 h-[50%] max-h-[min(32rem,50vh)] bg-linear-to-t from-(--background) from-0% via-(--background)/45 via-38% to-transparent to-100%"
          aria-hidden
        />
      </div>
    </div>
  );
}

"use client";

import { type RefObject, type ReactNode } from "react";
import Particles from "@/components/particles";
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage";

type HeroStageProps = {
  children: ReactNode;
  sectionRef: RefObject<HTMLDivElement | null>;
};

/** Full-viewport hero: parallax underlay, soft gradients, particles, content column. */
export function HeroStage({ children, sectionRef }: HeroStageProps) {
  return (
    <div className="relative w-full min-w-0 max-w-full">
      <div
        ref={sectionRef}
        className="relative min-h-[max(32rem,56.25vw)] w-full min-w-0 max-w-full overflow-x-clip overflow-y-visible bg-transparent"
      >
        {/** Underlay is inside the same fixed-height box so % / `h-full` chain cannot collapse. */}
        <HeroParallaxStage sectionRef={sectionRef} />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(50%,16rem)] overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_75%_at_50%_-18%,rgb(200_220_235/0.12),transparent_58%),radial-gradient(ellipse_80%_55%_at_100%_100%,rgb(190_210_225/0.08),transparent_52%),radial-gradient(ellipse_55%_40%_at_0%_88%,rgb(210_224_236/0.09),transparent_48%)]" />
          <div className="absolute inset-0 z-1 origin-top scale-125 will-change-transform">
            <Particles
              particleCount={200}
              particleSpread={10}
              speed={0.05}
              particleBaseSize={128}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
              pixelRatio={2}
              className="min-h-full w-full"
            />
          </div>
        </div>

        <div className="constraint-content relative z-20 mx-auto w-full max-w-5xl pt-[max(4rem,env(safe-area-inset-top,0px)+2.75rem)] pb-10 md:pt-[max(5rem,env(safe-area-inset-top,0px)+2.5rem)] md:pb-14">
          {children}
        </div>
      </div>
    </div>
  );
}

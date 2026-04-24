"use client";

import { useRef } from "react";
import Image from "next/image";
import { HeroFeatureCards } from "@/components/sections/hero-feature-cards";
import { HeroParallaxStage } from "@/components/sections/hero-parallax-stage";
import Particles from "@/components/particles";
import ShinyText from "@/components/shiny-text";
import SplitText from "@/components/split-text";
import { siteConfig } from "@/features/shared-content/data/site-config";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden bg-background pb-0 pt-16 md:pt-20"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(50vh,28rem)] overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_110%_75%_at_50%_-18%,rgb(200_220_235_/_0.12),transparent_58%),radial-gradient(ellipse_80%_55%_at_100%_100%,rgb(190_210_225_/_0.08),transparent_52%),radial-gradient(ellipse_55%_40%_at_0%_88%,rgb(210_224_236_/_0.09),transparent_48%)]"
        />
        <div className="absolute inset-0 z-[1]">
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

      <div className="constraint-content relative z-20 mx-auto w-full max-w-5xl">
        <div className="flex min-w-0 flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2.5">
            <Image
              src="/brand/icon-mark.ico"
              alt=""
              width={20}
              height={20}
              className="size-4 shrink-0 object-contain"
              aria-hidden
            />
            <SplitText
              text="Community-driven initiative"
              tag="p"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-muted)"
              splitType="words"
              delay={40}
              duration={0.55}
              ease="power3.out"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
            />
          </div>
          <h1 className="mt-3 w-full text-center text-3xl font-black leading-tight tracking-tight sm:text-4xl sm:leading-tight">
            <ShinyText
              text={siteConfig.tagline}
              className="max-w-full text-balance"
              color="#5b1a9e"
              shineColor="#e9d5ff"
              speed={2.4}
              delay={0.35}
              spread={110}
              direction="left"
            />
          </h1>
          <SplitText
            text={siteConfig.mission}
            tag="p"
            className="mt-5 max-w-xl text-base leading-7 text-(--text-muted)"
            splitType="words"
            delay={28}
            duration={0.5}
            ease="power3.out"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#programs"
              className="rounded-full bg-(--primary) px-5 py-2.5 text-sm text-white transition hover:bg-(--primary-hover)"
            >
              Sponsor
            </a>
            <a
              href="#contact"
              className="rounded-full border border-(--border-subtle) px-5 py-2.5 text-sm text-(--text-muted) transition hover:border-(--primary) hover:text-(--primary)"
            >
              Volunteer
            </a>
          </div>
        </div>
      </div>

      <HeroFeatureCards />

      <div className="relative z-10 mt-6 w-full md:mt-8">
        <HeroParallaxStage sectionRef={sectionRef} />
      </div>
    </section>
  );
}

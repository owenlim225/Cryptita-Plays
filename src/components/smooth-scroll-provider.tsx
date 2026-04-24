"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

/**
 * Defer init to the next task so no GSAP/ScrollTrigger inline styles land on
 * the DOM in the same tick as React hydration, which can otherwise warn on the
 * programs/impact (and other) nodes.
 */
function scheduleAfterHydration(callback: () => void) {
  return window.setTimeout(callback, 0);
}

type ScrollRuntime = {
  context: ReturnType<typeof gsap.context>;
  lenis: InstanceType<typeof Lenis>;
  onLenisScroll: () => void;
  tickerCallback: (time: number) => void;
  /** Browser timer id from `window.setTimeout` */
  timer: number | null;
  cancelled: boolean;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const runtime: Partial<ScrollRuntime> = { timer: null, cancelled: false };
    const timer = scheduleAfterHydration(() => {
      if (runtime.cancelled) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.05,
        wheelMultiplier: 0.8,
        syncTouch: true,
        anchors: true,
      });

      const onLenisScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onLenisScroll);

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        const programsSection = document.querySelector("#programs");
        const programsGrid = document.querySelector("#programs .programs-grid");
        if (programsSection && programsGrid) {
          gsap.fromTo(
            programsGrid,
            { opacity: 0.55, scale: 0.96 },
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: programsSection,
                start: "top 80%",
                end: "bottom 55%",
                scrub: true,
              },
            }
          );
        }

        const impactSection = document.querySelector("#impact");
        const impactCards = gsap.utils.toArray<HTMLElement>("#impact .impact-card");
        if (impactSection && impactCards.length > 0) {
          impactCards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0.45, scale: 0.92, y: 24 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  end: "top 52%",
                  scrub: true,
                },
              }
            );
          });
        }

        const eventsSection = document.querySelector("#events");
        const eventsHeading = document.querySelector("#events .events-heading");
        if (eventsSection && eventsHeading) {
          ScrollTrigger.create({
            trigger: eventsSection,
            start: "top top+=72",
            end: "bottom top+=72",
            pin: eventsHeading,
            pinSpacing: false,
          });
        }

        const eventCards = gsap.utils.toArray<HTMLElement>("#events .event-card");
        eventCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.4, scale: 0.94, y: 28 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        });

        const founderSection = document.querySelector("#founder");
        const founderQuote = document.querySelector("#founder .founder-quote");
        if (founderSection && founderQuote) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: founderSection,
                start: "top top+=72",
                end: "+=65%",
                scrub: true,
                pin: founderQuote,
              },
            })
            .fromTo(
              founderQuote,
              { opacity: 0.86, scale: 0.96 },
              { opacity: 1, scale: 1, ease: "none" }
            );
        }
      });

      runtime.context = context;
      runtime.lenis = lenis;
      runtime.onLenisScroll = onLenisScroll;
      runtime.tickerCallback = tickerCallback;

      ScrollTrigger.refresh();
    });
    runtime.timer = timer;

    return () => {
      runtime.cancelled = true;
      if (runtime.timer) window.clearTimeout(runtime.timer);
      runtime.context?.revert();
      if (runtime.tickerCallback) {
        gsap.ticker.remove(runtime.tickerCallback);
      }
      if (runtime.lenis) {
        if (runtime.onLenisScroll) {
          runtime.lenis.off("scroll", runtime.onLenisScroll);
        }
        runtime.lenis.destroy();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return children;
}

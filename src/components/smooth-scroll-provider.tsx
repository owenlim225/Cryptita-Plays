"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.8,
      // Lenis v1 uses syncTouch; this matches the requested smooth touch behavior.
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
        gsap.timeline({
          scrollTrigger: {
            trigger: founderSection,
            start: "top top+=72",
            end: "+=65%",
            scrub: true,
            pin: founderQuote,
          },
        }).fromTo(
          founderQuote,
          { opacity: 0.86, scale: 0.96 },
          { opacity: 1, scale: 1, ease: "none" }
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return children;
}

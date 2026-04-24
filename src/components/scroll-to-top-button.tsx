"use client";

import { ChevronUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLenis } from "@/components/smooth-scroll-provider";

const SCROLL_REVEAL_PX = 400;

const motionQuery = () =>
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

function getScrollY(lenis: ReturnType<typeof useLenis>): number {
  if (lenis) return lenis.scroll;
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop;
}

export function ScrollToTopButton() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  const updateVisible = useCallback(() => {
    const y = getScrollY(lenis);
    setVisible(y > SCROLL_REVEAL_PX);
  }, [lenis]);

  useEffect(() => {
    updateVisible();
  }, [updateVisible]);

  useEffect(() => {
    if (lenis) {
      lenis.on("scroll", updateVisible);
      return () => {
        lenis.off("scroll", updateVisible);
      };
    }
    window.addEventListener("scroll", updateVisible, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisible);
    };
  }, [lenis, updateVisible]);

  const goTop = useCallback(() => {
    const reduced = motionQuery()?.matches;
    if (lenis) {
      lenis.scrollTo(0, { immediate: Boolean(reduced) });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [lenis]);

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      className={`pointer-events-auto fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-(--primary) text-white shadow-md transition duration-200 hover:bg-(--primary-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary) ${
        visible
          ? "bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] right-[max(1.5rem,env(safe-area-inset-right,0px))] translate-y-0 opacity-100"
          : "pointer-events-none bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] right-[max(1.5rem,env(safe-area-inset-right,0px))] translate-y-2 opacity-0"
      }`}
    >
      <ChevronUp className="h-6 w-6" strokeWidth={2.5} aria-hidden />
    </button>
  );
}

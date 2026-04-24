"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/features/shared-content/data/site-config";

const DEFAULT_MIN_MS = 2000;
const DEFAULT_CROSS_S = 0.55;
const DEFAULT_EXIT_S = 0.5;

const REDUCED_MIN_MS = 300;
const REDUCED_EXIT_S = 0.15;

type SplashTimings = {
  minMs: number;
  crossS: number;
  exitS: number;
  reduced: boolean;
};

function subscribePrefersReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPrefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getServerPrefersReducedMotion(): boolean {
  return false;
}

function makeTimings(reduced: boolean): SplashTimings {
  if (reduced) {
    return {
      minMs: REDUCED_MIN_MS,
      crossS: 0,
      exitS: REDUCED_EXIT_S,
      reduced: true,
    };
  }
  return {
    minMs: DEFAULT_MIN_MS,
    crossS: DEFAULT_CROSS_S,
    exitS: DEFAULT_EXIT_S,
    reduced: false,
  };
}

function waitForWindowLoad(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function minDelay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function PageLoadSplash() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotion,
    getServerPrefersReducedMotion,
  );
  const timings = makeTimings(prefersReducedMotion);

  const [logoPhase, setLogoPhase] = useState<"primary" | "long">("primary");
  const [exitOverlay, setExitOverlay] = useState(false);
  const [gone, setGone] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const runExitAndDismiss = useCallback((exitS: number) => {
    setExitOverlay(true);
    if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
    exitTimerRef.current = window.setTimeout(
      () => {
        exitTimerRef.current = null;
        setGone(true);
      },
      Math.max(0, exitS * 1000) + 32,
    );
  }, []);

  useEffect(() => {
    const t = makeTimings(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    let cancelled = false;
    let crossTimer: ReturnType<typeof window.setTimeout> | null = null;

    void (async () => {
      await Promise.all([waitForWindowLoad(), minDelay(t.minMs)]);
      if (cancelled) return;

      if (t.reduced) {
        setLogoPhase("long");
        window.requestAnimationFrame(() => {
          if (cancelled) return;
          runExitAndDismiss(t.exitS);
        });
        return;
      }

      setLogoPhase("long");
      if (t.crossS > 0) {
        crossTimer = window.setTimeout(() => {
          if (cancelled) return;
          runExitAndDismiss(t.exitS);
        }, t.crossS * 1000);
      } else {
        runExitAndDismiss(t.exitS);
      }
    })();

    return () => {
      cancelled = true;
      if (crossTimer) window.clearTimeout(crossTimer);
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [runExitAndDismiss]);

  if (gone) {
    return null;
  }

  return (
    <motion.div
      className={`fixed inset-0 z-200 flex flex-col items-center justify-center bg-white ${
        exitOverlay ? "pointer-events-none" : "pointer-events-auto"
      }`}
      role="status"
      aria-busy
      initial={{ opacity: 1 }}
      animate={{ opacity: exitOverlay ? 0 : 1 }}
      transition={{ duration: timings.exitS, ease: [0.4, 0, 0.2, 1] }}
      suppressHydrationWarning
    >
      <span
        className="absolute w-px h-px overflow-hidden p-0 -m-px border-0 whitespace-nowrap [clip:rect(0,0,0,0)]"
      >
        Loading {siteConfig.name}
      </span>
      <div
        className="relative flex h-44 w-[min(90vw,320px)] items-center justify-center sm:h-52"
        aria-hidden
        suppressHydrationWarning
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ opacity: logoPhase === "primary" ? 1 : 0 }}
          transition={{ duration: timings.crossS, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src="/brand/primary-logo.png"
            alt=""
            width={256}
            height={256}
            className="h-36 w-auto max-w-full object-contain sm:h-44"
            priority
            sizes="(max-width: 640px) 90vw, 256px"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ opacity: logoPhase === "long" ? 1 : 0 }}
          transition={{ duration: timings.crossS, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src="/brand/long-logo.png"
            alt=""
            width={300}
            height={60}
            className="h-12 w-auto max-w-[min(100%,320px)] object-contain sm:h-14"
            priority
            sizes="(max-width: 640px) 90vw, 300px"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const DOT_SMOOTHNESS = 0.2;
const BORDER_DOT_SMOOTHNESS = 0.1;

const INTERACTIVE_SELECTOR = "a, button, img, input, textarea, select, [role='button']";

/** sRGB relative luminance (0–1). */
function relativeLuminance(r: number, g: number, b: number) {
  const l = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * l[0]! + 0.7152 * l[1]! + 0.0722 * l[2]!;
}

function parseCssColor(value: string): { r: number; g: number; b: number; a: number } | null {
  const t = value.trim().toLowerCase();
  if (t === "transparent" || t === "") return null;
  const m = t.match(
    /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*[/,]\s*([\d.]+))?\s*\)/
  );
  if (!m) return null;
  const a = m[4] !== undefined && m[4] !== "" ? parseFloat(m[4]) : 1;
  return { r: +m[1]!, g: +m[2]!, b: +m[3]!, a };
}

const LUMINANCE_THRESHOLD = 0.5;

/** Resolve stacked backgrounds; returns luminance 0–1, or null to fall back to theme. */
function getBackgroundLuminanceAtPoint(x: number, y: number): number | null {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;

  let node: Element | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const parsed = parseCssColor(bg);
    if (parsed && parsed.a > 0.12) {
      if (parsed.a < 0.5) {
        node = node.parentElement;
        continue;
      }
      return relativeLuminance(parsed.r, parsed.g, parsed.b);
    }
    node = node.parentElement;
  }

  for (const n of [document.body, document.documentElement]) {
    const parsed = parseCssColor(getComputedStyle(n).backgroundColor);
    if (parsed) return relativeLuminance(parsed.r, parsed.g, parsed.b);
  }
  return null;
}

type Position = { x: number; y: number };

/** null = use global light/dark theme; otherwise follow sampled background. */
type CursorContrast = "light" | "dark" | null;

export function SmoothCursorFollower() {
  const mousePosition = useRef<Position>({ x: 0, y: 0 });
  const dotPosition = useRef<Position>({ x: 0, y: 0 });
  const borderDotPosition = useRef<Position>({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  const [renderPos, setRenderPos] = useState({
    dot: { x: 0, y: 0 },
    border: { x: 0, y: 0 },
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [contrast, setContrast] = useState<CursorContrast>(null);
  const lastClient = useRef<Position>({ x: 0, y: 0 });
  const contrastRef = useRef<CursorContrast>(null);

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7282/ingest/c5064a4c-f1b4-4fcd-801c-1edd4355fe1e", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "d9b104" },
      body: JSON.stringify({
        sessionId: "d9b104",
        runId: "pre-fix",
        hypothesisId: "H2_H4",
        location: "smooth-cursor-follower.tsx:26",
        message: "SmoothCursorFollower effect mounted",
        data: {
          interactiveSelector: INTERACTIVE_SELECTOR,
          dotSmoothness: DOT_SMOOTHNESS,
          borderSmoothness: BORDER_DOT_SMOOTHNESS,
          splashCanvasCount: document.querySelectorAll("canvas.pointer-events-none.fixed.inset-0.z-10").length,
          followerNodeCount: document.querySelectorAll("[data-cursor-follower='v2']").length,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateContrast = () => {
      const { x, y } = lastClient.current;
      const L = getBackgroundLuminanceAtPoint(x, y);
      const next: CursorContrast = L === null ? null : L > LUMINANCE_THRESHOLD ? "light" : "dark";
      if (contrastRef.current !== next) {
        contrastRef.current = next;
        setContrast(next);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isVisible) {
        // #region agent log
        fetch("http://127.0.0.1:7282/ingest/c5064a4c-f1b4-4fcd-801c-1edd4355fe1e", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "d9b104" },
          body: JSON.stringify({
            sessionId: "d9b104",
            runId: "pre-fix",
            hypothesisId: "H3",
            location: "smooth-cursor-follower.tsx:52",
            message: "First mousemove toggles follower visibility",
            data: { x: event.clientX, y: event.clientY },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion
        setIsVisible(true);
      }

      lastClient.current = { x: event.clientX, y: event.clientY };
      mousePosition.current = { x: event.clientX, y: event.clientY };
      updateContrast();
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setIsHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const handleMouseOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as Element | null;
      setIsHovering(Boolean(relatedTarget?.closest(INTERACTIVE_SELECTOR)));
    };

    const animate = () => {
      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS);
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS);

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: { x: borderDotPosition.current.x, y: borderDotPosition.current.y },
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", updateContrast, true);
    window.addEventListener("resize", updateContrast);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", updateContrast, true);
      window.removeEventListener("resize", updateContrast);

      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  return (
    <div data-cursor-follower="v2" className="pointer-events-none fixed inset-0 z-100 hidden md:block">
      <div
        className={cn(
          "absolute rounded-full transition-colors duration-150",
          contrast === "light" && "bg-(--primary)",
          contrast === "dark" && "bg-white",
          contrast === null && "bg-(--primary) dark:bg-white",
        )}
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-out, background-color 0.15s ease-out",
        }}
      />

      <div
        className={cn(
          "absolute rounded-full border transition-colors duration-150",
          contrast === "light" && "border-(--primary)",
          contrast === "dark" && "border-white",
          contrast === null && "border-(--primary) dark:border-white",
        )}
        style={{
          width: isHovering ? "44px" : "28px",
          height: isHovering ? "44px" : "28px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s, height 0.3s, opacity 0.2s ease-out, border-color 0.15s ease-out",
        }}
      />
    </div>
  );
}

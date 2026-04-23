"use client";

import { useEffect, useRef, useState } from "react";

const DOT_SMOOTHNESS = 0.2;
const BORDER_DOT_SMOOTHNESS = 0.1;

const INTERACTIVE_SELECTOR = "a, button, img, input, textarea, select, [role='button']";

type Position = { x: number; y: number };

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

      mousePosition.current = { x: event.clientX, y: event.clientY };
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

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);

      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  return (
    <div data-cursor-follower="v2" className="pointer-events-none fixed inset-0 z-100 hidden md:block">
      <div
        className="absolute rounded-full bg-black dark:bg-white"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-out",
        }}
      />

      <div
        className="absolute rounded-full border border-black dark:border-white"
        style={{
          width: isHovering ? "44px" : "28px",
          height: isHovering ? "44px" : "28px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s, height 0.3s, opacity 0.2s ease-out",
        }}
      />
    </div>
  );
}

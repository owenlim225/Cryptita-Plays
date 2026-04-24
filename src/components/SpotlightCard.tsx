"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

import "./SpotlightCard.css";

export type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Radial gradient color for the spotlight; fades to transparent. */
  spotlightColor?: string;
  /**
   * Strips default border, background, and padding. Use a stacked layout:
   * first layer(s) = background plate (z-0), then spotlight sits at z-1, content at z-2+.
   * Render children in order: e.g. `<><div className="absolute inset-0 z-0 …" /><div className="relative z-2 …" /></>`.
   */
  flush?: boolean;
};

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  flush = false,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
    el.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={["card-spotlight", flush && "card-spotlight--flush", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="card-spotlight__glow"
        data-spotlight-glow
        aria-hidden
      />
      {children}
    </div>
  );
}

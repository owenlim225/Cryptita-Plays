"use client";

import { CSSProperties } from "react";

type GradualBlurProps = {
  className?: string;
  target?: "parent";
  position?: "top" | "bottom";
  height?: string;
  strength?: number;
  divCount?: number;
  opacity?: number;
};

export default function GradualBlur({
  className,
  target = "parent",
  position = "bottom",
  height = "6rem",
  strength = 2,
  divCount = 5,
  opacity = 1,
}: GradualBlurProps) {
  const hostClass = target === "parent" ? "absolute inset-x-0 pointer-events-none" : "pointer-events-none";
  const anchorClass = position === "bottom" ? "bottom-0" : "top-0";

  return (
    <div className={`${hostClass} ${anchorClass} ${className ?? ""}`} style={{ height, opacity }} aria-hidden>
      {Array.from({ length: divCount }).map((_, index) => {
        const ratio = (index + 1) / divCount;
        const blur = ratio * strength * 6;
        const stopOpacity = position === "bottom" ? ratio * 0.12 : (1 - ratio) * 0.12;

        const style: CSSProperties = {
          position: "absolute",
          inset: 0,
          backdropFilter: `blur(${blur.toFixed(2)}px)`,
          WebkitBackdropFilter: `blur(${blur.toFixed(2)}px)`,
          maskImage:
            position === "bottom"
              ? `linear-gradient(to top, rgba(0,0,0,${stopOpacity}), transparent ${Math.min(100, ratio * 100)}%)`
              : `linear-gradient(to bottom, rgba(0,0,0,${stopOpacity}), transparent ${Math.min(100, ratio * 100)}%)`,
        };

        return <div key={`gradual-blur-layer-${index}`} style={style} />;
      })}
    </div>
  );
}

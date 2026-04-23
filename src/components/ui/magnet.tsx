"use client";

import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from "react";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  magnetStrength?: number;
  disabled?: boolean;
  wrapperClassName?: string;
  innerClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Magnet({
  children,
  padding = 80,
  magnetStrength = 2.5,
  disabled = false,
  wrapperClassName,
  innerClassName,
  ...props
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const updateInteractivity = () => {
      setIsInteractive(!reduceMotionQuery.matches && !coarsePointerQuery.matches && !disabled);
    };

    updateInteractivity();
    reduceMotionQuery.addEventListener("change", updateInteractivity);
    coarsePointerQuery.addEventListener("change", updateInteractivity);

    return () => {
      reduceMotionQuery.removeEventListener("change", updateInteractivity);
      coarsePointerQuery.removeEventListener("change", updateInteractivity);
    };
  }, [disabled]);

  useEffect(() => {
    if (!isInteractive) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!magnetRef.current) {
        return;
      }

      const rect = magnetRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = Math.abs(centerX - event.clientX);
      const distY = Math.abs(centerY - event.clientY);
      const isWithinRange = distX < rect.width / 2 + padding && distY < rect.height / 2 + padding;

      if (!isWithinRange) {
        setPosition({ x: 0, y: 0 });
        return;
      }

      setPosition({
        x: (event.clientX - centerX) / magnetStrength,
        y: (event.clientY - centerY) / magnetStrength,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInteractive, padding, magnetStrength]);

  return (
    <div ref={magnetRef} className={wrapperClassName} style={{ position: "relative", display: "inline-block" }} {...props}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: position.x === 0 && position.y === 0 ? "transform 0.5s ease-in-out" : "transform 0.25s ease-out",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

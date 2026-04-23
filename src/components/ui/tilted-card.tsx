"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  disabled?: boolean;
};

export function TiltedCard({
  children,
  className,
  scaleOnHover = 1.02,
  rotateAmplitude = 8,
  disabled = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const rotateX = useSpring(0, { stiffness: 120, damping: 20, mass: 0.8 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 20, mass: 0.8 });
  const scale = useSpring(1, { stiffness: 120, damping: 20, mass: 0.8 });

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const updateInteractivity = () => {
      const canInteract = !reduceMotionQuery.matches && !coarsePointerQuery.matches && !disabled;
      setIsInteractive(canInteract);
      if (!canInteract) {
        rotateX.set(0);
        rotateY.set(0);
        scale.set(1);
      }
    };

    updateInteractivity();
    reduceMotionQuery.addEventListener("change", updateInteractivity);
    coarsePointerQuery.addEventListener("change", updateInteractivity);

    return () => {
      reduceMotionQuery.removeEventListener("change", updateInteractivity);
      coarsePointerQuery.removeEventListener("change", updateInteractivity);
    };
  }, [disabled, rotateX, rotateY, scale]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  };

  const handleMouseEnter = () => {
    if (isInteractive) {
      scale.set(scaleOnHover);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div className="relative [perspective:900px]">
      <motion.div
        ref={ref}
        className={className}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}

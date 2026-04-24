import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import "./TiltedCard.css";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

function useTiltInteraction({
  rotateAmplitude,
  scaleOnHover,
  showTooltip,
}: {
  rotateAmplitude: number;
  scaleOnHover: number;
  showTooltip: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    if (showTooltip) {
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    if (showTooltip) opacity.set(1);
  }

  function handleMouseLeave() {
    if (showTooltip) opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return {
    ref,
    x,
    y,
    rotateX,
    rotateY,
    scale,
    opacity,
    rotateFigcaption,
    handleMouse,
    handleMouseEnter,
    handleMouseLeave,
  };
}

export type TiltedSurfaceProps = {
  children: ReactNode;
  className?: string;
  /** Applied to the outer &lt;figure&gt; (perspective, width). */
  figureClassName?: string;
  containerHeight?: string;
  containerWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  captionText?: string;
};

/**
 * Same pointer tilt as TiltedCard, but the transform is applied to the **whole**
 * card surface (use for bordered frames, not only an inner image).
 */
export function TiltedSurface({
  children,
  className = "",
  figureClassName = "",
  containerHeight = "auto",
  containerWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showMobileWarning = true,
  showTooltip = true,
  captionText = "",
}: TiltedSurfaceProps) {
  const { ref, x, y, rotateX, rotateY, scale, opacity, rotateFigcaption, handleMouse, handleMouseEnter, handleMouseLeave } =
    useTiltInteraction({ rotateAmplitude, scaleOnHover, showTooltip });

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure tilted-card-figure--full ${figureClassName}`.trim()}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className={`tilted-card-whole ${className}`.trim()}
        style={{ rotateX, rotateY, scale }}
      >
        {children}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

export type TiltedCardProps = {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const { ref, x, y, rotateX, rotateY, scale, opacity, rotateFigcaption, handleMouse, handleMouseEnter, handleMouseLeave } =
    useTiltInteraction({ rotateAmplitude, scaleOnHover, showTooltip });

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}

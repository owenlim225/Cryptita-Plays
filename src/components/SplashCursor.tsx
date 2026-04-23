"use client";

import { useEffect, useRef } from "react";

type SplashCursorProps = {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
  SHADING?: boolean;
  RAINBOW_MODE?: boolean;
  COLOR?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  color: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return { r: 168, g: 85, b: 247 };
  const num = Number.parseInt(normalized, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

const toRgba = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const hslToHex = (h: number, s: number, l: number) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (v: number) => {
    const n = Math.round((v + m) * 255);
    return n.toString(16).padStart(2, "0");
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export default function SplashCursor({
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  COLOR_UPDATE_SPEED = 10,
  SHADING = true,
  RAINBOW_MODE = false,
  COLOR = "#A855F7",
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, active: false });
  const hueRef = useRef(280);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createSplat = (x: number, y: number, dx: number, dy: number) => {
      const radius = clamp(
        Math.min(window.innerWidth, window.innerHeight) * SPLAT_RADIUS * 0.12,
        8,
        72,
      );
      const forceScale = SPLAT_FORCE * 0.00008;
      const speed = Math.hypot(dx, dy);

      if (RAINBOW_MODE) {
        hueRef.current = (hueRef.current + COLOR_UPDATE_SPEED) % 360;
      }

      const color = RAINBOW_MODE
        ? hslToHex(hueRef.current, 0.95, 0.58)
        : COLOR;

      const count = clamp(Math.floor(3 + speed / 10), 3, 8);
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count;
        const spread = radius * (0.3 + Math.random() * 0.6);
        particlesRef.current.push({
          x: x + Math.cos(angle) * spread * 0.25,
          y: y + Math.sin(angle) * spread * 0.25,
          vx: dx * forceScale + Math.cos(angle) * CURL * 0.75,
          vy: dy * forceScale + Math.sin(angle) * CURL * 0.75,
          r: radius * (0.7 + Math.random() * 0.6),
          life: 1,
          color,
        });
      }
    };

    const onMove = (x: number, y: number) => {
      const pointer = pointerRef.current;
      if (!pointer.active) {
        pointer.x = x;
        pointer.y = y;
        pointer.prevX = x;
        pointer.prevY = y;
        pointer.active = true;
        return;
      }

      const dx = x - pointer.prevX;
      const dy = y - pointer.prevY;
      pointer.prevX = x;
      pointer.prevY = y;
      pointer.x = x;
      pointer.y = y;

      if (Math.hypot(dx, dy) > 0.2) {
        createSplat(x, y, dx, dy);
      }
    };

    const handlePointerMove = (event: PointerEvent) => onMove(event.clientX, event.clientY);
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) onMove(touch.clientX, touch.clientY);
    };

    const step = (time: number, prevTimeRef: { current: number }) => {
      const prev = prevTimeRef.current || time;
      const dt = clamp((time - prev) / 1000, 0.001, 0.033);
      prevTimeRef.current = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const velocityDecay = Math.exp(-VELOCITY_DISSIPATION * dt);
      const densityDecay = Math.exp(-DENSITY_DISSIPATION * dt);
      const pressurePull = PRESSURE * 200 * dt;

      particlesRef.current = particlesRef.current
        .map((p) => {
          const swirlX = -p.vy * CURL * 0.02;
          const swirlY = p.vx * CURL * 0.02;
          p.vx = (p.vx + swirlX - p.vx * pressurePull) * velocityDecay;
          p.vy = (p.vy + swirlY - p.vy * pressurePull) * velocityDecay;
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;
          p.life *= densityDecay;
          p.r *= 0.998;
          return p;
        })
        .filter((p) => p.life > 0.02 && p.r > 0.8);

      for (const p of particlesRef.current) {
        if (SHADING) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          gradient.addColorStop(0, toRgba(p.color, clamp(p.life * 0.45, 0, 0.65)));
          gradient.addColorStop(1, toRgba(p.color, 0));
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = toRgba(p.color, clamp(p.life * 0.25, 0, 0.4));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame((nextTime) =>
        step(nextTime, prevTimeRef),
      );
    };

    resize();
    const prevTimeRef = { current: 0 };
    rafRef.current = window.requestAnimationFrame((t) => step(t, prevTimeRef));

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [
    COLOR,
    COLOR_UPDATE_SPEED,
    CURL,
    DENSITY_DISSIPATION,
    PRESSURE,
    RAINBOW_MODE,
    SHADING,
    SPLAT_FORCE,
    SPLAT_RADIUS,
    VELOCITY_DISSIPATION,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10"
    />
  );
}

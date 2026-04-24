"use client";

import {
  useRef,
  useEffect,
  useState,
  createElement,
  type CSSProperties,
  type ElementType,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DEFAULT_FROM: gsap.TweenVars = { opacity: 0, y: 40 };
const DEFAULT_TO: gsap.TweenVars = { opacity: 1, y: 0 };

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  tag?: string;
  onLetterAnimationComplete?: () => void;
};

function normalizeSplitType(splitType: string) {
  return splitType.replace(/\s/g, "").toLowerCase();
}

function getAnimationSelector(splitType: string): string {
  const t = normalizeSplitType(splitType);
  if (t.includes("words") && t.includes("chars")) return ".split-char";
  if (t.includes("lines")) return ".split-line";
  if (t.includes("words")) return ".split-word";
  return ".split-char";
}

function buildSplitContent(text: string, splitType: string) {
  if (!text) return null;
  const t = normalizeSplitType(splitType);

  if (t.includes("words") && t.includes("chars")) {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (/^\s+$/.test(part)) {
        return <span key={i}>{part}</span>;
      }
      return (
        <span
          key={i}
          className="split-word"
        >
          {Array.from(part).map((ch, j) => (
            <span key={j} className="split-char">
              {ch}
            </span>
          ))}
        </span>
      );
    });
  }

  if (t.includes("lines")) {
    const lines = text.split("\n");
    return lines.map((line, i) => (
      <span
        key={i}
        className="split-line"
        style={{ display: "block" }}
      >
        {line}
      </span>
    ));
  }

  if (t.includes("words")) {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (/^\s+$/.test(part)) {
        return <span key={i}>{part}</span>;
      }
      return (
        <span key={i} className="split-word">
          {part}
        </span>
      );
    });
  }

  // chars (default)
  return Array.from(text).map((ch, i) => (
    <span key={i} className="split-char">
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = DEFAULT_FROM,
  to = DEFAULT_TO,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      void document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;
      const selector = getAnimationSelector(splitType);
      const targets = Array.from(el.querySelectorAll<HTMLElement>(selector));
      if (!targets.length) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const tween = gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4,
          },
          onComplete: () => {
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        tween.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: ref,
    }
  );

  const style: CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
  };

  const classes = `split-parent ${className}`.trim();
  const Tag = (tag || "p") as ElementType;

  return createElement(
    Tag,
    {
      ref,
      style,
      className: classes,
    },
    buildSplitContent(text, splitType)
  );
}

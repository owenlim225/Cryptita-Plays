import type { MagicBentoItem } from "@/components/magic-bento/magic-bento";

/**
 * 3×2 grid order: 01, 02, center, 03, 04.
 * Surfaces are fixed hexes (primary #971ce6 and neutrals) for reliable inline `backgroundColor`.
 */
export const aboutBentoItems: MagicBentoItem[] = [
  {
    id: "barrier-01",
    label: "01",
    color: "#4a1d7a",
    textTone: "light",
    title: "Limited access to quality educational resources.",
  },
  {
    id: "barrier-02",
    label: "02",
    color: "#e8def4",
    textTone: "dark",
    title: "Limited digital literacy and Web3 awareness.",
  },
  {
    id: "problem-center",
    color: "#ffffff",
    textTone: "dark",
    className: "magic-bento-card--problem-center",
    contentClassName: "magic-bento-card__content--stack",
    title: "The Problem",
    titleClassName: "magic-bento-card__title--problem-hero",
    description: "Many communities face overlapping barriers.",
  },
  {
    id: "barrier-03",
    label: "03",
    color: "#1f1833",
    textTone: "light",
    title: "High exposure to misinformation and online risks.",
  },
  {
    id: "barrier-04",
    label: "04",
    color: "#edd6e8",
    textTone: "dark",
    title: "Financial constraints that disrupt school continuity.",
  },
];

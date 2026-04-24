import type { MagicBentoItem } from "@/components/magic-bento/magic-bento";

/** Order: left top, left bottom, center (spans 2 rows), right top, right bottom. */
export const aboutBentoItems: MagicBentoItem[] = [
  {
    id: "connect",
    label: "Outreach",
    color: "#2D0066",
    textTone: "light",
    title: "Meet youth where they are",
    description: "School visits, community partners, and beginner-friendly entry points to Web3 ideas.",
  },
  {
    id: "resources",
    label: "Learning",
    color: "#E0CFFF",
    textTone: "dark",
    title: "Clear materials, not noise",
    description: "Simplified content and storytelling so new learners are not left behind.",
  },
  {
    id: "hero",
    color: "#FFFFFF",
    textTone: "dark",
    className: "border border-black/5 shadow-sm",
    contentClassName: "magic-bento-card__content--stack",
    title: "Get more from\nweb3 for good",
    titleClassName: "magic-bento-card__title--center-hero",
    description:
      "We bridge education and social impact—helping young people and underserved communities use technology with confidence and care.",
  },
  {
    id: "programs",
    label: "Programs",
    color: "#002B24",
    textTone: "light",
    title: "Workshops & long-term support",
    description: "Hands-on sessions and follow-through so learning sticks beyond a single event.",
  },
  {
    id: "safety",
    label: "Trust",
    color: "#FFB38A",
    textTone: "dark",
    title: "Safety and consent first",
    description: "We emphasize misinformation awareness, online safety, and healthy participation.",
  },
];

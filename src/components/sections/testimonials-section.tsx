"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "The workshops and resources helped our students understand web3 without the noise. Finally an initiative that leads with learning.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    name: "Briana Patton",
    role: "Educator",
  },
  {
    text: "Volunteering here feels grounded in real community needs. The team is transparent, kind, and serious about the mission.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    name: "Bilal Ahmed",
    role: "Community volunteer",
  },
  {
    text: "We partnered for an event and the coordination was excellent—clear comms, inclusive vibe, and a real focus on education over hype.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    name: "Saman Malik",
    role: "Local organizer",
  },
  {
    text: "As a parent, I appreciate how they explain things for young people. My kid came away curious, not confused.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    name: "Omar Raza",
    role: "Parent & supporter",
  },
  {
    text: "The ACIS and scholarship stories show up in real life—not just on slides. That authenticity is why we keep backing this work.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    name: "Zainab Hussain",
    role: "Sponsor",
  },
  {
    text: "Professional, values-driven, and fun to work with. They made it easy for our org to get involved and stay engaged.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    name: "Aliza Khan",
    role: "Program partner",
  },
  {
    text: "I joined skeptical and stayed because the team walks the talk—education first, community always.",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
    name: "Farhan Siddiqui",
    role: "Member",
  },
  {
    text: "From social content to in-person meetups, the tone stays positive and learning-focused. That stands out in this space.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    name: "Sana Sheikh",
    role: "Creator",
  },
  {
    text: "Cryptita doesn’t just talk about inclusion—they build programs and spaces where people can actually show up and grow.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    name: "Hassan Ali",
    role: "Community member",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section
      className="relative my-20 overflow-hidden bg-linear-to-b from-(--primary)/6 via-background to-background py-4 md:py-8"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-(--primary)/15 blur-3xl"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto">
        <div className="constraint-content w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            <div className="flex justify-center">
              <span className="rounded-full border border-(--primary)/35 bg-(--primary)/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-(--primary)">
                Voices
              </span>
            </div>

            <h2
              id="testimonials-heading"
              className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              What our <span className="text-(--primary)">community</span> says
            </h2>
            <p className="mt-4 max-w-lg font-sans text-lg leading-8 text-(--text-muted)">
              Real feedback from educators, volunteers, partners, and people who show up for learning-first
              web3 and outreach.
            </p>
          </motion.div>
        </div>

        <div
          className="mask-[linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] mt-12 flex max-h-[740px] justify-center gap-5 overflow-hidden md:gap-6"
          aria-label="Scrolling testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}

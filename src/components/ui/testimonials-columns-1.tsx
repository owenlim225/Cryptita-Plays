"use client";

import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 bg-transparent pb-6"
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-(--primary)/20 bg-white/90 p-6 shadow-[0_12px_40px_-12px_rgba(151,28,230,0.15)] ring-1 ring-(--primary)/5 backdrop-blur-sm md:p-7"
                key={`${name}-${i}`}
              >
                <div
                  className="absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-linear-to-b from-(--primary) to-(--primary-hover)"
                  aria-hidden
                />
                <p className="pl-3 font-sans text-[15px] leading-7 text-(--text-muted)">
                  {text}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-(--border-subtle) pt-5 pl-3">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-(--primary)/20"
                  />
                  <div className="min-w-0 flex flex-col">
                    <div className="font-(family-name:--font-space-grotesk) text-sm font-semibold leading-5 text-foreground">
                      {name}
                    </div>
                    <div className="text-xs leading-5 text-(--text-muted)">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

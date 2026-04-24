"use client";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-background text-foreground md:px-10"
      ref={containerRef}
    >
      <div className="constraint-content py-20">
        <h2 className="max-w-4xl text-3xl font-bold text-foreground md:text-5xl">
          Cryptita Plays origin
        </h2>
        <p className="mt-4 max-w-sm text-sm text-(--text-muted) md:text-base">
          How Cryptita Plays started and the milestones that shaped us—step by
          step.
        </p>
      </div>

      <div ref={ref} className="constraint-content relative pb-20">
        <div
          style={{ height: `${height}px` }}
          className="pointer-events-none absolute top-0 left-1/2 z-0 w-[2px] -translate-x-1/2 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-(--border-subtle) to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-linear-to-t from-(--primary) via-(--primary-hover) to-transparent from-0% via-10%"
          />
        </div>

        {data.map((item, index) => {
          const contentLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative z-10 pt-10 md:pt-40"
            >
              <div
                className="pointer-events-none absolute top-10 left-1/2 z-40 flex h-10 w-10 -translate-x-1/2 items-center justify-center bg-background md:top-40"
                aria-hidden
              >
                <div className="h-4 w-4 rounded-full border border-(--border-subtle) bg-(--surface-alt) p-2" />
              </div>

              {contentLeft ? (
                <div
                  className="grid grid-cols-1 gap-4 pl-[max(0.75rem,calc(50%+0.5rem))] pr-4 max-md:max-w-md md:grid-cols-2 md:items-start md:gap-0 md:pl-0 md:pr-0"
                >
                  <div className="order-2 w-full min-w-0 md:order-1 md:pr-8 md:text-right">
                    {item.content}
                  </div>
                  <div className="order-1 w-full self-start md:order-2 md:sticky md:top-40 md:max-w-sm md:pl-8 lg:max-w-sm">
                    <h3 className="mb-4 text-2xl font-bold text-(--text-muted) md:mb-0 md:text-5xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 gap-4 pl-4 pr-[max(0.75rem,calc(50%+0.5rem))] text-right max-md:ml-auto max-md:max-w-md md:grid-cols-2 md:items-start md:gap-0 md:pl-0 md:pr-0 md:text-left"
                >
                  <div className="w-full self-start text-right md:sticky md:top-40 md:max-w-sm md:pr-8 md:text-right lg:max-w-sm">
                    <h3 className="mb-4 text-2xl font-bold text-(--text-muted) md:mb-0 md:text-5xl">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-full min-w-0 pl-0 text-left md:pl-8">
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

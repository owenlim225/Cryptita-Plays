"use client";

import Image from "next/image";
import { useMemo, useState, type TouchEvent } from "react";

type WhyPhotosCarouselProps = {
  images: string[];
};

export function WhyPhotosCarousel({ images }: WhyPhotosCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const slides = useMemo(() => {
    if (images.length === 0) {
      return ["/brand/photos/why.jpg"];
    }
    return images;
  }, [images]);

  const goTo = (nextIndex: number) => {
    const total = slides.length;
    setActiveIndex((nextIndex + total) % total);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    if (Math.abs(delta) > 40) {
      goTo(activeIndex + (delta < 0 ? 1 : -1));
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="relative h-72 overflow-hidden rounded-2xl border border-(--border-subtle) bg-black/10"
      role="region"
      aria-label="Why We Do This photo carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") goTo(activeIndex + 1);
        if (event.key === "ArrowLeft") goTo(activeIndex - 1);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-400 ease-out"
          style={{ opacity: index === activeIndex ? 1 : 0, pointerEvents: "none" }}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={src}
            alt={`Community learning moment ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 32rem"
            priority={index === 0}
          />
        </div>
      ))}

      {slides.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
            <button
              type="button"
              className="pointer-events-auto rounded-full bg-black/45 px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Show previous photo"
            >
              Prev
            </button>
            <button
              type="button"
              className="pointer-events-auto rounded-full bg-black/45 px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Show next photo"
            >
              Next
            </button>
          </div>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={`${slide}-dot`}
                type="button"
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
                onClick={() => goTo(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

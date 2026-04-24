"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { GalleryCardItem } from "@/types/content";

export type Gallery4Item = GalleryCardItem;

export interface Gallery4Props {
  id?: string;
  title?: string;
  description?: string;
  items: Gallery4Item[];
  className?: string;
}

const cardLinkClass =
  "group block w-full max-w-full overflow-hidden rounded-2xl border border-(--border-subtle)";

function CardLink({
  item,
  children,
  className,
}: {
  item: Gallery4Item;
  children: ReactNode;
  className?: string;
}) {
  const classNames = cn(cardLinkClass, className);
  if (item.href.startsWith("http://") || item.href.startsWith("https://")) {
    return (
      <a href={item.href} className={classNames} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} className={classNames}>
      {children}
    </Link>
  );
}

const Gallery4 = ({
  id,
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.",
  items,
  className,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <div id={id} className={cn("w-full", className)}>
      <div className="constraint-content w-full">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {title}
            </h2>
            <p className="text-pretty text-lg font-medium text-(--text-muted)">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              type="button"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              type="button"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(2rem,calc(50vw-33rem))] 2xl:mr-[max(0rem,calc(50vw-33rem))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[min(100%,320px)] pl-[20px] sm:max-w-[320px] lg:max-w-[360px]"
              >
                <CardLink item={item}>
                  <div className="group relative min-h-[24rem] w-full overflow-hidden rounded-2xl md:min-h-[27rem] md:aspect-[5/4] lg:aspect-[16/9]">
                    <Image
                      alt={item.title}
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      fill
                      priority={false}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 360px"
                      src={item.image}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-(--primary)/75 via-(--primary)/35 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <div className="mb-2 pt-2 text-xl font-semibold text-white drop-shadow-sm md:mb-3">
                        {item.title}
                      </div>
                      <div className="mb-6 line-clamp-3 text-sm leading-relaxed text-white/95 drop-shadow-sm md:mb-8 md:line-clamp-2">
                        {item.description}
                      </div>
                      <div className="mt-auto flex items-center text-sm font-medium text-white">
                        Read more
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </CardLink>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                currentSlide === index ? "bg-primary" : "bg-primary/25"
              )}
              onClick={() => {
                carouselApi?.scrollTo(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Gallery4 };

"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionsProps = {
  items: FaqItem[];
  eyebrow?: string;
  title: string;
  description: string;
  /** Applied to the main heading for `aria-labelledby` on a wrapping `<section>`. */
  headingId?: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Split: image + accordion (default). Stacked: centered single column. */
  variant?: "split" | "stacked";
};

export function FaqSections({
  items,
  eyebrow = "FAQ's",
  title,
  description,
  headingId,
  className,
  imageSrc,
  imageAlt = "",
  variant = "split",
}: FaqSectionsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const list = items.map((faq, index) => {
    const isOpen = openIndex === index;
    return (
      <div
        key={index}
        className="border-b border-(--border-subtle) py-4 last:border-b-0"
      >
        <button
          type="button"
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        >
          <h3 className="text-base font-medium text-foreground">{faq.question}</h3>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-[18px] shrink-0 text-foreground transition-transform duration-500 ease-in-out",
              isOpen && "rotate-180",
            )}
            strokeWidth={1.5}
          />
        </button>
        <p
          className={cn(
            "overflow-hidden text-sm text-(--text-muted) transition-all duration-500 ease-in-out",
            isOpen
              ? "max-h-[300px] translate-y-0 pt-4 opacity-100"
              : "max-h-0 -translate-y-2 opacity-0",
            variant === "stacked" ? "max-w-none" : "max-w-md",
          )}
        >
          {faq.answer}
        </p>
      </div>
    );
  });

  if (variant === "stacked") {
    return (
      <div
        className={cn(
          "mx-auto flex w-full max-w-xl flex-col items-center justify-center px-4 md:px-0",
          className,
        )}
      >
        <p className="text-sm font-medium text-(--primary)">{eyebrow}</p>
        <h2
          id={headingId}
          className="text-center text-3xl font-semibold text-foreground"
        >
          {title}
        </h2>
        <p className="mt-2 pb-8 text-center text-sm text-(--text-muted)">
          {description}
        </p>
        <div className="w-full">{list}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-4xl flex-col items-start justify-center gap-8 px-4 md:flex-row md:px-0",
        className,
      )}
    >
      {imageSrc ? (
        <div className="relative aspect-830/844 w-full max-w-sm shrink-0 overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 24rem, 100vw"
            priority={false}
          />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-(--primary)">{eyebrow}</p>
        <h2 id={headingId} className="text-3xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="mt-2 pb-4 text-sm text-(--text-muted)">{description}</p>
        {list}
      </div>
    </div>
  );
}

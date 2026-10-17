"use client";

import { useRef, useState, type MouseEvent } from "react";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import { FaceIcon } from "@/components/FaceIcon";
import { site } from "@/config/site";

const ratings = [
  { level: 1 as const, label: "Muy mala" },
  { level: 2 as const, label: "Mala" },
  { level: 3 as const, label: "Regular" },
  { level: 4 as const, label: "Buena" },
  { level: 5 as const, label: "Excelente" },
];

export function RatingSelector() {
  return (
    <ClientErrorBoundary fallback={<RatingFallback />}>
      <InteractiveRatingSelector />
    </ClientErrorBoundary>
  );
}

const destinationFor = (level: number) =>
  level === 5
    ? site.googleWriteReviewUrl
    : `${site.feedbackWhatsapp}%20Mi%20valoraci%C3%B3n%20fue%20${level}%2F5.`;

function RatingFallback() {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-4">
      {ratings.map(({ level, label }) => (
        <a key={level} href={destinationFor(level)} target="_blank" rel="noopener noreferrer" aria-label={`${label}, ${level} de 5`} className="rounded-2xl border border-white/10 bg-white/[.035] px-1 py-3 text-center text-cream sm:px-3 sm:py-5">
          {level}/5
        </a>
      ))}
    </div>
  );
}

function InteractiveRatingSelector() {
  const [selected, setSelected] = useState<number | null>(null);
  const opening = useRef(false);

  const choose = (level: number, event: MouseEvent<HTMLAnchorElement>) => {
    if (selected || opening.current) {
      event.preventDefault();
      return;
    }
    opening.current = true;
    setSelected(level);
    window.setTimeout(() => {
      opening.current = false;
      setSelected(null);
    }, 1600);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {ratings.map(({ level, label }) => (
          <a
            key={level}
            href={destinationFor(level)}
            target="_blank"
            rel="noopener noreferrer"
            className={`face-button rounded-2xl border px-1 py-3 text-center transition sm:px-3 sm:py-5 ${
              selected === level
                ? "border-mustard bg-mustard/10"
                : "border-white/10 bg-white/[.035] hover:border-white/30 hover:bg-white/[.06]"
            } ${selected && selected !== level ? "opacity-35" : ""}`}
            onClick={(event) => choose(level, event)}
            aria-disabled={selected !== null}
            aria-label={`${label}, ${level} de 5`}
          >
            <FaceIcon level={level} className="mx-auto h-auto w-full max-w-[92px]" />
            <span className="mt-2 block text-[10px] font-bold uppercase tracking-[.09em] text-cream/65 sm:text-xs">
              {label}
            </span>
          </a>
        ))}
      </div>

      <p className="mt-6 min-h-6 text-center font-[var(--font-libre)] text-sm text-cream/60" aria-live="polite">
        {selected ? "Gracias. Abrimos el siguiente paso en una nueva pestaña." : "Toca una opción. No necesitas registrarte."}
      </p>
    </div>
  );
}

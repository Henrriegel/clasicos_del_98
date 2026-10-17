"use client";

import { useRef, useState } from "react";
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
  const [selected, setSelected] = useState<number | null>(null);
  const opening = useRef(false);

  const choose = (level: number) => {
    if (selected || opening.current) return;
    opening.current = true;

    const destination =
      level === 5
        ? site.googleWriteReviewUrl
        : `${site.feedbackWhatsapp}%20Mi%20valoraci%C3%B3n%20fue%20${level}%2F5.`;
    window.open(destination, "_blank", "noopener,noreferrer");
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
          <button
            key={level}
            type="button"
            className={`face-button rounded-2xl border px-1 py-3 transition sm:px-3 sm:py-5 ${
              selected === level
                ? "border-mustard bg-mustard/10"
                : "border-white/10 bg-white/[.035] hover:border-white/30 hover:bg-white/[.06]"
            } ${selected && selected !== level ? "opacity-35" : ""}`}
            onClick={() => choose(level)}
            disabled={selected !== null}
            aria-label={`${label}, ${level} de 5`}
          >
            <FaceIcon level={level} className="mx-auto h-auto w-full max-w-[92px]" />
            <span className="mt-2 block text-[10px] font-bold uppercase tracking-[.09em] text-cream/65 sm:text-xs">
              {label}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 min-h-6 text-center font-[var(--font-libre)] text-sm text-cream/60" aria-live="polite">
        {selected ? "Gracias. Abrimos el siguiente paso en una nueva pestaña." : "Toca una opción. No necesitas registrarte."}
      </p>
    </div>
  );
}

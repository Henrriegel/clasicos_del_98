"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import { formatServiceNumber, services } from "@/config/services";

const wrap = (index: number) => (index + services.length) % services.length;

export function Services() {
  return (
    <section id="servicios" className="bg-paper px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <p className="section-label text-terracotta">01 · Servicios</p>
            <h2 className="mt-4 max-w-xl font-[var(--font-oswald)] text-5xl font-semibold uppercase leading-[.95] tracking-[-.035em] sm:text-6xl">
              Lo clásico no está peleado con hacerlo bien hoy.
            </h2>
            <p className="mt-6 max-w-lg font-[var(--font-libre)] text-sm leading-7 text-ink/65 sm:text-base">
              Nada de inventar nombres rimbombantes. Corte, barba y estilo trabajados con la atención que se espera de una barbería de barrio.
            </p>
          </div>

          <ClientErrorBoundary fallback={<StaticServices />}>
            <ServiceCarousel />
          </ClientErrorBoundary>
        </div>
      </div>
    </section>
  );
}

function StaticServices() {
  return (
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      {services.map((service, index) => (
        <article key={service.id} aria-label={`Servicio ${formatServiceNumber(index)}: ${service.title}`} className="grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:items-start sm:py-8">
          <span className="font-[var(--font-oswald)] text-2xl font-semibold text-terracotta">{formatServiceNumber(index)}</span>
          <div className="grid gap-2 sm:grid-cols-[.7fr_1fr] sm:gap-8">
            <h3 className="font-[var(--font-oswald)] text-2xl font-semibold uppercase tracking-[-.02em] sm:text-3xl">{service.title}</h3>
            <p className="font-[var(--font-libre)] text-sm leading-7 text-ink/65">{service.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "moving" | "reset">("idle");
  const pendingStep = useRef<-1 | 0 | 1>(0);
  const animationTimer = useRef<number | undefined>(undefined);
  const resetFrame = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClickUntil = useRef(0);
  const region = useRef<HTMLDivElement>(null);

  const finishMove = useCallback(() => {
    const step = pendingStep.current;
    if (!step) return;
    pendingStep.current = 0;
    window.clearTimeout(animationTimer.current);
    setActiveIndex((index) => wrap(index + step));
    setPhase("reset");
    try {
      resetFrame.current = window.requestAnimationFrame(() => {
        try { resetFrame.current = window.requestAnimationFrame(() => setPhase("idle")); }
        catch { setPhase("idle"); }
      });
    } catch { setPhase("idle"); }
  }, []);

  const move = (step: -1 | 1) => {
    if (services.length < 2 || pendingStep.current || phase === "reset") return;
    try {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || typeof window.requestAnimationFrame !== "function") {
        setActiveIndex((index) => wrap(index + step));
        return;
      }
      pendingStep.current = step;
      setPhase("moving");
      animationTimer.current = window.setTimeout(finishMove, 650);
    } catch {
      pendingStep.current = 0;
      setPhase("idle");
      setActiveIndex((index) => wrap(index + step));
    }
  };

  useEffect(() => () => {
    window.clearTimeout(animationTimer.current);
    window.cancelAnimationFrame?.(resetFrame.current);
  }, []);

  const slots = services.length === 1 ? [0] : [-2, -1, 0, 1, 2];
  const hasImages = services.some((service) => service.image);

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Servicios de Clásicos del 98"
      tabIndex={0}
      className="min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div
        className={`relative touch-pan-y select-none overflow-hidden ${hasImages ? "h-[460px]" : "h-[370px]"} ${phase === "reset" ? "service-reset" : ""}`}
        onPointerDown={(event) => {
          touchStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            suppressClickUntil.current = Date.now() + 400;
            move(dx < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => { touchStart.current = null; }}
      >
        {slots.map((offset) => {
          const index = wrap(activeIndex + offset);
          const service = services[index];
          const position = phase === "moving" ? offset - pendingStep.current : offset;
          return (
            <article
              key={offset}
              aria-label={`Servicio ${formatServiceNumber(index)}: ${service.title}`}
              aria-hidden={Math.abs(offset) > 1}
              className={`service-card absolute left-1/2 top-1/2 flex w-[76%] max-w-[420px] flex-col overflow-hidden rounded-[24px] border border-ink/15 bg-cream p-5 sm:p-7 ${service.image ? "-mt-[230px] h-[460px]" : "-mt-[185px] h-[370px]"}`}
              style={{
                transform: `translateX(${position * 74 - 50}%) scale(${position === 0 ? 1 : 0.94})`,
                opacity: position === 0 ? 1 : Math.abs(position) === 1 ? 0.52 : 0,
                zIndex: position === 0 ? 3 : Math.abs(position) === 1 ? 2 : 1,
                boxShadow: position === 0 ? "0 22px 48px rgba(17,16,15,.16)" : "none",
              }}
              onTransitionEnd={(event) => {
                if (offset === 0 && phase === "moving" && event.target === event.currentTarget && event.propertyName === "transform") finishMove();
              }}
            >
              {service.image && (
                <div aria-hidden={offset !== 0} className="relative -mx-5 -mt-5 mb-5 h-28 shrink-0 overflow-hidden sm:-mx-7 sm:-mt-7 sm:h-36">
                  <Image src={service.image} alt={service.title} fill sizes="(min-width: 640px) 420px, 76vw" className="object-cover" />
                </div>
              )}
              <div aria-hidden={offset !== 0} className={`flex min-h-0 flex-1 flex-col ${service.image ? "gap-3" : "justify-center gap-5 border-t border-ink/15"}`}>
                <span className={`font-[var(--font-oswald)] font-semibold leading-none text-terracotta ${service.image ? "text-3xl sm:text-4xl" : "text-5xl sm:text-6xl"}`}>{formatServiceNumber(index)}</span>
                <div>
                  <h3 className={`font-[var(--font-oswald)] font-semibold uppercase leading-tight tracking-[-.025em] ${service.image ? "text-2xl sm:text-3xl" : "text-[1.75rem] sm:text-[2.25rem]"}`}>{service.title}</h3>
                  <p className={`mt-3 font-[var(--font-libre)] text-ink/70 ${service.image ? "text-sm leading-6 sm:text-base sm:leading-7" : "text-[0.95rem] leading-[1.55] sm:text-base sm:leading-7"}`}>{service.copy}</p>
                </div>
              </div>
              {Math.abs(offset) === 1 && (
                <button
                  type="button"
                  aria-label={`Ver servicio ${formatServiceNumber(index)}: ${service.title}`}
                  className="absolute inset-0 cursor-pointer rounded-[24px] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terracotta"
                  onClick={(event) => {
                    if (Date.now() < suppressClickUntil.current) return;
                    if (event.detail === 0) region.current?.focus();
                    move(offset < 0 ? -1 : 1);
                  }}
                />
              )}
            </article>
          );
        })}
      </div>
      {services.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-6">
          <button type="button" aria-label="Servicio anterior" onClick={() => move(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/25 text-ink motion-safe:transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
          </button>
          <span className="font-[var(--font-oswald)] text-lg font-semibold tabular-nums text-ink" aria-live="polite">
            {formatServiceNumber(activeIndex)} / {String(services.length).padStart(2, "0")}<span className="sr-only">: {services[activeIndex].title}</span>
          </span>
          <button type="button" aria-label="Servicio siguiente" onClick={() => move(1)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/25 text-ink motion-safe:transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

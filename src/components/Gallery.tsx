"use client";

import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import tools from "@/assets/tools.webp";
import chair from "@/assets/chair.webp";
import shopAction from "@/assets/shop-action.webp";
import barberAction from "@/assets/barber-action.webp";
import cutBowl from "@/assets/cut-bowl-fade.webp";
import cutProfile from "@/assets/cut-profile.webp";
import cutMullet from "@/assets/cut-mullet.webp";

type GalleryItem = {
  image: StaticImageData;
  alt: string;
};

const gallery: GalleryItem[] = [
  {
    image: tools,
    alt: "Tijeras, peines y herramientas de trabajo en Clásicos del 98",
  },
  {
    image: shopAction,
    alt: "Clientes y barberos durante una jornada en Clásicos del 98",
  },
  {
    image: cutBowl,
    alt: "Corte degradado realizado en Clásicos del 98",
  },
  {
    image: barberAction,
    alt: "Barbero trabajando frente al espejo en Clásicos del 98",
  },
  {
    image: cutProfile,
    alt: "Perfil de corte con degradado",
  },
  {
    image: cutMullet,
    alt: "Corte largo texturizado con nuca definida",
  },
  {
    image: chair,
    alt: "Sillón de barbería dentro del local",
  },
];

const wrap = (index: number) => (index + gallery.length) % gallery.length;
const now = () => {
  try {
    return typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
  } catch {
    return Date.now();
  }
};
const reducedMotionQuery = () => {
  try {
    return typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  } catch {
    return null;
  }
};
const canAnimate = () => typeof window.requestAnimationFrame === "function" && typeof window.cancelAnimationFrame === "function";

export function Gallery() {
  return (
    <ClientErrorBoundary fallback={<StaticGallery />}>
      <InteractiveGallery />
    </ClientErrorBoundary>
  );
}

function StaticGallery() {
  return (
    <section id="galeria" className="bg-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 border-b border-ink/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label text-terracotta">03 · Galería</p>
            <h2 className="mt-3 font-[var(--font-oswald)] text-5xl font-semibold uppercase tracking-[-.035em] sm:text-6xl">
              Trabajo real. Local real.
            </h2>
          </div>
          <p className="max-w-sm font-[var(--font-libre)] text-sm leading-7 text-ink/60">
            Un vistazo al trabajo, al espacio y a los estilos que salen todos los días de Clásicos del 98.
          </p>
        </div>
        <div className="gallery-spacer relative mx-auto aspect-[4/5] w-[64vw] max-w-[850px] overflow-hidden bg-ink sm:aspect-[4/3] sm:w-[68vw] lg:aspect-[16/10] lg:w-[52vw]">
          <Image src={gallery[0].image} alt={gallery[0].alt} fill sizes="(min-width: 1024px) 52vw, (min-width: 640px) 68vw, 64vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

function InteractiveGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<-1 | 0 | 1>(0);
  const [phase, setPhase] = useState<"idle" | "ready" | "moving" | "reset">("idle");
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);
  const hovered = useRef(false);
  const interacting = useRef(false);
  const focused = useRef(false);
  const moved = useRef(false);
  const nextAutoAt = useRef(0);
  const animating = useRef(false);
  const pendingDirection = useRef<-1 | 0 | 1>(0);
  const animationTimer = useRef<number | undefined>(undefined);
  const animationFrame = useRef(0);
  const resetFrame = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);

  const finishMove = useCallback(() => {
    if (!animating.current || pendingDirection.current === 0) return;
    const step = pendingDirection.current;
    pendingDirection.current = 0;
    window.clearTimeout(animationTimer.current);
    setPhase("reset");
    setActiveIndex((index) => wrap(index + step));
    setDirection(0);
    if (!canAnimate()) {
      setPhase("idle");
      return;
    }
    try {
      resetFrame.current = window.requestAnimationFrame(() => {
        try { resetFrame.current = window.requestAnimationFrame(() => setPhase("idle")); }
        catch { setPhase("idle"); }
      });
    } catch { setPhase("idle"); }
  }, []);

  const move = useCallback((step: -1 | 1, manual = true) => {
    if (animating.current) return;
    nextAutoAt.current = now() + (manual ? 4000 : 4500);
    const reducedMotion = reducedMotionQuery();
    if (!reducedMotion || reducedMotion.matches || !canAnimate()) {
      setActiveIndex((index) => wrap(index + step));
      return;
    }
    animating.current = true;
    pendingDirection.current = step;
    setDirection(step);
    setPhase("ready");
    try {
      animationFrame.current = window.requestAnimationFrame(() => {
        try {
          animationFrame.current = window.requestAnimationFrame(() => {
            setPhase("moving");
            animationTimer.current = window.setTimeout(finishMove, 750);
          });
        } catch { finishMove(); }
      });
    } catch {
      animating.current = false;
      pendingDirection.current = 0;
      setDirection(0);
      setPhase("idle");
      setActiveIndex((index) => wrap(index + step));
    }
  }, [finishMove]);

  useEffect(() => {
    if (phase === "idle") animating.current = false;
  }, [phase]);

  useEffect(() => () => {
    window.clearTimeout(animationTimer.current);
    if (typeof window.cancelAnimationFrame === "function") {
      window.cancelAnimationFrame(animationFrame.current);
      window.cancelAnimationFrame(resetFrame.current);
    }
  }, []);

  useEffect(() => {
    if (isLightboxOpen) return;
    const reducedMotion = reducedMotionQuery();
    if (!reducedMotion || !canAnimate()) return;
    const resetTimer = () => { nextAutoAt.current = now() + 4500; };
    resetTimer();
    document.addEventListener("visibilitychange", resetTimer);
    if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", resetTimer);
    else if (typeof reducedMotion.addListener === "function") reducedMotion.addListener(resetTimer);
    const timer = window.setInterval(() => {
      if (!reducedMotion.matches && document.hidden !== true && document.visibilityState !== "hidden" && !hovered.current && !interacting.current && !focused.current && !animating.current && now() >= nextAutoAt.current) {
        move(1, false);
      }
    }, 250);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", resetTimer);
      if (typeof reducedMotion.removeEventListener === "function") reducedMotion.removeEventListener("change", resetTimer);
      else if (typeof reducedMotion.removeListener === "function") reducedMotion.removeListener(resetTimer);
    };
  }, [isLightboxOpen, move]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => (index + (event.key === "ArrowRight" ? 1 : -1) + gallery.length) % gallery.length);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      activeButtonRef.current?.focus();
    };
  }, [isLightboxOpen]);

  const previousIndex = wrap(activeIndex - 1);
  const nextIndex = wrap(activeIndex + 1);
  const slots = [
    { index: wrap(activeIndex - 2), offset: -2 },
    { index: previousIndex, offset: -1 },
    { index: activeIndex, offset: 0 },
    { index: nextIndex, offset: 1 },
    { index: wrap(activeIndex + 2), offset: 2 },
  ];

  return (
    <section id="galeria" className="bg-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 border-b border-ink/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label text-terracotta">03 · Galería</p>
            <h2 className="mt-3 font-[var(--font-oswald)] text-5xl font-semibold uppercase tracking-[-.035em] sm:text-6xl">
              Trabajo real. Local real.
            </h2>
          </div>
          <p className="max-w-sm font-[var(--font-libre)] text-sm leading-7 text-ink/60">
            Un vistazo al trabajo, al espacio y a los estilos que salen todos los días de Clásicos del 98.
          </p>
        </div>

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label="Galería de cortes y del local"
          className="relative overflow-hidden"
          onPointerEnter={(event) => { if (event.pointerType === "mouse") hovered.current = true; }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") {
              hovered.current = false;
              nextAutoAt.current = now() + 4000;
            }
          }}
          onFocus={(event) => {
            try { focused.current = event.target.matches(":focus-visible"); }
            catch { focused.current = true; }
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              focused.current = false;
              nextAutoAt.current = now() + 4000;
            }
          }}
        >
          <div
            className={`gallery-stage relative flex touch-pan-y select-none justify-center ${phase === "reset" ? "gallery-reset" : ""}`}
            onPointerDown={(event) => {
              interacting.current = true;
              moved.current = false;
              startX.current = event.clientX;
              startY.current = event.clientY;
            }}
            onPointerMove={(event) => {
              if (interacting.current && Math.hypot(event.clientX - startX.current, event.clientY - startY.current) > 8 && !moved.current) {
                moved.current = true;
                if (event.pointerType === "mouse" && typeof event.currentTarget.setPointerCapture === "function") {
                  try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Drag still works without capture. */ }
                }
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" && interacting.current && !moved.current) {
                interacting.current = false;
                nextAutoAt.current = now() + 4000;
              }
            }}
            onPointerUp={(event) => {
              if (!interacting.current) return;
              interacting.current = false;
              const distance = event.clientX - startX.current;
              if (Math.abs(distance) >= 50 && Math.abs(distance) > Math.abs(event.clientY - startY.current)) {
                moved.current = true;
                move(distance < 0 ? 1 : -1);
              } else {
                nextAutoAt.current = now() + 4000;
              }
            }}
            onPointerCancel={() => {
              interacting.current = false;
              moved.current = true;
              nextAutoAt.current = now() + 4000;
            }}
          >
            <div aria-hidden="true" className="gallery-spacer aspect-[4/5] w-[64vw] max-w-[850px] sm:aspect-[4/3] sm:w-[68vw] lg:aspect-[16/10] lg:w-[52vw]" />
            {slots.map(({ index, offset }) => {
              const item = gallery[index];
              const visualPosition = phase === "moving" ? offset - direction : offset;
              return (
                <button
                  key={index}
                  ref={offset === 0 ? activeButtonRef : undefined}
                  type="button"
                  aria-hidden={Math.abs(offset) > 1}
                  aria-label={offset === 0 ? `Ampliar imagen ${index + 1}: ${item.alt}` : `Ver imagen ${index + 1}: ${item.alt}`}
                  tabIndex={Math.abs(offset) <= 1 ? 0 : -1}
                  className={`gallery-card absolute left-1/2 top-1/2 w-[64vw] max-w-[850px] overflow-hidden bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-mustard sm:w-[68vw] lg:w-[52vw] ${Math.abs(offset) > 1 ? "pointer-events-none" : "cursor-pointer"}`}
                  style={{
                    height: visualPosition === 0 ? "100%" : "var(--gallery-side-height)",
                    transform: `translate(${visualPosition * 65 - 50}%, -50%)`,
                    opacity: visualPosition === 0 ? 1 : Math.abs(visualPosition) === 1 ? 0.55 : 0,
                    zIndex: visualPosition === 0 ? 2 : Math.abs(visualPosition) === 1 ? 1 : 0,
                  }}
                  onTransitionEnd={(event) => {
                    if (offset === 0 && phase === "moving" && event.target === event.currentTarget && event.propertyName === "transform") finishMove();
                  }}
                  onClick={(event) => {
                    if (moved.current && event.detail !== 0) { moved.current = false; return; }
                    if (offset === 0) {
                      if (!animating.current) setLightboxOpen(true);
                    } else move(offset < 0 ? -1 : 1);
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 52vw, (min-width: 640px) 68vw, 64vw"
                    draggable={false}
                    className="pointer-events-none object-cover"
                  />
                  {offset === 0 && (
                    <span className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-ink/75 font-[var(--font-oswald)] text-xs font-semibold text-cream backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button type="button" aria-label="Anterior" onClick={() => move(-1)} className="absolute left-[18%] top-1/2 z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/20 bg-cream/95 text-ink shadow-[0_8px_28px_rgba(0,0,0,.16)] transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta sm:left-[calc(50%_-_34vw)] sm:h-12 sm:w-12 lg:left-[calc(50%_-_min(26vw,425px)_-_1rem)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
          </button>
          <button type="button" aria-label="Siguiente" onClick={() => move(1)} className="absolute right-[18%] top-1/2 z-10 grid h-11 w-11 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink/20 bg-cream/95 text-ink shadow-[0_8px_28px_rgba(0,0,0,.16)] transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta sm:right-[calc(50%_-_34vw)] sm:h-12 sm:w-12 lg:right-[calc(50%_-_min(26vw,425px)_-_1rem)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      {isLightboxOpen && (
        <div role="dialog" aria-modal="true" aria-label="Foto ampliada de la galería" className="fixed inset-0 z-[100]">
          <button type="button" tabIndex={-1} aria-label="Cerrar vista ampliada" onClick={() => setLightboxOpen(false)} className="absolute inset-0 bg-ink/95" />
          <div className="pointer-events-none relative z-10 flex h-full flex-col px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
            <div className="flex justify-end">
              <button ref={closeButtonRef} type="button" aria-label="Cerrar imagen" onClick={() => setLightboxOpen(false)} className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-cream/35 bg-ink/80 text-3xl text-cream hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-mustard">×</button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <Image src={gallery[activeIndex].image} alt={gallery[activeIndex].alt} sizes="100vw" draggable={false} className="pointer-events-auto h-auto max-h-full w-auto max-w-full object-contain" />
            </div>
            <div className="flex justify-center gap-4">
              <button type="button" aria-label="Imagen anterior" onClick={() => setActiveIndex((index) => (index - 1 + gallery.length) % gallery.length)} className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-cream/35 bg-ink/80 text-xl text-cream hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-mustard">←</button>
              <button type="button" aria-label="Imagen siguiente" onClick={() => setActiveIndex((index) => (index + 1) % gallery.length)} className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-cream/35 bg-ink/80 text-xl text-cream hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-mustard">→</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

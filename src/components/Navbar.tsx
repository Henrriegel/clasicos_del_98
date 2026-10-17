"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import wordmark from "@/assets/wordmark.webp";

const nav = [
  ["Servicios", "#servicios"],
  ["Nosotros", "#nosotros"],
  ["Galería", "#galeria"],
  ["Opiniones", "#opiniones"],
  ["Contacto", "#contacto"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/88 text-cream backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Clásicos del 98, inicio" className="shrink-0">
          <Image
            src={wordmark}
            alt="Peluquería y Barbería Clásicos del 98 Querétaro"
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-xs font-semibold uppercase tracking-[.16em] text-cream/75 transition hover:text-white"
            >
              {label}
            </a>
          ))}
          <Link
            href="/valorar"
            className="rounded-full border border-mustard/70 bg-mustard px-5 py-2.5 text-xs font-bold uppercase tracking-[.12em] text-ink transition hover:-translate-y-0.5 hover:bg-cream"
          >
            Valorar visita
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-px w-5 bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`${open ? "grid" : "hidden"} border-t border-white/10 bg-ink px-4 pb-6 pt-3 lg:hidden`}
      >
        {nav.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="border-b border-white/10 py-4 text-sm font-semibold uppercase tracking-[.14em] text-cream/85"
          >
            {label}
          </a>
        ))}
        <Link
          href="/valorar"
          onClick={() => setOpen(false)}
          className="mt-5 rounded-full bg-mustard px-5 py-3 text-center text-sm font-bold uppercase tracking-[.12em] text-ink"
        >
          Valorar visita
        </Link>
      </div>
    </header>
  );
}

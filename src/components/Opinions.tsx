import Image from "next/image";
import Link from "next/link";
import logo98 from "@/assets/logo-98-classic.webp";
import { site } from "@/config/site";

export function Opinions() {
  return (
    <section id="opiniones" className="relative overflow-hidden bg-terracotta px-4 py-20 text-cream sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20">
        <div>
          <p className="section-label text-cream/70">04 · Opiniones</p>
          <h2 className="mt-4 font-[var(--font-oswald)] text-5xl font-semibold uppercase leading-[.95] tracking-[-.035em] sm:text-6xl lg:text-7xl">
            Si te sentaste en la silla, tu opinión cuenta.
          </h2>
          <p className="mt-7 max-w-xl font-[var(--font-libre)] text-base leading-8 text-cream/80">
            No vamos a inventar testimonios para llenar tarjetas bonitas. Si ya te atendimos, cuéntanos cómo te fue. Son unos segundos y nos sirve para mantener lo que funciona y corregir lo que no.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/valorar"
              className="rounded-full bg-cream px-6 py-3 text-sm font-bold uppercase tracking-[.12em] text-ink transition hover:-translate-y-0.5 hover:bg-mustard"
            >
              Valorar mi visita
            </Link>
            <a
              href={site.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cream/35 px-6 py-3 text-sm font-bold uppercase tracking-[.12em] text-cream transition hover:border-cream hover:bg-white/10"
            >
              Ver opiniones
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-white/15 bg-ink p-4 shadow-soft sm:p-6">
          <Image
            src={logo98}
            alt="98 classic, gráfico de Clásicos del 98"
            className="h-auto w-full rounded-[18px]"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </div>
      </div>
    </section>
  );
}

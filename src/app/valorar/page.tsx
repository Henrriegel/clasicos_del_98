import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import wordmark from "@/assets/wordmark.webp";
import hero from "@/assets/hero.webp";
import { RatingSelector } from "@/components/RatingSelector";

export const metadata: Metadata = {
  title: "Valora tu visita",
  description: "Cuéntanos cómo fue tu experiencia en Clásicos del 98.",
};

export default function RatingPage() {
  return (
    <main className="noise relative min-h-screen overflow-hidden bg-ink text-cream">
      <Image
        src={hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-20"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(169,71,54,.2),transparent_40%),linear-gradient(rgba(17,16,15,.78),rgba(17,16,15,.96))]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs font-bold uppercase tracking-[.16em] text-cream/55 transition hover:text-cream">
            ← Inicio
          </Link>
          <Image
            src={wordmark}
            alt="Clásicos del 98"
            className="h-12 w-auto sm:h-14"
            priority
          />
          <span className="w-10" aria-hidden="true" />
        </div>

        <div className="my-auto py-12 sm:py-16">
          <section className="mx-auto max-w-3xl rounded-[30px] border border-white/10 bg-black/45 p-5 shadow-2xl backdrop-blur-xl sm:p-9 lg:p-12">
            <div className="text-center">
              <p className="section-label text-mustard">Tu visita · 10 segundos</p>
              <h1 className="mt-4 font-[var(--font-oswald)] text-4xl font-semibold uppercase leading-[.95] tracking-[-.035em] sm:text-6xl">
                ¿Cómo te fue hoy?
              </h1>
              <p className="mx-auto mt-4 max-w-xl font-[var(--font-libre)] text-sm leading-7 text-cream/65 sm:text-base">
                No hace falta escribir un ensayo. Elige la cara que más se acerque a tu experiencia.
              </p>
            </div>

            <div className="mt-9">
              <RatingSelector />
            </div>
          </section>
        </div>

        <p className="text-center text-[10px] uppercase tracking-[.16em] text-cream/30">
          Clásicos del 98 · Querétaro
        </p>
      </div>
    </main>
  );
}

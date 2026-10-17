import Image from "next/image";
import hero from "@/assets/hero.webp";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="noise relative min-h-[780px] overflow-hidden bg-ink text-cream sm:min-h-[820px]">
      <Image
        src={hero}
        alt="Barberos atendiendo clientes dentro de Clásicos del 98"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,15,.94)_0%,rgba(17,16,15,.78)_42%,rgba(17,16,15,.32)_72%,rgba(17,16,15,.58)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,16,15,.88)_0%,transparent_45%,rgba(17,16,15,.36)_100%)]" />

      <div className="relative mx-auto flex min-h-[780px] max-w-7xl items-end px-4 pb-16 pt-36 sm:min-h-[820px] sm:px-6 sm:pb-20 lg:px-8">
        <div className="max-w-4xl">
          <p className="section-label mb-5 text-mustard">{site.eyebrow}</p>

          <h1 className="display-tight font-[var(--font-oswald)] text-[clamp(4.7rem,13vw,10.5rem)] font-semibold uppercase">
            Clásicos
            <span className="block text-turquoise">del 98</span>
          </h1>

          <div className="mt-7 grid gap-6 border-t border-cream/25 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-xl font-[var(--font-libre)] text-base leading-7 text-cream/80 sm:text-lg">
              {site.tagline} Una barbería de barrio donde el oficio, el detalle y la conversación todavía importan.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cream px-6 py-3 text-sm font-bold uppercase tracking-[.12em] text-ink transition hover:-translate-y-0.5 hover:bg-mustard"
              >
                Agendar por WhatsApp
              </a>
              <a
                href="#servicios"
                className="rounded-full border border-cream/35 px-6 py-3 text-sm font-bold uppercase tracking-[.12em] text-cream transition hover:border-cream hover:bg-cream/10"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden h-28 w-28 items-center justify-center border-l border-t border-cream/15 bg-ink/65 font-[var(--font-oswald)] text-4xl font-bold text-cream lg:flex">
        98
      </div>
    </section>
  );
}

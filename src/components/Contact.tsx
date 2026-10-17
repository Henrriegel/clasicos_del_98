import Image from "next/image";
import logoMexico from "@/assets/logo-mexico-neon.webp";
import { site } from "@/config/site";

export function Contact() {
  return (
    <section id="contacto" className="bg-ink px-4 py-20 text-cream sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div className="flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-coal p-3 sm:p-4">
          <Image
            src={logoMexico}
            alt="Peluquería y Barbería Clásicos del 98, gráfico neón con colores de México"
            className="h-auto w-full rounded-[20px]"
            sizes="(min-width: 1024px) 40vw, 95vw"
          />
          <div className="mt-5 flex flex-1 flex-col justify-between gap-6 border-t border-white/10 px-2 pb-2 pt-5 sm:px-3 sm:pb-3">
            <div>
              <p className="font-[var(--font-oswald)] text-3xl font-semibold uppercase tracking-[-.025em]">{site.name}</p>
              <p className="mt-1 font-[var(--font-libre)] text-sm leading-6 text-cream/65">Cortes, barbería y buena plática en Querétaro.</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 font-[var(--font-libre)] text-xs text-cream/75">
              <span><span className="text-mustard">{site.hours[0][0]}</span> · {site.hours[0][1]}</span>
              <span><span className="text-mustard">{site.hours[1][0]}</span> · {site.hours[1][1]}</span>
              <span>WhatsApp · {site.phoneDisplay}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="section-label text-mustard">05 · Contacto</p>
          <h2 className="mt-4 font-[var(--font-oswald)] text-5xl font-semibold uppercase leading-[.95] tracking-[-.035em] sm:text-6xl">
            Química #42. Ahí nos vemos.
          </h2>

          <div className="mt-9 divide-y divide-white/15 border-y border-white/15">
            <div className="grid gap-2 py-6 sm:grid-cols-[130px_1fr]">
              <span className="text-xs font-bold uppercase tracking-[.15em] text-cream/45">Dirección</span>
              <span className="font-[var(--font-libre)] leading-7 text-cream/85">{site.address}</span>
            </div>
            <div className="grid gap-3 py-6 sm:grid-cols-[130px_1fr]">
              <span className="text-xs font-bold uppercase tracking-[.15em] text-cream/45">Horario</span>
              <div className="grid gap-x-6 gap-y-3 font-[var(--font-libre)] text-cream/85 min-[390px]:grid-cols-2">
                {site.hours.map(([days, hours]) => (
                  <div key={days} className="flex flex-col gap-1">
                    <span className="text-sm text-cream/55">{days}</span>
                    <span className="leading-6">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2 py-6 sm:grid-cols-[130px_1fr]">
              <span className="text-xs font-bold uppercase tracking-[.15em] text-cream/45">WhatsApp</span>
              <a className="font-[var(--font-libre)] text-xl text-cream hover:text-mustard" href={site.whatsapp} target="_blank" rel="noreferrer">
                {site.phoneDisplay}
              </a>
            </div>
            <div className="grid gap-2 py-6 sm:grid-cols-[130px_1fr]">
              <span className="text-xs font-bold uppercase tracking-[.15em] text-cream/45">Redes</span>
              <div className="flex gap-3">
                <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook de Clásicos del 98" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 text-cream transition hover:border-mustard hover:bg-mustard hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-mustard">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                    <path d="M17.5 2H14c-3.3 0-5 2-5 5.2V10H6v4h3v8h4.2v-8h3.5l.6-4h-4.1V7.6c0-1.2.3-1.6 1.7-1.6h2.6V2Z" />
                  </svg>
                </a>
                <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram de Clásicos del 98" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 text-cream transition hover:border-mustard hover:bg-mustard hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-mustard">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.7" cy="6.4" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-mustard px-6 py-3 text-sm font-bold uppercase tracking-[.12em] text-ink transition hover:-translate-y-0.5 hover:bg-cream"
            >
              Agendar cita
            </a>
            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[.12em] text-cream transition hover:border-cream"
            >
              Abrir mapa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

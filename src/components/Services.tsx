import { services } from "@/config/site";

export function Services() {
  return (
    <section id="servicios" className="bg-paper px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="section-label text-terracotta">01 · Servicios</p>
            <h2 className="mt-4 max-w-xl font-[var(--font-oswald)] text-5xl font-semibold uppercase leading-[.95] tracking-[-.035em] sm:text-6xl">
              Lo clásico no está peleado con hacerlo bien hoy.
            </h2>
            <p className="mt-6 max-w-lg font-[var(--font-libre)] text-sm leading-7 text-ink/65 sm:text-base">
              Nada de inventar nombres rimbombantes. Corte, barba y estilo trabajados con la atención que se espera de una barbería de barrio.
            </p>
          </div>

          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {services.map((service) => (
              <article
                key={service.number}
                className="group grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:items-start sm:py-8"
              >
                <span className="font-[var(--font-oswald)] text-2xl font-semibold text-terracotta">
                  {service.number}
                </span>
                <div className="grid gap-2 sm:grid-cols-[.7fr_1fr] sm:gap-8">
                  <h3 className="font-[var(--font-oswald)] text-2xl font-semibold uppercase tracking-[-.02em] transition group-hover:text-terracotta sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="font-[var(--font-libre)] text-sm leading-7 text-ink/65">
                    {service.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

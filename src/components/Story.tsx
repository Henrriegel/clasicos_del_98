import Image from "next/image";
import manifesto from "@/assets/manifesto.webp";
import facade from "@/assets/facade.webp";

export function Story() {
  return (
    <section id="nosotros" className="overflow-hidden bg-ink text-cream">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[560px] lg:min-h-[760px]">
          <Image
            src={manifesto}
            alt="Imagen editorial de Clásicos del 98 con su historia, pasiones y metas"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="noise relative flex items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24">
          <div className="relative max-w-2xl">
            <p className="section-label text-turquoise">02 · La barbería</p>
            <h2 className="mt-5 font-[var(--font-oswald)] text-5xl font-semibold uppercase leading-[.95] tracking-[-.035em] sm:text-6xl xl:text-7xl">
              Oficio, cultura y confianza.
            </h2>

            <p className="mt-7 font-[var(--font-libre)] text-base leading-8 text-cream/75">
              Clásicos del 98 no se siente como una franquicia armada en serie. Se siente como lo que es: una barbería con objetos, colores, historias y manos que ya tienen su propia forma de trabajar.
            </p>

            <blockquote className="mt-10 border-l-2 border-mustard pl-6 font-[var(--font-libre)] text-xl leading-9 text-cream sm:text-2xl">
              “El oficio se respeta, la gente se agradece y la vida se disfruta.”
            </blockquote>

            <div className="mt-10 grid grid-cols-[120px_1fr] gap-5 border-t border-white/15 pt-8 sm:grid-cols-[170px_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
                <Image
                  src={facade}
                  alt="Fachada de la barbería Clásicos del 98"
                  fill
                  sizes="170px"
                  className="object-cover"
                />
              </div>
              <p className="self-end font-[var(--font-libre)] text-sm leading-7 text-cream/60">
                Calle Química #42. Una entrada sencilla, un poste de barbería encendido y una identidad que se reconoce desde la banqueta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

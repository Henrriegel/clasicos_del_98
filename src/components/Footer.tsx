import Image from "next/image";
import wordmark from "@/assets/wordmark.webp";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-8 text-cream sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Image
            src={wordmark}
            alt="Clásicos del 98"
            className="h-14 w-auto"
          />
          <p className="mt-3 text-xs uppercase tracking-[.18em] text-cream/45">
            Querétaro · México
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="font-[var(--font-libre)] text-sm text-cream/65">{site.tagline}</p>
          <p className="mt-2 text-xs text-cream/35">© {new Date().getFullYear()} Clásicos del 98.</p>
        </div>
      </div>
    </footer>
  );
}

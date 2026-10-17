const text = "CLÁSICOS DEL 98 · BARBERÍA · QUERÉTARO · BUEN CORTE · BUENA PLÁTICA · BUENOS MOMENTOS · ";

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-mustard py-3 text-ink">
      <div className="marquee-track">
        <div className="marquee-group font-[var(--font-oswald)] text-sm font-semibold uppercase tracking-[.18em]">
          {text.repeat(3)}
        </div>
        <div className="marquee-group font-[var(--font-oswald)] text-sm font-semibold uppercase tracking-[.18em]" aria-hidden="true">
          {text.repeat(3)}
        </div>
      </div>
    </div>
  );
}

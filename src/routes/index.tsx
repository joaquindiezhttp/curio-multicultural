import { createFileRoute, Link } from "@tanstack/react-router";
import { CurioFlower } from "@/components/CurioFlower";
import { EVENT } from "@/lib/event";
import { Countdown } from "@/components/Countdown";
import CurioAgent from "@/components/CurioAgent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CURIO · Eventos Multiculturales" },
      { name: "description", content: "Una flor de cinco pétalos. Cinco mundos. Música, arte, cuerpo y ciudad." },
      { property: "og:title", content: "CURIO" },
      { property: "og:description", content: "Eventos multiculturales · underground · urbano · artístico" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen w-full overflow-hidden px-4 py-6 text-center md:py-8">
      {/* Top: title + subtitle */}
      <header className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h1 className="leading-none m-0">
          <img
            src={"/img/curio-title.png"}
            alt="CURIO"
            className="w-auto"
            style={{
              height: "clamp(4rem, 14vw, 9rem)",
              filter: "drop-shadow(0 0 24px rgba(184,166,50,0.25))",
            }}
          />
        </h1>
        <p
          className="mt-3 font-display uppercase"
          style={{
            color: "var(--gold)",
            opacity: 0.75,
            letterSpacing: "0.5em",
            fontSize: "clamp(0.6rem, 1.6vw, 0.8rem)",
          }}
        >
          Multicultural · Underground · Vivo
        </p>
      </header>

      <main>
        {/* The flower remains the primary navigation and visual centre. */}
        <section aria-labelledby="garden-navigation" className="relative mx-auto max-w-6xl">
          <h2 id="garden-navigation" className="sr-only">Entrá al jardín Curio</h2>
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
          <div className="-mt-8 mb-2 flex w-full items-center justify-center overflow-visible md:-mt-16">
            <CurioFlower size={660} />
          </div>

          <p
            className="font-display uppercase"
            style={{
              color: "var(--gold)",
              opacity: 0.7,
              letterSpacing: "0.35em",
              fontSize: "clamp(0.6rem, 1.4vw, 0.75rem)",
            }}
          >
            Tocá un pétalo · Entrá al jardín
          </p>
        </section>

        <section className="mx-auto mt-16 grid max-w-5xl gap-px border border-gold/35 bg-gold/20 text-left md:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-background/95 p-6 md:p-10">
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-gold">Próxima edición</p>
            <h2 className="mt-3 max-w-xl font-heading text-4xl leading-none text-oliva md:text-6xl">
              {EVENT.name}
            </h2>
            <p className="mt-4 font-display text-lg uppercase tracking-[0.18em] text-foreground md:text-2xl">
              {EVENT.dateLabel} · {EVENT.doors} a {EVENT.close} h
            </p>
            <p className="mt-2 text-sm text-foreground/70">{EVENT.city} · {EVENT.venueNote}</p>
            <Countdown target={EVENT.startsAt} />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/entradas" className="bg-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-wine hover:text-foreground">
                Info y entradas
              </Link>
              <Link to="/postulate" className="border border-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-background">
                Traé tu arte
              </Link>
            </div>
          </div>
          <aside className="grid content-between gap-8 bg-card/95 p-6 md:p-10" aria-label="Datos de la edición anterior">
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-foreground/50">Edición 01 · Archivo</p>
              <p className="mt-2 font-heading text-4xl text-oliva">Buenos Aires</p>
              <p className="mt-2 text-sm text-foreground/65">16 de mayo de 2026 · Núñez</p>
            </div>
            <div className="border-t border-border pt-6">
              <Link to="/galeria" className="font-display text-xs uppercase tracking-[0.22em] text-gold hover:text-foreground">
                Ver galería Vol. 1 →
              </Link>
            </div>
          </aside>
        </section>

        <CurioAgent />
      </main>
    </div>
  );
}

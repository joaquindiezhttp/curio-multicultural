import { createFileRoute, Link } from "@tanstack/react-router";
import { CurioFlower } from "@/components/CurioFlower";
import curioTitleAsset from "@/assets/curio-title.png.asset.json";
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
            src={curioTitleAsset.url}
            alt="CURIO"
            className="w-auto"
            style={{
              height: "clamp(4rem, 14vw, 9rem)",
              filter: "drop-shadow(0 0 24px rgba(212,164,55,0.25))",
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
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-gold">El jardín sigue creciendo</p>
            <h2 className="mt-3 max-w-xl font-blackletter text-4xl leading-none text-gold md:text-6xl">
              Una noche. Cinco mundos. Una comunidad.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/70 md:text-base">
              CURIO reúne música, arte urbano, indumentaria, cuerpo y palabra en experiencias vivas. La primera edición floreció en Buenos Aires; la próxima se está gestando.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/galeria" className="bg-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-wine hover:text-foreground">
                Ver edición 01
              </Link>
              <Link to="/postulate" className="border border-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-background">
                Traé tu arte
              </Link>
            </div>
          </div>
          <aside className="grid content-between gap-8 bg-card/95 p-6 md:p-10" aria-label="Datos de la primera edición">
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-foreground/50">Edición 01 · Archivo</p>
              <p className="mt-2 font-blackletter text-4xl text-gold">Buenos Aires</p>
              <p className="mt-2 text-sm text-foreground/65">16 de mayo de 2026 · Núñez</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div><dt className="font-display text-[9px] uppercase tracking-widest text-foreground/45">Artistas</dt><dd className="mt-1 text-2xl text-gold">10+</dd></div>
              <div><dt className="font-display text-[9px] uppercase tracking-widest text-foreground/45">Disciplinas</dt><dd className="mt-1 text-2xl text-gold">8</dd></div>
            </dl>
          </aside>
        </section>

        <CurioAgent />
      </main>
    </div>
  );
}

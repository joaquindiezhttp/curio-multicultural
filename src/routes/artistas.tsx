import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Navbar";
import { ARTISTS, DISCIPLINES, type Discipline } from "@/lib/curio-data";

export const Route = createFileRoute("/artistas")({
  head: () => ({
    meta: [
      { title: "Artistas · CURIO" },
      { name: "description", content: "Directorio de artistas Curio: música, graffiti, indumentaria, tattoo, poesía y más." },
    ],
  }),
  component: Artistas,
});

function Artistas() {
  const [filter, setFilter] = useState<Discipline | "Todos">("Todos");
  const filtered = filter === "Todos" ? ARTISTS : ARTISTS.filter((a) => a.discipline === filter);

  return (
    <PageShell
      title="Artistas"
      subtitle="Voces, manos y máquinas que son parte de la familia Curio."
    >
      <div className="flex flex-wrap gap-2 mb-8">
        {(["Todos", ...DISCIPLINES] as const).map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest font-display border transition-all ${
              filter === d
                ? "bg-gold text-background border-gold"
                : "border-border text-foreground/70 hover:border-gold hover:text-gold"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((a) => (
          <article
            key={a.id}
            className="group relative overflow-hidden border border-border bg-card/50 hover:border-gold transition-all hover:-translate-y-1 duration-300"
          >
            {a.image ? (
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              </div>
            ) : (
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-wine/20 blur-2xl group-hover:bg-gold/20 transition-colors" />
            )}
            <div className="relative p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-gold/80 font-display">
                {a.discipline}
              </p>
              <h3 className="font-serif text-3xl text-gold mt-2">{a.name}</h3>
              <p className="mt-3 text-sm text-foreground/80">{a.act}</p>
              {a.venue && (
                <p className="mt-2 text-xs text-muted-foreground">@ {a.venue}</p>
              )}
              <div className="mt-4 h-px w-12 bg-wine group-hover:w-full group-hover:bg-gold transition-all duration-500" />
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/Navbar";
import { AGENDA, DISCIPLINES, type Discipline } from "@/lib/curio-data";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda · CURIO" },
      { name: "description", content: "Cronograma de actividades de la próxima edición Curio." },
    ],
  }),
  component: Agenda,
});

const STORAGE_KEY = "curio-saved";

function Agenda() {
  const [filter, setFilter] = useState<Discipline | "Todos">("Todos");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setSaved(JSON.parse(raw));
  }, []);

  const toggle = (id: string) => {
    const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id];
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const filtered = filter === "Todos" ? AGENDA : AGENDA.filter((a) => a.discipline === filter);

  return (
    <PageShell
      title="Agenda"
      subtitle="Edición 01 · Buenos Aires · Tocá una actividad para guardarla en tu agenda."
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
      <ol className="relative border-l-2 border-gold/40 ml-3 space-y-6">
        {filtered.map((item) => {
          const isSaved = saved.includes(item.id);
          return (
            <li key={item.id} className="pl-6 relative">
              <span className={`absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 ${
                isSaved ? "bg-gold border-gold" : "bg-background border-gold/70"
              }`} />
              <button
                onClick={() => toggle(item.id)}
                className={`w-full text-left border bg-card/50 transition-all hover:border-gold overflow-hidden ${
                  isSaved ? "border-gold" : "border-border"
                }`}
              >
                {item.image && (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <span className="font-blackletter text-3xl text-gold">{item.time}</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-wine font-display px-2 py-1 border border-wine/60">
                      {item.discipline}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.artist}</p>
                  <p className="text-xs mt-3 text-gold/80 font-display tracking-widest uppercase">
                    {isSaved ? "✦ Guardado en mi agenda" : "+ Guardar"}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Navbar";
import { CITIES } from "@/lib/curio-data";

export const Route = createFileRoute("/ciudades")({
  head: () => ({
    meta: [
      { title: "Ciudades · CURIO" },
      { name: "description", content: "Ediciones realizadas y próximas de Curio en Latinoamérica." },
    ],
  }),
  component: Ciudades,
});

function Ciudades() {
  return (
    <PageShell title="Ciudades" subtitle="Dónde floreció Curio y dónde va a florecer.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CITIES.map((c) => {
          const isDone = c.status === "Realizado";
          return (
            <article
              key={c.id}
              className={`relative overflow-hidden border p-6 group hover:-translate-y-1 transition-all duration-300 ${
                isDone ? "border-gold/60 bg-card/50" : "border-wine/60 bg-card/30"
              }`}
            >
              <div className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.25em] font-display px-2 py-1 border"
                style={{
                  borderColor: isDone ? "var(--gold)" : "var(--wine)",
                  color: isDone ? "var(--gold)" : "var(--wine)",
                }}>
                {c.status}
              </div>
              <p className="font-display text-xs tracking-widest text-foreground/60 uppercase">
                Edición {String(c.edition).padStart(2, "0")}
              </p>
              <h3 className="font-blackletter text-5xl text-gold mt-2">{c.city}</h3>
              <p className="mt-3 text-sm text-foreground/80 font-display tracking-widest uppercase">
                {c.date}
              </p>
              <div className="mt-6 flex items-end justify-between">
                <svg viewBox="0 0 100 100" className="w-20 h-20 opacity-40 group-hover:opacity-80 transition-opacity">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" className="text-gold" />
                  <path d="M50,15 L52,50 L48,50 Z" fill="currentColor" className="text-wine" />
                </svg>
                <span className="text-6xl font-blackletter text-gold/30">
                  {String(c.edition).padStart(2, "0")}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

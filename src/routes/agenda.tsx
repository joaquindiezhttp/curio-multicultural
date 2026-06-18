import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Navbar";
import { ARTISTS, DISCIPLINES, type Discipline } from "@/lib/curio-data";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda · CURIO" },
      { name: "description", content: "Edición 01 · 16 de mayo 2026 · Buenos Aires (Núñez)." },
    ],
  }),
  component: Agenda,
});

const EVENT_INFO = [
  { label: "Edición", value: "01" },
  { label: "Fecha", value: "16 de mayo 2026" },
  { label: "Ciudad", value: "Buenos Aires · Núñez" },
  { label: "Puertas", value: "17:00" },
  { label: "Cierre", value: "02:00" },
  { label: "Entrada", value: "$8.000" },
];

function Agenda() {
  return (
    <PageShell
      title="Agenda"
      subtitle="Edición 01 · Buenos Aires · una noche, cinco mundos."
    >
      {/* Datos del evento */}
      <section className="border border-gold/50 bg-card/40 p-6 md:p-8 mb-10">
        <p className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
          Información del evento
        </p>
        <h2 className="font-blackletter text-4xl md:text-5xl text-gold mt-2">
          16 · Mayo · 2026
        </h2>
        <p className="mt-2 text-sm text-foreground/80">
          Buenos Aires · Núñez. La dirección exacta se confirma por nuestras redes los días previos.
        </p>
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {EVENT_INFO.map((i) => (
            <div key={i.label} className="border-l-2 border-gold/60 pl-3">
              <dt className="font-display text-[10px] tracking-[0.25em] uppercase text-foreground/60">
                {i.label}
              </dt>
              <dd className="text-base text-foreground mt-1">{i.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Disciplinas y artistas que participan */}
      <section>
        <p className="font-display text-[10px] tracking-[0.3em] text-wine uppercase">
          En esta edición
        </p>
        <h3 className="font-blackletter text-3xl text-gold mt-2 mb-6">
          Disciplinas & artistas
        </h3>
        <p className="text-sm text-foreground/70 mb-8 max-w-2xl">
          El cronograma fluye durante la noche, sin horarios fijos por actividad. Estas son las disciplinas y los artistas que toman parte de la edición.
        </p>

        <div className="space-y-6">
          {DISCIPLINES.map((d) => {
            const items = ARTISTS.filter((a) => a.discipline === d);
            if (items.length === 0) return null;
            return (
              <div key={d} className="border border-border bg-card/30 p-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-wine font-display px-2 py-1 border border-wine/60">
                    {d as Discipline}
                  </span>
                  <span className="text-xs font-display tracking-widest uppercase text-gold/70">
                    {items.length} {items.length === 1 ? "artista" : "artistas"}
                  </span>
                </div>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {items.map((a) => (
                    <li key={a.id} className="flex items-baseline gap-3">
                      <span className="text-gold">✦</span>
                      <span>
                        <span className="font-medium">{a.name}</span>
                        <span className="text-foreground/60 text-sm"> · {a.act}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

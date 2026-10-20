import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Navbar";
import { EVENT } from "@/lib/event";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda · CURIO" },
      { name: "description", content: "CURIO Vol. 2 · Sábado 5 de diciembre 2026 · Buenos Aires (Núñez)." },
    ],
  }),
  component: Agenda,
});

const EVENT_INFO = [
  { label: "Edición", value: EVENT.edition },
  { label: "Fecha", value: EVENT.dateLabel },
  { label: "Ciudad", value: EVENT.city },
  { label: "Puertas", value: `${EVENT.doors} h` },
  { label: "Cierre", value: `${EVENT.close} h` },
  { label: "Entrada", value: EVENT.price ?? "Próximamente" },
];

function Agenda() {
  return (
    <PageShell
      title="Agenda"
      subtitle="Vol. 2 · Buenos Aires · una noche, cinco mundos."
    >
      {/* Datos del evento */}
      <section className="border border-gold/50 bg-card/40 p-6 md:p-8 mb-10">
        <p className="font-display text-xs tracking-[0.3em] text-gold uppercase">
          Información del evento
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-oliva mt-2">
          {EVENT.dateShort}
        </h2>
        <p className="mt-2 text-sm text-foreground/80">
          {EVENT.city}. {EVENT.venueNote}
        </p>
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {EVENT_INFO.map((i) => (
            <div key={i.label} className="border-l-2 border-gold/60 pl-3">
              <dt className="font-display text-xs tracking-[0.25em] uppercase text-foreground/75">
                {i.label}
              </dt>
              <dd className="text-base text-foreground mt-1">{i.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-10 border border-border bg-card/30 p-6 md:p-8">
        <p className="font-display text-xs tracking-[0.3em] text-mostaza uppercase">Dónde</p>
        <h3 className="font-heading text-3xl text-oliva mt-2">{EVENT.city}</h3>
        <p className="mt-3 max-w-xl text-sm text-foreground/75">
          {EVENT.venueNote} Activá las notificaciones de @{EVENT.instagram} para recibir la dirección apenas se publique.
        </p>
      </section>

      <section className="border border-dashed border-gold/50 bg-card/30 p-8 md:p-10 text-center">
        <p className="font-display text-xs tracking-[0.3em] text-mostaza uppercase">Line-up</p>
        <h3 className="font-heading text-3xl md:text-4xl text-oliva mt-2">Se viene el line-up</h3>
        <p className="mt-3 mx-auto max-w-xl text-sm text-foreground/70">
          Estamos armando la grilla del Vol. 2. Los artistas se anuncian en Instagram; seguinos para enterarte primero.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={EVENT.instagramUrl} target="_blank" rel="noreferrer" className="bg-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-wine hover:text-foreground">
            @{EVENT.instagram}
          </a>
          <Link to="/artistas" className="border border-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-background">
            Artistas Vol. 1
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Navbar";
import { EVENT } from "@/lib/event";

export const Route = createFileRoute("/entradas")({
  head: () => ({
    meta: [
      { title: "Entradas · CURIO" },
      {
        name: "description",
        content: `${EVENT.name} · ${EVENT.dateLabel}, de ${EVENT.doors} a ${EVENT.close} h. Entrada en puerta.`,
      },
    ],
  }),
  component: Entradas,
});

const INFO = [
  { label: "Fecha", value: EVENT.dateLabel },
  { label: "Horario", value: `${EVENT.doors} a ${EVENT.close} h` },
  { label: "Lugar", value: EVENT.city },
  { label: "Entrada", value: EVENT.price ?? "Próximamente" },
];

function Entradas() {
  return (
    <PageShell title="Entradas" subtitle="Info para sumarte a la próxima edición de CURIO.">
      <section className="relative overflow-hidden border border-gold/60 bg-card/40 p-6 md:p-10">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-mostaza">Próxima edición</p>
        <h2 className="mt-2 font-heading text-4xl text-oliva md:text-6xl">{EVENT.name}</h2>

        <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-border py-6 md:grid-cols-4">
          {INFO.map((i) => (
            <div key={i.label} className="border-l-2 border-gold/60 pl-3">
              <dt className="font-display text-xs uppercase tracking-[0.22em] text-foreground/70">{i.label}</dt>
              <dd className="mt-1 text-base text-foreground">{i.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-foreground/75">
          La entrada se abona en puerta. {EVENT.venueNote} El precio se anuncia en Instagram junto con el line-up.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={EVENT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-wine hover:text-foreground"
          >
            Seguinos @{EVENT.instagram}
          </a>
          <Link
            to="/agenda"
            className="border border-gold px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-background"
          >
            Ver agenda
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

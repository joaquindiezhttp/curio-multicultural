import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/Navbar";

export const Route = createFileRoute("/entradas")({
  head: () => ({
    meta: [
      { title: "Entradas · CURIO" },
      {
        name: "description",
        content: "Reservá tu lugar para la próxima edición de Curio.",
      },
    ],
  }),
  component: Entradas,
});

const TICKET_PRICE = 8000;
const MAX_TICKETS = 6;

const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

function Entradas() {
  const [quantity, setQuantity] = useState(1);
  const [names, setNames] = useState([""]);
  const total = useMemo(() => quantity * TICKET_PRICE, [quantity]);

  const changeQuantity = (nextQuantity: number) => {
    const safeQuantity = Math.min(MAX_TICKETS, Math.max(1, nextQuantity));
    setQuantity(safeQuantity);
    setNames((current) =>
      Array.from({ length: safeQuantity }, (_, index) => current[index] ?? ""),
    );
  };

  const updateName = (index: number, value: string) => {
    setNames((current) =>
      current.map((name, currentIndex) =>
        currentIndex === index ? value : name,
      ),
    );
  };

  return (
    <PageShell
      title="Entradas"
      subtitle="Tu acceso a la próxima experiencia multicultural de CURIO."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <section className="relative overflow-hidden border border-gold/60 bg-card/40 p-6 md:p-8">
          <div className="absolute -right-16 -top-16 size-52 rounded-full border border-gold/20" />
          <div className="absolute -right-8 -top-8 size-36 rounded-full border border-wine/30" />

          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-wine">
                  Próxima edición
                </p>
                <h2 className="mt-2 font-blackletter text-4xl text-gold md:text-5xl">
                  CURIO · Edición 02
                </h2>
              </div>
              <span className="border border-gold/60 px-3 py-2 font-display text-[10px] uppercase tracking-[0.22em] text-gold">
                Cupos limitados
              </span>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-border py-6 sm:grid-cols-3">
              <div>
                <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-foreground/50">Fecha</dt>
                <dd className="mt-1 text-sm text-foreground">A confirmar</dd>
              </div>
              <div>
                <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-foreground/50">Lugar</dt>
                <dd className="mt-1 text-sm text-foreground">Buenos Aires</dd>
              </div>
              <div>
                <dt className="font-display text-[10px] uppercase tracking-[0.22em] text-foreground/50">Entrada</dt>
                <dd className="mt-1 text-sm text-foreground">{formatPrice(TICKET_PRICE)}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                    Cantidad de entradas
                  </p>
                  <p className="mt-1 text-xs text-foreground/55">Máximo {MAX_TICKETS} por compra</p>
                </div>
                <div className="flex items-center border border-border bg-background/40">
                  <button
                    type="button"
                    onClick={() => changeQuantity(quantity - 1)}
                    disabled={quantity === 1}
                    className="grid size-11 place-items-center text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Quitar una entrada"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="grid size-11 place-items-center border-x border-border font-display text-lg text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(quantity + 1)}
                    disabled={quantity === MAX_TICKETS}
                    className="grid size-11 place-items-center text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Agregar una entrada"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {names.map((name, index) => (
                  <label key={index} className="block">
                    <span className="font-display text-[10px] uppercase tracking-[0.22em] text-foreground/60">
                      Nombre de la entrada {index + 1}
                    </span>
                    <input
                      value={name}
                      onChange={(event) => updateName(index, event.target.value)}
                      placeholder="Nombre y apellido"
                      autoComplete="name"
                      className="mt-2 w-full border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/25 focus:border-gold"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="h-fit border border-wine/60 bg-card/30 p-6 md:p-8 lg:sticky lg:top-24">
          <div className="flex items-center gap-3 border-b border-border pb-5">
            <Ticket className="text-gold" size={24} />
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.25em] text-foreground/50">Tu selección</p>
              <h3 className="font-blackletter text-3xl text-gold">Resumen</h3>
            </div>
          </div>

          <div className="space-y-4 py-6 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-foreground/65">Entradas</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-foreground/65">Precio unitario</span>
              <span>{formatPrice(TICKET_PRICE)}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-border pt-5">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-gold">Total</span>
              <strong className="font-blackletter text-3xl font-normal text-gold">{formatPrice(total)}</strong>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed border border-gold/40 bg-gold/10 px-5 py-4 font-display text-xs uppercase tracking-[0.24em] text-gold/60"
          >
            Pago disponible próximamente
          </button>

          <div className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-foreground/55">
            <ShieldCheck className="mt-0.5 shrink-0 text-wine" size={17} />
            <p>CURIO solo solicitará el nombre que figure en cada entrada. El pago será procesado de forma externa y segura.</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

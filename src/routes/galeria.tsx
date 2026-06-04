import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Navbar";
import { GALLERY } from "@/lib/curio-data";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería · CURIO" },
      { name: "description", content: "Fotos y videos de las ediciones de Curio." },
    ],
  }),
  component: Galeria,
});

const EDITIONS = ["Todas", "Edición 01 · Buenos Aires"] as const;

function Galeria() {
  const [edition, setEdition] = useState<(typeof EDITIONS)[number]>("Todas");
  const items = edition === "Todas" ? GALLERY : GALLERY.filter((g) => g.edition === edition);

  return (
    <PageShell title="Galería" subtitle="Memoria visual de cada noche Curio.">
      <div className="flex flex-wrap gap-2 mb-8">
        {EDITIONS.map((e) => (
          <button
            key={e}
            onClick={() => setEdition(e)}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest font-display border transition-all ${
              edition === e
                ? "bg-gold text-background border-gold"
                : "border-border text-foreground/70 hover:border-gold hover:text-gold"
            }`}
          >
            {e}
          </button>
        ))}
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {items.map((g, i) => (
          <figure
            key={g.id}
            className="break-inside-avoid relative overflow-hidden border border-border group cursor-pointer hover:border-gold transition-colors"
            style={{
              height: 140 + (i % 4) * 60,
              background: `linear-gradient(135deg, oklch(0.35 0.14 ${g.hue}), oklch(0.25 0.08 ${(g.hue + 60) % 360}))`,
            }}
          >
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/10 transition-colors" />
            {g.type === "video" && (
              <span className="absolute top-2 right-2 text-[10px] uppercase tracking-widest font-display bg-wine text-foreground px-2 py-0.5">
                ▶ Video
              </span>
            )}
            <figcaption className="absolute bottom-0 left-0 right-0 p-3 text-xs">
              <p className="font-display tracking-widest uppercase text-gold">{g.caption}</p>
              <p className="text-foreground/70 text-[10px] mt-0.5">{g.edition}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </PageShell>
  );
}

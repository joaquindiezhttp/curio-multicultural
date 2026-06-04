import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/Navbar";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · CURIO" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Application = {
  id: string;
  name: string;
  brand: string;
  discipline: string;
  city: string;
  instagram: string;
  portfolio: string;
  message: string;
  createdAt: string;
};

function Admin() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    setApps(JSON.parse(localStorage.getItem("curio-applications") || "[]"));
  }, []);

  const remove = (id: string) => {
    const next = apps.filter((a) => a.id !== id);
    setApps(next);
    localStorage.setItem("curio-applications", JSON.stringify(next));
  };

  return (
    <PageShell title="Panel" subtitle={`Postulaciones recibidas (${apps.length})`}>
      {apps.length === 0 ? (
        <p className="text-muted-foreground text-sm">Todavía no hay postulaciones.</p>
      ) : (
        <div className="space-y-4">
          {apps.map((a) => (
            <div key={a.id} className="border border-border bg-card/50 p-5">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gold/80 font-display">{a.discipline} · {a.city}</p>
                  <h3 className="font-blackletter text-2xl text-gold mt-1">{a.brand}</h3>
                  <p className="text-sm text-foreground/80">{a.name} · {a.instagram}</p>
                </div>
                <button
                  onClick={() => remove(a.id)}
                  className="text-xs font-display uppercase tracking-widest text-wine hover:text-destructive"
                >
                  Eliminar
                </button>
              </div>
              {a.portfolio && (
                <a href={a.portfolio} target="_blank" rel="noreferrer" className="text-xs text-gold underline mt-2 inline-block">
                  Portfolio →
                </a>
              )}
              <p className="text-sm mt-3 text-foreground/70 whitespace-pre-wrap">{a.message}</p>
              <p className="text-[10px] mt-3 text-muted-foreground">{new Date(a.createdAt).toLocaleString("es")}</p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}

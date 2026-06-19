import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

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
  nombre: string;
  nombre_artistico: string;
  disciplina: string;
  ciudad: string;
  instagram: string;
  portfolio: string | null;
  mensaje: string;
  created_at: string;
};

function Admin() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      if (!active) return;
      setReady(true);
      const { data: rows, error } = await supabase
        .from("postulaciones")
        .select("*")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) setError(error.message);
      else setApps((rows ?? []) as Application[]);
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("postulaciones").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    setApps((prev) => prev.filter((a) => a.id !== id));
  };

  if (!ready) return <PageShell title="Panel" subtitle="Verificando sesión..."><div /></PageShell>;

  return (
    <PageShell title="Panel" subtitle={`Postulaciones recibidas (${apps.length})`}>
      <div className="flex justify-end mb-4">
        <button
          onClick={signOut}
          className="text-xs font-display uppercase tracking-widest text-foreground/60 hover:text-gold border border-border px-3 py-1"
        >
          Cerrar sesión
        </button>
      </div>
      {error && <p className="text-xs text-destructive mb-4">{error}</p>}
      {loading ? (
        <p className="text-muted-foreground text-sm">Cargando...</p>
      ) : apps.length === 0 ? (
        <p className="text-muted-foreground text-sm">Todavía no hay postulaciones.</p>
      ) : (
        <div className="space-y-4">
          {apps.map((a) => (
            <div key={a.id} className="border border-border bg-card/50 p-5">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gold/80 font-display">{a.disciplina} · {a.ciudad}</p>
                  <h3 className="font-blackletter text-2xl text-gold mt-1">{a.nombre_artistico}</h3>
                  <p className="text-sm text-foreground/80">{a.nombre} · {a.instagram}</p>
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
              <p className="text-sm mt-3 text-foreground/70 whitespace-pre-wrap">{a.mensaje}</p>
              <p className="text-[10px] mt-3 text-muted-foreground">{new Date(a.created_at).toLocaleString("es")}</p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}

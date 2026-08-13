import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_EVENT_SETTINGS, type EventSettings } from "@/lib/event-settings";

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
  const [settings, setSettings] = useState<EventSettings>(DEFAULT_EVENT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      if (data.session.user.app_metadata.role !== "admin") {
        await supabase.auth.signOut();
        navigate({ to: "/auth" });
        return;
      }
      if (!active) return;
      setReady(true);
      const [{ data: rows, error }, { data: eventSettings, error: settingsError }] = await Promise.all([
        supabase.from("postulaciones").select("*").order("created_at", { ascending: false }),
        supabase.from("event_settings").select("*").eq("id", 1).maybeSingle(),
      ]);
      if (!active) return;
      if (error) setError(error.message);
      else setApps((rows ?? []) as Application[]);
      if (settingsError) setError(settingsError.message);
      else if (eventSettings) setSettings(eventSettings as EventSettings);
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

  const saveSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    const payload = {
      title: settings.title.trim(),
      date_label: settings.date_label.trim(),
      venue: settings.venue.trim(),
      ticket_price: Math.max(0, Number(settings.ticket_price)),
      max_tickets_per_order: Math.min(20, Math.max(1, Number(settings.max_tickets_per_order))),
      tickets_enabled: settings.tickets_enabled,
      payment_url: settings.payment_url?.trim() || null,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("event_settings")
      .update(payload)
      .eq("id", 1)
      .select()
      .single();
    if (error) setError(error.message);
    else {
      setSettings(data as EventSettings);
      setSaved(true);
    }
    setSaving(false);
  };

  if (!ready) return <PageShell title="Panel" subtitle="Verificando sesión..."><div /></PageShell>;

  return (
    <PageShell title="Panel" subtitle="Gestión privada de CURIO">
      <div className="flex justify-end mb-4">
        <button
          onClick={signOut}
          className="text-xs font-display uppercase tracking-widest text-foreground/60 hover:text-gold border border-border px-3 py-1"
        >
          Cerrar sesión
        </button>
      </div>
      {error && <p className="text-xs text-destructive mb-4">{error}</p>}
      <form onSubmit={saveSettings} className="mb-10 border border-gold/50 bg-card/50 p-5 md:p-7">
        <div className="mb-6">
          <p className="font-display text-[10px] uppercase tracking-[0.25em] text-wine">Contenido público</p>
          <h2 className="mt-1 font-blackletter text-3xl text-gold">Próximo evento y entradas</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <AdminField label="Nombre del evento" value={settings.title} onChange={(title) => setSettings({ ...settings, title })} />
          <AdminField label="Fecha" value={settings.date_label} onChange={(date_label) => setSettings({ ...settings, date_label })} />
          <AdminField label="Lugar" value={settings.venue} onChange={(venue) => setSettings({ ...settings, venue })} />
          <AdminField label="Precio por entrada" type="number" value={String(settings.ticket_price)} onChange={(value) => setSettings({ ...settings, ticket_price: Number(value) })} />
          <AdminField label="Máximo por compra" type="number" value={String(settings.max_tickets_per_order)} onChange={(value) => setSettings({ ...settings, max_tickets_per_order: Number(value) })} />
          <AdminField label="Enlace de pago" type="url" value={settings.payment_url ?? ""} onChange={(payment_url) => setSettings({ ...settings, payment_url })} placeholder="https://..." />
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={settings.tickets_enabled}
            onChange={(event) => setSettings({ ...settings, tickets_enabled: event.target.checked })}
            className="size-4 accent-[var(--gold)]"
          />
          Habilitar el botón para sacar entradas
        </label>
        <div className="mt-6 flex items-center gap-4">
          <button type="submit" disabled={saving} className="bg-gold px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-background disabled:opacity-50">
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          {saved && <span className="text-xs text-gold">Cambios publicados.</span>}
        </div>
      </form>

      <h2 className="mb-4 font-blackletter text-3xl text-gold">Postulaciones ({apps.length})</h2>
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

function AdminField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "url";
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-display text-[10px] uppercase tracking-[0.2em] text-foreground/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={type !== "url"}
        min={type === "number" ? 0 : undefined}
        className="mt-2 w-full border border-border bg-background/50 px-3 py-3 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}

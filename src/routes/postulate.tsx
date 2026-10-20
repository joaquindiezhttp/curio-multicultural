import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { PageShell } from "@/components/Navbar";
import { DISCIPLINES } from "@/lib/curio-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/postulate")({
  head: () => ({
    meta: [
      { title: "Postulate · CURIO" },
      { name: "description", content: "Formulario de postulación para artistas Curio." },
    ],
  }),
  component: Postulate,
});

function Postulate() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    nombre_artistico: "",
    disciplina: DISCIPLINES[0] as string,
    ciudad: "",
    instagram: "",
    portfolio: "",
    mensaje: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await supabase.from("postulaciones").insert({
      nombre: form.nombre,
      nombre_artistico: form.nombre_artistico,
      disciplina: form.disciplina,
      ciudad: form.ciudad,
      instagram: form.instagram,
      portfolio: form.portfolio || null,
      mensaje: form.mensaje,
    });
    setSubmitting(false);
    if (error) {
      setError("No pudimos enviar tu postulación. Revisá tu conexión e intentá de nuevo, o escribinos por Instagram.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <PageShell title="Recibido" subtitle="Tu postulación llegó al jardín.">
        <div className="border border-gold/60 bg-card/50 p-8 text-center max-w-xl mx-auto">
          <p className="font-heading text-4xl text-oliva">✦ Gracias ✦</p>
          <p className="mt-4 text-foreground/80">
            Vamos a revisar tu propuesta y te escribimos por Instagram si entrás en la próxima edición.
          </p>
          <div className="mt-6">
            <button
              onClick={() => { setDone(false); setForm({ ...form, mensaje: "" }); }}
              className="px-4 py-2 border border-gold text-gold font-display uppercase tracking-widest text-xs hover:bg-gold hover:text-background transition-colors"
            >
              Nueva postulación
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Postulate" subtitle="Si lo tuyo es arte, traelo. Completá el formulario y entrá al jardín Curio.">
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        <Field label="Nombre" value={form.nombre} onChange={(v) => setForm({ ...form, nombre: v })} required />
        <Field label="Nombre artístico / marca" value={form.nombre_artistico} onChange={(v) => setForm({ ...form, nombre_artistico: v })} required />
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-display text-gold/80">Disciplina</label>
          <select
            value={form.disciplina}
            onChange={(e) => setForm({ ...form, disciplina: e.target.value })}
            className="bg-input border border-border px-3 py-3 text-base focus:border-gold outline-none"
          >
            {DISCIPLINES.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <Field label="Ciudad" value={form.ciudad} onChange={(v) => setForm({ ...form, ciudad: v })} required />
        <Field label="Instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} onBlur={() => setForm((f) => (f.instagram && !f.instagram.startsWith("@") ? { ...f, instagram: "@" + f.instagram } : f))} placeholder="@tu.usuario" required />
        <Field label="Portfolio (link)" value={form.portfolio} onChange={(v) => setForm({ ...form, portfolio: v })} placeholder="https://..." />
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-display text-gold/80">Mensaje</label>
          <textarea
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            rows={5}
            maxLength={1000}
            className="bg-input border border-border px-3 py-3 text-base focus:border-gold outline-none resize-none"
            placeholder="Contanos qué traés a Curio..."
            required
          />
        </div>
        {error && <p role="alert" className="md:col-span-2 border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-foreground">{error}</p>}
        <div className="md:col-span-2 flex items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-gold text-background font-display uppercase tracking-[0.25em] text-sm px-6 py-3 hover:bg-wine hover:text-foreground transition-colors disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar postulación"}
          </button>
        </div>
      </form>
    </PageShell>
  );
}

function Field({
  label, value, onChange, onBlur, required, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; onBlur?: () => void; required?: boolean; placeholder?: string }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs uppercase tracking-widest font-display text-gold/80">{label}</label>
      <input
        id={id}
        onBlur={onBlur}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={200}
        placeholder={placeholder}
        className="bg-input border border-border px-3 py-3 text-base focus:border-gold outline-none"
      />
    </div>
  );
}

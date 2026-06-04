import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Navbar";
import { DISCIPLINES } from "@/lib/curio-data";

export const Route = createFileRoute("/postulate")({
  head: () => ({
    meta: [
      { title: "Postulate · CURIO" },
      { name: "description", content: "Formulario de postulación para artistas Curio." },
    ],
  }),
  component: Postulate,
});

const STORAGE_KEY = "curio-applications";

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

function Postulate() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    discipline: DISCIPLINES[0] as string,
    city: "",
    instagram: "",
    portfolio: "",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const list: Application[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    list.unshift({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setDone(true);
  };

  if (done) {
    return (
      <PageShell title="Recibido" subtitle="Tu postulación llegó al jardín.">
        <div className="border border-gold/60 bg-card/50 p-8 text-center max-w-xl mx-auto">
          <p className="font-blackletter text-4xl text-gold">✦ Gracias ✦</p>
          <p className="mt-4 text-foreground/80">
            Vamos a revisar tu propuesta y te escribimos por Instagram si entrás en la próxima edición.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => { setDone(false); setForm({ ...form, message: "" }); }}
              className="px-4 py-2 border border-gold text-gold font-display uppercase tracking-widest text-xs hover:bg-gold hover:text-background transition-colors"
            >
              Nueva postulación
            </button>
            <Link
              to="/admin"
              className="px-4 py-2 border border-border text-foreground/70 font-display uppercase tracking-widest text-xs hover:border-wine hover:text-wine transition-colors"
            >
              Panel admin
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Postulate" subtitle="Si lo tuyo es arte, traelo. Completá el formulario y entrá al jardín Curio.">
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field label="Nombre artístico / marca" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} required />
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-display text-gold/80">Disciplina</label>
          <select
            value={form.discipline}
            onChange={(e) => setForm({ ...form, discipline: e.target.value })}
            className="bg-input border border-border px-3 py-2 text-sm focus:border-gold outline-none"
          >
            {DISCIPLINES.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <Field label="Ciudad" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
        <Field label="Instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} placeholder="@tu.usuario" required />
        <Field label="Portfolio (link)" value={form.portfolio} onChange={(v) => setForm({ ...form, portfolio: v })} placeholder="https://..." />
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-display text-gold/80">Mensaje</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            maxLength={1000}
            className="bg-input border border-border px-3 py-2 text-sm focus:border-gold outline-none resize-none"
            placeholder="Contanos qué traés a Curio..."
            required
          />
        </div>
        <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
          <p className="text-xs text-muted-foreground">Los datos se guardan en este dispositivo (demo).</p>
          <button
            type="submit"
            className="bg-gold text-background font-display uppercase tracking-[0.25em] text-sm px-6 py-3 hover:bg-wine hover:text-foreground transition-colors"
          >
            Enviar postulación
          </button>
        </div>
      </form>
    </PageShell>
  );
}

function Field({
  label, value, onChange, required, placeholder,
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-widest font-display text-gold/80">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={200}
        placeholder={placeholder}
        className="bg-input border border-border px-3 py-2 text-sm focus:border-gold outline-none"
      />
    </div>
  );
}

import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceso · CURIO" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user.app_metadata.role === "admin") navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user.app_metadata.role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("Esta cuenta no tiene permisos de administración.");
      }
      router.invalidate();
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="Acceso" subtitle="Panel privado Curio.">
      <form onSubmit={submit} className="max-w-md space-y-5 border border-border bg-card/50 p-6">
        <p className="text-xs font-display uppercase tracking-widest text-gold">Acceso de administración</p>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-display text-gold/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-input border border-border px-3 py-2 text-sm focus:border-gold outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest font-display text-gold/80">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-input border border-border px-3 py-2 text-sm focus:border-gold outline-none"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-background font-display uppercase tracking-[0.25em] text-sm px-6 py-3 hover:bg-wine hover:text-foreground transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Ingresar"}
        </button>
      </form>
    </PageShell>
  );
}

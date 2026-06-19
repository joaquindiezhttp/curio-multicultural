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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
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
        <div className="flex gap-2 text-xs font-display uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`px-3 py-1 border ${mode === "signin" ? "border-gold text-gold" : "border-border text-foreground/60"}`}
          >Ingresar</button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`px-3 py-1 border ${mode === "signup" ? "border-gold text-gold" : "border-border text-foreground/60"}`}
          >Crear cuenta</button>
        </div>
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
          {loading ? "..." : mode === "signin" ? "Ingresar" : "Crear cuenta"}
        </button>
      </form>
    </PageShell>
  );
}

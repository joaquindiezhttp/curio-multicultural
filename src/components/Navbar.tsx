import { EVENT } from "@/lib/event";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { CurioMark } from "./CurioFlower";

const LINKS = [
  { to: "/artistas", label: "Artistas" },
  { to: "/agenda", label: "Agenda" },
  { to: "/galeria", label: "Galería" },
  { to: "/postulate", label: "Postulate" },
  { to: "/entradas", label: "Entradas" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
          <span className="transition-transform group-hover:rotate-45 duration-700">
            <CurioMark size={56} />
          </span>
          <span className="font-heading text-2xl text-oliva tracking-wider">CURIO</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center border border-border text-gold md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {mobileOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Navegación principal"
          className="border-t border-border/60 bg-background px-4 py-3 md:hidden"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="border border-border px-3 py-3 text-left font-display text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:border-gold hover:text-gold"
                activeProps={{ className: "border-gold text-gold" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-16 animate-fade-up">
        <div className="mb-10 md:mb-14">
          <h1 className="font-heading text-5xl md:text-7xl text-oliva leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-muted-foreground text-sm md:text-base">
              {subtitle}
            </p>
          )}
          <div className="mt-4 h-px w-24 bg-gold/60" />
        </div>
        {children}
      </main>
      <footer className="border-t border-border/60 py-8 mt-16 text-center text-xs text-muted-foreground font-display tracking-widest">
        <a href={EVENT.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
          @{EVENT.instagram}
        </a>
        <span className="mx-2">·</span>
        CURIO · MULTICULTURAL EVENTS · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

import { useState } from "react";

export default function CurioAgent() {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full max-w-3xl mx-auto mt-16 mb-8 px-2">
      <div className="flex flex-col items-center text-center mb-5">
        <span
          className="font-display uppercase"
          style={{
            color: "var(--gold)",
            opacity: 0.7,
            letterSpacing: "0.4em",
            fontSize: "clamp(0.6rem, 1.3vw, 0.72rem)",
          }}
        >
          Oráculo · Conversá con
        </span>
        <h2
          className="font-heading mt-2 leading-none"
          style={{
            color: "var(--oliva)",
                                                            fontSize: "clamp(2rem, 5vw, 3rem)",
            textShadow: "3px 3px 0 var(--musgo)",
          }}
        >
          Curio
        </h2>
      </div>

      <div
        className="relative rounded-2xl p-[1px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,164,55,0.6), rgba(107,26,26,0.45) 50%, rgba(212,164,55,0.5))",
          boxShadow:
            "0 30px 80px -30px rgba(0,0,0,0.7), 0 0 60px -20px rgba(184,166,50,0.25)",
        }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--moss)",
            border: "1px solid rgba(212,164,55,0.15)",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{
              borderBottom: "1px solid rgba(212,164,55,0.18)",
              background:
                "linear-gradient(180deg, rgba(107,26,26,0.25), transparent)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }}
              />
              <span
                className="font-display uppercase"
                style={{
                  color: "var(--gold)",
                  letterSpacing: "0.3em",
                  fontSize: "0.65rem",
                  opacity: 0.85,
                }}
              >
                Sesión abierta
              </span>
            </div>
            <span
              className="font-heading"
              style={{ color: "var(--gold)", opacity: 0.7, fontSize: "0.9rem" }}
            >
              ✦
            </span>
          </div>

          {open ? (
            <iframe
            src="https://my-agent-sorta10.vercel.app/"
            title="Chat de Curio"
            style={{
              width: "100%",
              height: 600,
              border: 0,
              display: "block",
              background: "var(--moss)",
            }}
          />
          ) : (
            <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
              <p className="max-w-sm text-sm text-foreground/75">
                Preguntale a Curio por el evento, los artistas o cómo sumarte.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="bg-gold px-6 py-3 font-display text-xs uppercase tracking-[0.22em] text-background transition-colors hover:bg-wine hover:text-foreground"
              >
                Abrir chat
              </button>
            </div>
          )}
        </div>
      </div>

      <p
        className="font-display uppercase text-center mt-4"
        style={{
          color: "var(--gold)",
          opacity: 0.55,
          letterSpacing: "0.35em",
          fontSize: "clamp(0.55rem, 1.1vw, 0.68rem)",
        }}
      >
        Preguntá · Escuchá · Entrá al jardín
      </p>
    </section>
  );
}

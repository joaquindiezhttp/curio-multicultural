import { createFileRoute } from "@tanstack/react-router";
import { CurioFlower } from "@/components/CurioFlower";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CURIO · Eventos Multiculturales" },
      { name: "description", content: "Una flor de cinco pétalos. Cinco mundos. Música, arte, cuerpo y ciudad." },
      { property: "og:title", content: "CURIO" },
      { property: "og:description", content: "Eventos multiculturales · underground · urbano · artístico" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 md:py-10 text-center">
      {/* Top: title + subtitle */}
      <header className="w-full flex flex-col items-center">
        <h1
          className="font-blackletter text-gold leading-none"
          style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            color: "var(--gold)",
            textShadow: "0 0 24px rgba(212,164,55,0.25)",
          }}
        >
          CURIO
        </h1>
        <p
          className="mt-3 font-display uppercase"
          style={{
            color: "var(--gold)",
            opacity: 0.75,
            letterSpacing: "0.5em",
            fontSize: "clamp(0.6rem, 1.6vw, 0.8rem)",
          }}
        >
          Multicultural · Underground · Vivo
        </p>
      </header>

      {/* Middle: flower */}
      <div className="flex-1 w-full flex items-center justify-center my-6">
        <CurioFlower size={560} />
      </div>

      {/* Bottom hint */}
      <p
        className="font-display uppercase"
        style={{
          color: "var(--gold)",
          opacity: 0.7,
          letterSpacing: "0.35em",
          fontSize: "clamp(0.6rem, 1.4vw, 0.75rem)",
        }}
      >
        Tocá un pétalo · Entrá al jardín
      </p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CurioFlower } from "@/components/CurioFlower";
import curioTitleAsset from "@/assets/curio-title.png.asset.json";
import CurioAgent from "@/components/CurioAgent";

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
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-6 md:py-8 text-center">
      {/* Top: title + subtitle */}
      <header className="w-full flex flex-col items-center">
        <h1 className="leading-none m-0">
          <img
            src={curioTitleAsset.url}
            alt="CURIO"
            className="w-auto"
            style={{
              height: "clamp(4rem, 14vw, 9rem)",
              filter: "drop-shadow(0 0 24px rgba(212,164,55,0.25))",
            }}
          />
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
      <div className="w-full flex items-center justify-center -mt-8 md:-mt-16 mb-2 overflow-visible">
        <CurioFlower size={660} />
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
      <CurioAgent />
    </div>
  );
}

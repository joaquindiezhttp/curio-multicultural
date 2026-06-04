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
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, transparent 40%, oklch(0.18 0.04 145) 100%)",
        }}
      />
      <div className="relative text-center mb-6 md:mb-2 z-10">
        <p className="font-display text-xs md:text-sm tracking-[0.4em] text-gold/70 uppercase">
          Multicultural · Underground · Vivo
        </p>
        <h1 className="font-blackletter text-6xl md:text-8xl text-gold mt-2 leading-none"
          style={{ textShadow: "0 0 30px oklch(0.82 0.16 88 / 0.3)" }}>
          CURIO
        </h1>
      </div>
      <div className="relative z-10">
        <CurioFlower size={620} />
      </div>
      <p className="relative z-10 mt-4 md:mt-2 text-center text-xs md:text-sm text-muted-foreground max-w-md font-display tracking-widest uppercase">
        Tocá un pétalo · Entrá al jardín
      </p>
    </div>
  );
}

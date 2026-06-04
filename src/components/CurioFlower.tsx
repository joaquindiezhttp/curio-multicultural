import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import flowerSvg from "@/assets/curio-flower.svg";

type Petal = {
  id: string;
  label: string;
  to: string;
  // Position of the label relative to the flower container (percentages)
  top: string;
  left: string;
  // Approximate hit-area for clicking the petal (percentages)
  hit: { top: string; left: string; width: string; height: string };
};

// The source SVG aspect ratio is 861.15 x 608.88 (~1.414 : 1).
// Petal angles in the artwork (clockwise from top):
//   top, top-right, bottom-right, bottom-left, top-left
const PETALS: Petal[] = [
  {
    id: "artistas",
    label: "ARTISTAS",
    to: "/artistas",
    top: "-6%",
    left: "50%",
    hit: { top: "0%", left: "38%", width: "24%", height: "30%" },
  },
  {
    id: "agenda",
    label: "AGENDA",
    to: "/agenda",
    top: "32%",
    left: "104%",
    hit: { top: "18%", left: "65%", width: "30%", height: "30%" },
  },
  {
    id: "galeria",
    label: "GALERÍA",
    to: "/galeria",
    top: "82%",
    left: "100%",
    hit: { top: "55%", left: "60%", width: "32%", height: "35%" },
  },
  {
    id: "postulate",
    label: "POSTULATE",
    to: "/postulate",
    top: "82%",
    left: "0%",
    hit: { top: "55%", left: "8%", width: "32%", height: "35%" },
  },
  {
    id: "ciudades",
    label: "CIUDADES",
    to: "/ciudades",
    top: "32%",
    left: "-4%",
    hit: { top: "18%", left: "5%", width: "30%", height: "30%" },
  },
];

export function CurioFlower({ size = 560 }: { size?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  // Container matches the SVG aspect ratio
  const width = size;
  const height = Math.round(size * (608.88 / 861.15));

  return (
    <div
      className="relative mx-auto"
      style={{
        width,
        height,
        maxWidth: "94vw",
      }}
    >
      <img
        src={flowerSvg}
        alt="Curio — flor de cinco pétalos"
        className="absolute inset-0 h-full w-full select-none pointer-events-none"
        draggable={false}
        style={{
          filter: hovered
            ? "drop-shadow(0 0 28px rgba(138,36,36,0.55))"
            : "drop-shadow(0 10px 24px rgba(0,0,0,0.55))",
          transition: "filter 300ms ease",
        }}
      />

      {/* Clickable petal hit-areas */}
      {PETALS.map((p) => (
        <button
          key={`hit-${p.id}`}
          type="button"
          aria-label={p.label}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(p.id)}
          onBlur={() => setHovered(null)}
          onClick={() => navigate({ to: p.to })}
          className="absolute cursor-pointer bg-transparent border-0 p-0 m-0 rounded-full focus:outline-none"
          style={{
            top: p.hit.top,
            left: p.hit.left,
            width: p.hit.width,
            height: p.hit.height,
          }}
        />
      ))}

      {/* Floating labels outside each petal */}
      {PETALS.map((p) => {
        const isHover = hovered === p.id;
        return (
          <span
            key={`label-${p.id}`}
            className="absolute uppercase pointer-events-none select-none whitespace-nowrap"
            style={{
              top: p.top,
              left: p.left,
              transform: "translate(-50%, -50%)",
              color: "var(--gold)",
              fontFamily: "Pirata One, serif",
              letterSpacing: "0.28em",
              fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
              opacity: isHover ? 1 : 0.85,
              textShadow: isHover
                ? "0 0 14px rgba(212,164,55,0.55), 0 2px 6px rgba(0,0,0,0.7)"
                : "0 2px 6px rgba(0,0,0,0.7)",
              transition: "opacity 200ms ease, text-shadow 200ms ease",
            }}
          >
            {p.label}
          </span>
        );
      })}
    </div>
  );
}

export function CurioMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src={flowerSvg}
      alt="Curio"
      width={size}
      height={Math.round(size * (608.88 / 861.15))}
      style={{ display: "inline-block" }}
    />
  );
}

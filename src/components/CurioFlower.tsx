import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import flowerSvg from "@/assets/curio-flower.svg";

type Petal = {
  id: string;
  label: string;
  to: string;
  // Petal center as % of the flower container — label sits here too
  cx: string;
  cy: string;
  // Hit-area size as % of container
  w: string;
  h: string;
};

const PETALS: Petal[] = [
  { id: "artistas",  label: "ARTISTAS",  to: "/artistas",  cx: "50%", cy: "18%", w: "22%", h: "28%" },
  { id: "agenda",    label: "AGENDA",    to: "/agenda",    cx: "86%", cy: "42%", w: "22%", h: "30%" },
  { id: "galeria",   label: "GALERÍA",   to: "/galeria",   cx: "74%", cy: "82%", w: "24%", h: "30%" },
  { id: "postulate", label: "POSTULATE", to: "/postulate", cx: "26%", cy: "82%", w: "24%", h: "30%" },
  { id: "ciudades",  label: "CIUDADES",  to: "/ciudades",  cx: "14%", cy: "42%", w: "22%", h: "30%" },
];

const GOLD = "#D4AF37";

export function CurioFlower({ size = 520 }: { size?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const go = (to: string) => navigate({ to });

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size, maxWidth: "94vw", maxHeight: "94vw" }}
    >
      <img
        src={flowerSvg}
        alt="Curio — flor de cinco pétalos"
        className="absolute inset-0 h-full w-full select-none pointer-events-none"
        draggable={false}
        style={{
          objectFit: "contain",
          filter: hovered
            ? "drop-shadow(0 0 28px rgba(138,36,36,0.55)) brightness(1.05)"
            : "drop-shadow(0 10px 24px rgba(0,0,0,0.55))",
          transition: "filter 280ms ease",
        }}
      />

      {/* Petal hit-areas */}
      {PETALS.map((p) => (
        <button
          key={`hit-${p.id}`}
          type="button"
          aria-label={p.label}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(p.id)}
          onBlur={() => setHovered(null)}
          onClick={() => go(p.to)}
          className="absolute cursor-pointer bg-transparent border-0 p-0 m-0 rounded-full focus:outline-none"
          style={{
            top: p.cy,
            left: p.cx,
            width: p.w,
            height: p.h,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Center "C" → home */}
      <button
        type="button"
        aria-label="Inicio"
        onClick={() => go("/")}
        className="absolute cursor-pointer bg-transparent border-0 p-0 m-0 rounded-full focus:outline-none"
        style={{
          top: "50%",
          left: "50%",
          width: "16%",
          height: "22%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Labels INSIDE each petal */}
      {PETALS.map((p) => {
        const isHover = hovered === p.id;
        return (
          <button
            key={`label-${p.id}`}
            type="button"
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(p.id)}
            onBlur={() => setHovered(null)}
            onClick={() => go(p.to)}
            className="absolute uppercase whitespace-nowrap cursor-pointer bg-transparent border-0 p-0 m-0 focus:outline-none"
            style={{
              top: p.cy,
              left: p.cx,
              transform: "translate(-50%, -50%)",
              color: GOLD,
              fontFamily: "Pirata One, serif",
              letterSpacing: "2px",
              fontSize: "13px",
              opacity: isHover ? 1 : 0.95,
              textShadow: isHover
                ? "0 0 12px rgba(212,175,55,0.7), 0 2px 4px rgba(0,0,0,0.85)"
                : "0 2px 4px rgba(0,0,0,0.85)",
              transition: "opacity 200ms ease, text-shadow 200ms ease",
            }}
          >
            {p.label}
          </button>
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
      height={size}
      style={{ display: "inline-block", objectFit: "contain" }}
    />
  );
}

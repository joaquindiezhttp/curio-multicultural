import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import flowerSvg from "@/assets/curio-flower.svg";

type Petal = {
  id: string;
  label: string;
  to: string;
  // Petal click hit-area, as % of the flower container
  cx: string;
  cy: string;
  w: string;
  h: string;
  // Label offset from flower CENTER, in pixels
  dx: number;
  dy: number;
};

const PETALS: Petal[] = [
  { id: "artistas",  label: "ARTISTAS",  to: "/artistas",  cx: "50%", cy: "14%", w: "22%", h: "30%", dx: 0,    dy: -180 },
  { id: "agenda",    label: "AGENDA",    to: "/agenda",    cx: "90%", cy: "42%", w: "20%", h: "32%", dx: 190,  dy: 0 },
  { id: "galeria",   label: "GALERÍA",   to: "/galeria",   cx: "78%", cy: "86%", w: "22%", h: "30%", dx: 170,  dy: 130 },
  { id: "postulate", label: "POSTULATE", to: "/postulate", cx: "22%", cy: "86%", w: "22%", h: "30%", dx: -170, dy: 130 },
  { id: "ciudades",  label: "CIUDADES",  to: "/ciudades",  cx: "10%", cy: "42%", w: "20%", h: "32%", dx: -190, dy: 0 },
];

const GOLD = "#D4AF37";

export function CurioFlower({ size = 300 }: { size?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const flowerW = size;
  const flowerH = size; // treat as ~300x300 per spec

  const go = (to: string) => navigate({ to });

  // Outer wrapper is large enough so labels (max ~190px from center + label width)
  // never clip. Flower itself is centered inside.
  const wrapperSize = size + 220 * 2; // ~740px

  return (
    <div
      className="relative mx-auto"
      style={{
        width: wrapperSize,
        height: wrapperSize,
        maxWidth: "100vw",
      }}
    >
      {/* Flower (centered) */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: flowerW,
          height: flowerH,
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={flowerSvg}
          alt="Curio — flor de cinco pétalos"
          className="absolute inset-0 h-full w-full select-none pointer-events-none"
          draggable={false}
          style={{
            objectFit: "contain",
            filter: hovered
              ? "drop-shadow(0 0 28px rgba(138,36,36,0.55)) brightness(1.04)"
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

        {/* Center C → home */}
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
      </div>

      {/* Labels — positioned from the flower CENTER using pixel offsets */}
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
              top: `calc(50% + ${p.dy}px)`,
              left: `calc(50% + ${p.dx}px)`,
              transform: "translate(-50%, -50%)",
              color: GOLD,
              fontFamily: "Pirata One, serif",
              letterSpacing: "2px",
              fontSize: "13px",
              opacity: isHover ? 1 : 0.9,
              textShadow: isHover
                ? "0 0 14px rgba(212,175,55,0.65), 0 2px 6px rgba(0,0,0,0.7)"
                : "0 2px 6px rgba(0,0,0,0.7)",
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

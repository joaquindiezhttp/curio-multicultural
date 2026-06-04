import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import flowerSvg from "@/assets/curio-flower.svg";

type Petal = {
  id: string;
  label: string;
  to: string;
  // Petal center as % of container (used for the clickable hit area)
  cx: string;
  cy: string;
  // Hit area size as % of container
  w: string;
  h: string;
  // Label positioning (style object merged onto the label span)
  labelStyle: React.CSSProperties;
};

// Layout calibrated to the provided SVG (viewBox 861.15 x 608.88).
// Petals: top, right, bottom-right, bottom-left, left.
const PETALS: Petal[] = [
  {
    id: "artistas",
    label: "ARTISTAS",
    to: "/artistas",
    cx: "50%",
    cy: "14%",
    w: "22%",
    h: "30%",
    // Centered directly above the top petal, ~20px above it
    labelStyle: {
      top: "-28px",
      left: "50%",
      transform: "translate(-50%, 0)",
    },
  },
  {
    id: "agenda",
    label: "AGENDA",
    to: "/agenda",
    cx: "90%",
    cy: "42%",
    w: "20%",
    h: "32%",
    // Right of the right petal, vertically centered with it
    labelStyle: {
      top: "42%",
      left: "calc(100% + 14px)",
      transform: "translate(0, -50%)",
    },
  },
  {
    id: "galeria",
    label: "GALERÍA",
    to: "/galeria",
    cx: "78%",
    cy: "86%",
    w: "22%",
    h: "30%",
    // Right of the bottom-right petal
    labelStyle: {
      top: "86%",
      left: "calc(100% + 14px)",
      transform: "translate(0, -50%)",
    },
  },
  {
    id: "postulate",
    label: "POSTULATE",
    to: "/postulate",
    cx: "22%",
    cy: "86%",
    w: "22%",
    h: "30%",
    // Left of the bottom-left petal
    labelStyle: {
      top: "86%",
      right: "calc(100% + 14px)",
      transform: "translate(0, -50%)",
    },
  },
  {
    id: "ciudades",
    label: "CIUDADES",
    to: "/ciudades",
    cx: "10%",
    cy: "42%",
    w: "20%",
    h: "32%",
    // Left of the left petal
    labelStyle: {
      top: "42%",
      right: "calc(100% + 14px)",
      transform: "translate(0, -50%)",
    },
  },
];

export function CurioFlower({ size = 560 }: { size?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  const width = size;
  const height = Math.round(size * (608.88 / 861.15));

  const go = (to: string) => navigate({ to });

  return (
    <div
      className="relative mx-auto"
      style={{ width, height, maxWidth: "94vw" }}
    >
      <img
        src={flowerSvg}
        alt="Curio — flor de cinco pétalos"
        className="absolute inset-0 h-full w-full select-none pointer-events-none"
        draggable={false}
        style={{
          filter: hovered
            ? "drop-shadow(0 0 28px rgba(138,36,36,0.55)) brightness(1.04)"
            : "drop-shadow(0 10px 24px rgba(0,0,0,0.55))",
          transition: "filter 280ms ease",
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

      {/* Floating labels — each label is also clickable and triggers the same hover state */}
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
              ...p.labelStyle,
              color: "var(--gold)",
              fontFamily: "Pirata One, serif",
              letterSpacing: "2px",
              fontSize: "13px",
              opacity: isHover ? 1 : 0.85,
              textShadow: isHover
                ? "0 0 14px rgba(212,164,55,0.65), 0 2px 6px rgba(0,0,0,0.7)"
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
      height={Math.round(size * (608.88 / 861.15))}
      style={{ display: "inline-block" }}
    />
  );
}

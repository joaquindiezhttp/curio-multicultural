import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Petal = {
  id: string;
  label: string;
  to: string;
  angle: number; // degrees, 0 = right, -90 = up
};

const PETALS: Petal[] = [
  { id: "artistas", label: "ARTISTAS", to: "/artistas", angle: -90 },
  { id: "agenda", label: "AGENDA", to: "/agenda", angle: -18 },
  { id: "galeria", label: "GALERÍA", to: "/galeria", angle: 54 },
  { id: "postulate", label: "POSTULATE", to: "/postulate", angle: 126 },
  { id: "ciudades", label: "CIUDADES", to: "/ciudades", angle: 198 },
];

// Chunky Murakami-style petal: narrow base, fat rounded teardrop top
// Points "up" from origin (0,0)
const PETAL_PATH =
  "M0,0 C-130,-30 -135,-170 0,-215 C135,-170 130,-30 0,0 Z";

const WINE = "#6B1A1A";
const WINE_DEEP = "#3d0d0d";
const WINE_HOVER = "#8a2424";
const MOSS = "#162016";
const GOLD = "#d4a437";

const LABEL_RADIUS = 135; // distance from center to label center

export function CurioFlower({ size = 560 }: { size?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size, maxWidth: "92vw", maxHeight: "92vw" }}
    >
      <svg
        viewBox="-280 -280 560 560"
        className="absolute inset-0 h-full w-full"
        aria-label="Curio flower navigation"
      >
        <defs>
          <radialGradient id="petalGrad" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor={WINE} />
            <stop offset="100%" stopColor={WINE_DEEP} />
          </radialGradient>
          <radialGradient id="petalGradHover" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor={WINE_HOVER} />
            <stop offset="100%" stopColor={WINE} />
          </radialGradient>
        </defs>

        {/* Petals */}
        {PETALS.map((p) => {
          const isHover = hovered === p.id;
          return (
            <g
              key={p.id}
              transform={`rotate(${p.angle})`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate({ to: p.to })}
              className="cursor-pointer transition-all duration-300"
              style={{
                filter: isHover
                  ? `drop-shadow(0 0 18px ${WINE_HOVER})`
                  : "drop-shadow(0 6px 12px rgba(0,0,0,0.55))",
                transformOrigin: "0 0",
              }}
            >
              <path
                d={PETAL_PATH}
                fill={isHover ? "url(#petalGradHover)" : "url(#petalGrad)"}
                stroke={GOLD}
                strokeOpacity={isHover ? 0.7 : 0.3}
                strokeWidth={1.2}
              />
            </g>
          );
        })}

        {/* Labels — always upright, centered on each petal */}
        {PETALS.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const x = LABEL_RADIUS * Math.cos(rad);
          const y = LABEL_RADIUS * Math.sin(rad);
          return (
            <text
              key={`label-${p.id}`}
              x={x}
              y={y + 5}
              textAnchor="middle"
              fontSize="15"
              fill={GOLD}
              className="pointer-events-none select-none"
              style={{
                fontFamily: "Pirata One, serif",
                letterSpacing: "0.18em",
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              {p.label}
            </text>
          );
        })}

        {/* Center disc */}
        <g>
          <circle r="62" fill={MOSS} stroke={GOLD} strokeWidth={2} />
          <circle r="54" fill="none" stroke={GOLD} strokeOpacity={0.35} strokeWidth={0.5} strokeDasharray="2 4" />
          <text
            x="0"
            y="24"
            textAnchor="middle"
            fontSize="74"
            fill={GOLD}
            style={{ fontFamily: "UnifrakturCook, serif", fontWeight: 700 }}
          >
            C
          </text>
        </g>
      </svg>
    </div>
  );
}

export function CurioMark({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="-280 -280 560 560" width={size} height={size} aria-label="Curio">
      {PETALS.map((p) => (
        <g key={p.id} transform={`rotate(${p.angle})`}>
          <path d={PETAL_PATH} fill={WINE} stroke={GOLD} strokeWidth={6} />
        </g>
      ))}
      <circle r="70" fill={MOSS} stroke={GOLD} strokeWidth={6} />
      <text
        x="0"
        y="30"
        textAnchor="middle"
        fontSize="100"
        fill={GOLD}
        style={{ fontFamily: "UnifrakturCook, serif", fontWeight: 700 }}
      >
        C
      </text>
    </svg>
  );
}

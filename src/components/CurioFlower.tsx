import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Petal = {
  id: string;
  label: string;
  to: string;
  angle: number;
};

// 5 perfectly symmetric petals, top petal pointing up (-90deg)
const PETALS: Petal[] = [
  { id: "artistas", label: "ARTISTAS", to: "/artistas", angle: -90 },
  { id: "agenda", label: "AGENDA", to: "/agenda", angle: -18 },
  { id: "galeria", label: "GALERÍA", to: "/galeria", angle: 54 },
  { id: "postulate", label: "POSTULATE", to: "/postulate", angle: 126 },
  { id: "ciudades", label: "CIUDADES", to: "/ciudades", angle: 198 },
];

// Organic symmetric petal pointing up from origin (0,0)
const PETAL_PATH =
  "M0,0 C-55,-30 -75,-110 -45,-180 C-20,-235 20,-235 45,-180 C75,-110 55,-30 0,0 Z";

const WINE = "#6B1A1A";
const WINE_DEEP = "#3d0d0d";
const WINE_HOVER = "#8a2424";
const MOSS = "#162016";
const GOLD = "#d4a437";

export function CurioFlower({ size = 560 }: { size?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size, maxWidth: "92vw", maxHeight: "92vw" }}
    >
      <svg
        viewBox="-300 -300 600 600"
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

        {PETALS.map((p) => {
          const isHover = hovered === p.id;
          return (
            <g
              key={p.id}
              transform={`rotate(${p.angle})`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate({ to: p.to })}
              className="cursor-pointer transition-all duration-500"
              style={{
                filter: isHover
                  ? `drop-shadow(0 0 16px ${WINE_HOVER})`
                  : "drop-shadow(0 4px 10px rgba(0,0,0,0.6))",
                transformOrigin: "0 0",
              }}
            >
              <path
                d={PETAL_PATH}
                fill={isHover ? "url(#petalGradHover)" : "url(#petalGrad)"}
                stroke={GOLD}
                strokeOpacity={isHover ? 0.6 : 0.25}
                strokeWidth={1}
              />
              {/* subtle center vein */}
              <path
                d="M0,-10 Q0,-100 0,-200"
                fill="none"
                stroke={GOLD}
                strokeOpacity={0.2}
                strokeWidth="0.6"
              />
            </g>
          );
        })}

        {/* Center disc */}
        <g>
          <circle r="64" fill={MOSS} stroke={GOLD} strokeWidth={2} />
          <circle r="56" fill="none" stroke={GOLD} strokeOpacity={0.35} strokeWidth={0.5} strokeDasharray="2 4" />
          <text
            x="0"
            y="24"
            textAnchor="middle"
            fontSize="78"
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
    <svg viewBox="-300 -300 600 600" width={size} height={size} aria-label="Curio">
      {PETALS.map((p) => (
        <g key={p.id} transform={`rotate(${p.angle})`}>
          <path d={PETAL_PATH} fill={WINE} stroke={GOLD} strokeWidth={6} />
        </g>
      ))}
      <circle r="72" fill={MOSS} stroke={GOLD} strokeWidth={6} />
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

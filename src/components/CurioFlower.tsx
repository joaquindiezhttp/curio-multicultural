import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Petal = {
  id: string;
  label: string;
  to: string;
  angle: number;
};

const PETALS: Petal[] = [
  { id: "artistas", label: "ARTISTAS", to: "/artistas", angle: -90 },
  { id: "agenda", label: "AGENDA", to: "/agenda", angle: -18 },
  { id: "galeria", label: "GALERÍA", to: "/galeria", angle: 54 },
  { id: "postulate", label: "POSTULATE", to: "/postulate", angle: 126 },
  { id: "ciudades", label: "CIUDADES", to: "/ciudades", angle: 198 },
];

// Organic petal path — hand-drawn feel
const PETAL_PATH =
  "M0,0 C-55,-30 -75,-110 -45,-180 C-20,-235 20,-235 45,-180 C75,-110 55,-30 0,0 Z";

export function CurioFlower({ size = 560 }: { size?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative"
      style={{ width: size, height: size, maxWidth: "92vw", maxHeight: "92vw" }}
    >
      <svg
        viewBox="-300 -300 600 600"
        className="absolute inset-0 h-full w-full animate-slow-spin"
        style={{ animationPlayState: hovered ? "paused" : "running" }}
        aria-label="Curio flower navigation"
      >
        <defs>
          <radialGradient id="petalGrad" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="oklch(0.45 0.16 25)" />
            <stop offset="60%" stopColor="oklch(0.32 0.14 22)" />
            <stop offset="100%" stopColor="oklch(0.22 0.08 25)" />
          </radialGradient>
          <radialGradient id="petalGradHover" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="oklch(0.82 0.16 88)" />
            <stop offset="70%" stopColor="oklch(0.55 0.18 50)" />
            <stop offset="100%" stopColor="oklch(0.38 0.16 22)" />
          </radialGradient>
          <filter id="rough">
            <feTurbulence baseFrequency="0.02" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="6" />
          </filter>
        </defs>

        {PETALS.map((p) => {
          const isHover = hovered === p.id;
          return (
            <Link key={p.id} to={p.to}>
              <g
                transform={`rotate(${p.angle})`}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer transition-all duration-500"
                style={{
                  filter: isHover
                    ? "drop-shadow(0 0 18px oklch(0.82 0.16 88 / 0.7))"
                    : "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
                  transformOrigin: "0 0",
                }}
              >
                <path
                  d={PETAL_PATH}
                  fill={isHover ? "url(#petalGradHover)" : "url(#petalGrad)"}
                  stroke="oklch(0.82 0.16 88 / 0.5)"
                  strokeWidth={isHover ? 2 : 1}
                  style={{ filter: "url(#rough)" }}
                />
                {/* Veins */}
                <path
                  d="M0,0 Q -10,-80 0,-200"
                  fill="none"
                  stroke="oklch(0.82 0.16 88 / 0.4)"
                  strokeWidth="0.8"
                />
                <text
                  x="0"
                  y="-130"
                  textAnchor="middle"
                  className="font-blackletter pointer-events-none select-none"
                  fill={isHover ? "oklch(0.22 0.04 145)" : "oklch(0.88 0.14 88)"}
                  fontSize="22"
                  transform={`rotate(${-p.angle})`}
                  style={{ fontFamily: "Pirata One, serif", letterSpacing: "0.1em" }}
                >
                  {p.label}
                </text>
              </g>
            </Link>
          );
        })}

        {/* Center logo */}
        <g>
          <circle
            r="62"
            fill="oklch(0.22 0.04 145)"
            stroke="oklch(0.82 0.16 88)"
            strokeWidth="2.5"
          />
          <circle
            r="55"
            fill="none"
            stroke="oklch(0.82 0.16 88 / 0.4)"
            strokeWidth="0.5"
            strokeDasharray="3 4"
          />
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontSize="80"
            fill="oklch(0.82 0.16 88)"
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
          <path
            d={PETAL_PATH}
            fill="oklch(0.38 0.16 22)"
            stroke="oklch(0.82 0.16 88)"
            strokeWidth="6"
          />
        </g>
      ))}
      <circle r="70" fill="oklch(0.22 0.04 145)" stroke="oklch(0.82 0.16 88)" strokeWidth="6" />
      <text
        x="0"
        y="28"
        textAnchor="middle"
        fontSize="100"
        fill="oklch(0.82 0.16 88)"
        style={{ fontFamily: "UnifrakturCook, serif", fontWeight: 700 }}
      >
        C
      </text>
    </svg>
  );
}

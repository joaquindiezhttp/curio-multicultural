import { useNavigate } from "@tanstack/react-router";
import type { CSSProperties } from "react";

interface CurioFlowerProps {
  size?: number;
}

const petals: Array<{ id: string; label: string; to: string; transform?: string; pathD: string; veinD: string; text: { x: number; y: number; transform?: string; letterSpacing: string } }> = [
  {
    id: "artistas",
    label: "ARTISTAS",
    to: "/artistas",
    pathD: "M369 352C333.063 332 235.471 286.434 274.429 232 287.669 213.5 290.506 154 330.226 160 347.249 163 367.109 162 369 176 370.891 162 396.426 172 413.449 169 453.169 163 467.354 176 463.571 232 457.897 300 404.937 332 369 352Z",
    veinD: "M369 344C366.163 272 366.163 210 369 172",
    text: { x: 369.049, y: 208, letterSpacing: "1.891px" },
  },
  {
    id: "agenda",
    label: "AGENDA",
    to: "/agenda",
    transform: "translate(574.71 -91.03) rotate(72)",
    pathD: "M355.903 333.832C317.781 314.207 261.561 282.885 254.507 218.129 249.634 164.814 254.604 170.075 295.055 159.816 327.712 151.534 350.882 153.129 353.095 166.474 354.862 153.193 378.649 164.277 396.516 167.923 491.178 187.246 435.809 199.087 453.47 221.319 495.187 273.833 393.387 315.42 355.903 333.832Z",
    veinD: "M355.776 326.225C351.642 257.712 350.653 198.756 353.031 162.67",
    text: { x: 491.565, y: 294.027, transform: "translate(627.27 -253.37) rotate(72)", letterSpacing: "1.902px" },
  },
  {
    id: "galeria",
    label: "GALERÍA",
    to: "/galeria",
    transform: "translate(838.88 427.43) rotate(144)",
    pathD: "M334.577 340.795C298.443 322.151 245.259 292.196 241.228 225.627 238.816 170.78 265.454 159.901 305.807 164.704 323.09 167.183 337.553 154.41 339.12 168.095 341.411 154.306 375.815 143.993 391.393 151.486 431.673 170.862 439.425 165.411 434.122 220.464 426.58 287.343 371.743 320.189 334.577 340.795Z",
    veinD: "M334.784 332.945C333.749 262.372 335.349 201.535 339.224 164.171",
    text: { x: 446.668, y: 475.477, transform: "translate(-191.42 344.88) rotate(-36)", letterSpacing: "1.929px" },
  },
  {
    id: "postulate",
    label: "POSTULATE",
    to: "/postulate",
    transform: "translate(427.43 838.88) rotate(-144)",
    pathD: "M334.68 363.13C297.514 342.525 242.678 309.679 235.136 242.8 229.832 187.747 260.656 208.295 294.678 187.008 319.189 171.672 327.847 176.642 330.137 190.431 331.705 176.746 350.1 176.407 374.747 181.368 415.256 189.523 430.442 193.116 428.03 247.962 423.998 314.532 370.814 344.486 334.68 363.13Z",
    veinD: "M334.474 355.28C329.722 284.553 328.121 223.716 330.034 186.506",
    text: { x: 283.197, y: 453.052, transform: "translate(324.92 -65.99) rotate(36)", letterSpacing: "1.929px" },
  },
  {
    id: "ciudades",
    label: "CIUDADES",
    to: "/ciudades",
    transform: "translate(-91.03 574.71) rotate(-72)",
    pathD: "M355.839 369.972C318.355 351.56 263.357 322.005 258.272 257.46 257.287 244.953 239.716 200.692 281.373 192.877 328.448 184.044 356.881 189.333 358.647 202.614 360.86 189.269 405.048 179.876 419.663 189.708 446.575 207.812 462.108 200.955 457.236 254.269 450.182 319.025 393.962 350.348 355.839 369.972Z",
    veinD: "M355.967 362.365C354.131 293.948 355.12 234.992 358.711 198.81",
    text: { x: 220.207, y: 330.259, transform: "translate(-143.58 412.37) rotate(-72)", letterSpacing: "1.902px" },
  },
];

export function CurioFlower({ size = 560 }: CurioFlowerProps) {
  const navigate = useNavigate();

  const petalStyle: CSSProperties = {
    cursor: "pointer",
    transformBox: "fill-box",
    transformOrigin: "center",
    transition: "transform 220ms ease, filter 220ms ease",
  };

  return (
    <svg
      width={size}
      viewBox="38 0 662 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "100%", height: "auto", overflow: "visible" }}
      aria-label="Flor Curio · Navegación"
    >
      <defs>
        <radialGradient id="petalGrad" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#8B2418" />
          <stop offset="55%" stopColor="#6E160C" />
          <stop offset="100%" stopColor="#4A0E07" />
        </radialGradient>
        <radialGradient id="goldGrad" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#F4D446" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#A8841C" />
        </radialGradient>
        <style>{`
          .curio-petal:hover { filter: drop-shadow(0 0 18px rgba(244,212,70,0.55)) brightness(1.12); }
          .curio-petal:hover { transform: scale(1.04); }
          .curio-center { cursor: pointer; transition: filter 220ms ease, transform 220ms ease; transform-box: fill-box; transform-origin: center; }
          .curio-center:hover { filter: drop-shadow(0 0 22px rgba(244,212,70,0.7)); transform: scale(1.06); }
          .curio-label { pointer-events: none; user-select: none; }
        `}</style>
      </defs>

      {petals.map((p) => (
        <g
          key={p.id}
          className="curio-petal"
          transform={p.transform}
          style={petalStyle}
          onClick={() => navigate({ to: p.to })}
          role="link"
          aria-label={p.label}
        >
          <path d={p.pathD} fill="url(#petalGrad)" stroke="#380C06" strokeWidth={1.5} />
          <path d={p.veinD} fill="none" stroke="#430F09" strokeWidth={1.2} opacity={0.35} />
        </g>
      ))}

      {petals.map((p) => (
        <text
          key={`label-${p.id}`}
          className="curio-label"
          x={p.text.x}
          y={p.text.y}
          textAnchor="middle"
          transform={p.text.transform}
          fontFamily='"Stinger Fit Trial", sans-serif'
          fontSize="15px"
          fontWeight={400}
          letterSpacing={p.text.letterSpacing}
          fill="#E8C547"
        >
          {p.label}
        </text>
      ))}

      <g
        className="curio-center"
        onClick={() => navigate({ to: "/" })}
        role="link"
        aria-label="Inicio"
      >
        <circle cx={369} cy={350} r={56.743} fill="url(#goldGrad)" stroke="#A8841C" strokeWidth={5} />
        <text
          className="curio-label"
          x={360.048}
          y={398.521}
          textAnchor="middle"
          fontFamily='"Darkcastle PERSONAL USE", serif'
          fontWeight={400}
          fontSize={91}
          fill="#6E160C"
        >
          C
        </text>
      </g>
    </svg>
  );
}

export default CurioFlower;

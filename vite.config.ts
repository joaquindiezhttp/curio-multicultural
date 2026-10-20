import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      // Entrada de servidor propia (src/server.ts) con manejo de errores.
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    // Solo al compilar: genera .vercel/output para desplegar en Vercel.
    ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
  ],
  resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router"] },
}));

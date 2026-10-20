import { useEffect, useState } from "react";

const UNITS = [
  ["días", 86400000],
  ["hs", 3600000],
  ["min", 60000],
] as const;

export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const diff = now === null ? null : new Date(target).getTime() - now;
  if (diff === null || diff <= 0) return null;

  let rest = diff;
  const parts = UNITS.map(([label, ms]) => {
    const value = Math.floor(rest / ms);
    rest -= value * ms;
    return { label, value };
  });

  return (
    <div className="mt-6 flex gap-6" aria-label="Cuenta regresiva">
      {parts.map((p) => (
        <div key={p.label}>
          <div className="font-heading text-4xl text-gold md:text-5xl">{String(p.value).padStart(2, "0")}</div>
          <div className="font-display text-xs uppercase tracking-[0.25em] text-foreground/70">{p.label}</div>
        </div>
      ))}
    </div>
  );
}

import { formatClock } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Props = {
  remainingMs: number;
  durationMs: number;
  label: string;
  sublabel?: string;
  finished?: boolean;
};

export function WatchFace({ remainingMs, durationMs, label, sublabel, finished }: Props) {
  const progress = durationMs <= 0 ? 0 : Math.min(1, Math.max(0, remainingMs / durationMs));
  const r = 82;
  const c = 2 * Math.PI * r;
  const urgent = !finished && remainingMs > 0 && remainingMs <= 10_000;
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  const handAngle = finished ? 0 : progress * 360;

  return (
    <div
      className={cn("watch-face relative", urgent && "watch-urgent")}
      role="timer"
      aria-label={`${label} ${formatClock(remainingMs)}`}
    >
      <svg viewBox="0 0 200 200" className="size-full">
        <circle cx="100" cy="100" r="96" fill="var(--color-elevated)" stroke="var(--color-border)" strokeWidth="1" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-border)" strokeWidth="1" />
        {ticks.map((i) => {
          const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const major = i % 5 === 0;
          const inner = major ? 74 : 80;
          const outer = 86;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * inner}
              y1={100 + Math.sin(a) * inner}
              x2={100 + Math.cos(a) * outer}
              y2={100 + Math.sin(a) * outer}
              stroke={major ? "var(--color-muted)" : "var(--color-border)"}
              strokeWidth={major ? 1.5 : 1}
            />
          );
        })}
        <circle
          className="watch-ring"
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={finished ? "var(--color-success)" : "var(--color-accent)"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - (finished ? 1 : progress))}
          transform="rotate(-90 100 100)"
        />
        <line
          x1="100"
          y1="100"
          x2={100 + Math.sin((handAngle * Math.PI) / 180) * 62}
          y2={100 - Math.cos((handAngle * Math.PI) / 180) * 62}
          stroke={finished ? "var(--color-success)" : "var(--color-fg)"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="3.5" fill="var(--color-fg)" />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="font-display text-xs tracking-[0.28em] text-muted uppercase">{label}</span>
        <span
          className={cn(
            "font-display text-5xl font-medium tabular-nums leading-none tracking-tight text-fg",
            finished && "text-success",
          )}
        >
          {finished ? "GO" : formatClock(remainingMs)}
        </span>
        {sublabel ? (
          <span className="mt-1 font-mono text-[0.7rem] tracking-widest text-subtle uppercase">{sublabel}</span>
        ) : null}
      </div>
    </div>
  );
}

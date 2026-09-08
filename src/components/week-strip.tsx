import { Link } from "@tanstack/react-router";
import { PROGRAM, todayProgramDay } from "@/lib/program";
import { useForgeStore } from "@/lib/store";
import { cn, startOfWeek } from "@/lib/utils";

export function WeekStrip({ compact }: { compact?: boolean }) {
  const sessions = useForgeStore((s) => s.sessions);
  const current = useForgeStore((s) => s.current);
  const today = todayProgramDay();
  const weekStart = startOfWeek().getTime();

  return (
    <div className={cn("grid grid-cols-7 gap-1.5", compact && "gap-1")}>
      {PROGRAM.map((day) => {
        const doneThisWeek = sessions.some(
          (s) => s.dayId === day.id && s.finishedAt && s.finishedAt >= weekStart,
        );
        const isToday = day.id === today;
        const isLive = current?.dayId === day.id;
        const className = cn(
          "flex min-h-16 flex-col items-center justify-center rounded-md border px-1 py-2 text-center transition-colors duration-150",
          isToday ? "border-fg/30 bg-elevated" : "border-border bg-surface",
          doneThisWeek && "border-success/40",
          isLive && "border-accent",
        );
        const inner = (
          <>
            <span className="font-mono text-[0.65rem] tabular-nums text-subtle">{day.id}</span>
            <span className="font-display text-xs uppercase tracking-wide text-fg">{day.short}</span>
            {!compact ? (
              <span className="mt-0.5 text-[0.6rem] text-subtle uppercase">
                {day.focus === "rest" ? "Off" : day.focus === "strength" ? "Str" : "Hyp"}
              </span>
            ) : null}
            {doneThisWeek ? <span className="mt-1 size-1.5 rounded-full bg-success" /> : null}
          </>
        );
        if (day.focus === "rest") {
          return (
            <Link key={day.id} to="/" className={className}>
              {inner}
            </Link>
          );
        }
        return (
          <Link
            key={day.id}
            to="/train/$dayId"
            params={{ dayId: String(day.id) }}
            className={className}
          >
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

export function WeekMeta() {
  const sessions = useForgeStore((s) => s.sessions);
  const weekStart = startOfWeek().getTime();
  const thisWeek = sessions.filter((s) => s.finishedAt && s.finishedAt >= weekStart);
  const trained = new Set(thisWeek.map((s) => s.dayId)).size;
  return (
    <p className="text-sm text-muted">
      {trained}/6 sessions this week
      {thisWeek.length === 0 ? " · open a day when you’re ready" : null}
    </p>
  );
}

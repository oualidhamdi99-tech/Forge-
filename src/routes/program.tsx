import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { HydrateGate } from "@/components/hydrate-gate";
import { Badge } from "@/components/ui/badge";
import { PROGRAM, focusLabel, formatPrescription } from "@/lib/program";
import { useForgeStore } from "@/lib/store";
import { startOfWeek } from "@/lib/utils";

export const Route = createFileRoute("/program")({ component: ProgramPage });

function ProgramPage() {
  return (
    <AppShell>
      <HydrateGate>
        <ProgramBody />
      </HydrateGate>
    </AppShell>
  );
}

function ProgramBody() {
  const sessions = useForgeStore((s) => s.sessions);
  const weekStart = startOfWeek().getTime();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Six-day split</p>
        <h1 className="mt-1 font-display text-4xl uppercase tracking-wide">Program</h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          Strength and hypertrophy alternate. Same lifts keep their history so last week’s numbers
          are waiting on the bar.
        </p>
      </header>
      <div className="space-y-4">
        {PROGRAM.map((day) => {
          const done = sessions.some(
            (s) => s.dayId === day.id && s.finishedAt && s.finishedAt >= weekStart,
          );
          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs tabular-nums text-subtle">Day {day.id}</p>
                  <h2 className="font-display text-2xl uppercase tracking-wide">{day.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  {done ? <Badge variant="success">Done</Badge> : null}
                  <Badge>{focusLabel(day.focus)}</Badge>
                </div>
              </div>
              {day.exercises.length ? (
                <ol className="mt-4 space-y-1.5">
                  {day.exercises.map((ex, i) => (
                    <li key={ex.id} className="flex gap-3 text-sm">
                      <span className="w-5 font-mono text-xs tabular-nums text-subtle">{i + 1}</span>
                      <span className="flex-1 text-fg">{ex.name}</span>
                      <span className="text-muted">
                        {formatPrescription(ex.sets, ex.repsMin, ex.repsMax)}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 text-sm text-muted">Full rest. No work.</p>
              )}
            </>
          );
          const className =
            "block rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:bg-elevated";
          if (day.focus === "rest") {
            return (
              <Link key={day.id} to="/" className={className}>
                {body}
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
              {body}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

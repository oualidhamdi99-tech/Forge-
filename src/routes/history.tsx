import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { HydrateGate } from "@/components/hydrate-gate";
import { Badge } from "@/components/ui/badge";
import { hitTopRange, sessionSetCount, sessionVolumeKg } from "@/lib/overload";
import { allExercises, getDay, getExercise } from "@/lib/program";
import { useForgeStore } from "@/lib/store";
import { formatWeight } from "@/lib/units";
import { formatDuration, relativeDay } from "@/lib/utils";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  return (
    <AppShell>
      <HydrateGate>
        <HistoryBody />
      </HydrateGate>
    </AppShell>
  );
}

function HistoryBody() {
  const sessions = useForgeStore((s) => s.sessions);
  const unit = useForgeStore((s) => s.settings.unit);
  const ordered = [...sessions].reverse();
  const catalog = allExercises();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs tracking-[0.22em] text-muted uppercase">Archive</p>
        <h1 className="mt-1 font-display text-4xl uppercase tracking-wide">History</h1>
        <p className="mt-2 text-sm text-muted">
          {sessions.length === 0
            ? "Finish a session and it lives here — every set, every load."
            : `${sessions.length} session${sessions.length === 1 ? "" : "s"} saved on this device.`}
        </p>
      </header>

      {catalog.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-sm tracking-[0.2em] text-muted uppercase">Lifts</h2>
          <div className="flex flex-wrap gap-2">
            {catalog.map(({ exercise }) => (
              <Link
                key={exercise.id}
                to="/history/$exerciseId"
                params={{ exerciseId: exercise.id }}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-fg transition-colors duration-150 hover:bg-elevated"
              >
                {exercise.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-display text-sm tracking-[0.2em] text-muted uppercase">Sessions</h2>
        {ordered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted">
            No sessions yet. Start today’s workout to write the first page.
          </p>
        ) : (
          <ul className="space-y-3">
            {ordered.map((session) => {
              const day = getDay(session.dayId);
              const { done, total } = sessionSetCount(session);
              const increases = session.exercises.filter((log) => {
                const ex = getExercise(log.exerciseId);
                return ex ? hitTopRange(log, ex) : false;
              }).length;
              return (
                <li key={session.id} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl uppercase">
                        Day {day.id} · {day.title}
                      </p>
                      <p className="text-xs text-muted">
                        {session.finishedAt ? relativeDay(session.finishedAt) : "Open"} ·{" "}
                        {session.finishedAt
                          ? formatDuration(session.finishedAt - session.startedAt)
                          : "—"}{" "}
                        · {Math.round(sessionVolumeKg(session))} {unit}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge>
                        {done}/{total}
                      </Badge>
                      {increases > 0 ? (
                        <Badge variant="success">{increases} increase</Badge>
                      ) : null}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1">
                    {session.exercises.map((log) => {
                      const ex = getExercise(log.exerciseId);
                      if (!ex) return null;
                      const sets = log.sets.filter((s) => s.done);
                      if (!sets.length) return null;
                      return (
                        <li key={log.exerciseId} className="flex gap-2 text-xs">
                          <span className="w-32 shrink-0 truncate text-muted">{ex.name}</span>
                          <span className="font-mono tabular-nums text-fg">
                            {sets
                              .map((s) => `${formatWeight(s.weightKg, unit, ex.bodyweight)}×${s.reps}`)
                              .join("  ")}
                          </span>
                          {hitTopRange(log, ex) ? (
                            <span className="text-success">+wt</span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

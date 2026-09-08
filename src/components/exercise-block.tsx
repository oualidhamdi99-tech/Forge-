import { ChevronDown, Timer } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { OverloadBanner } from "@/components/overload-banner";
import { Stepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import {
  hitTopRange,
  lastLogAny,
  lastLogForDay,
  recommendWeight,
  workingWeightKg,
} from "@/lib/overload";
import { formatPrescription } from "@/lib/program";
import { useForgeStore } from "@/lib/store";
import type { Exercise } from "@/lib/types";
import { addIncrement, formatWeight, formatWeightUnit, stepWeight } from "@/lib/units";
import { cn, relativeDay } from "@/lib/utils";

type Props = {
  exercise: Exercise;
  dayId: number;
  open: boolean;
  onToggle: () => void;
  index: number;
};

export function ExerciseBlock({ exercise, dayId, open, onToggle, index }: Props) {
  const current = useForgeStore((s) => s.current);
  const sessions = useForgeStore((s) => s.sessions);
  const unit = useForgeStore((s) => s.settings.unit);
  const updateSet = useForgeStore((s) => s.updateSet);
  const toggleSetDone = useForgeStore((s) => s.toggleSetDone);
  const startRest = useForgeStore((s) => s.startRest);

  const log = current?.exercises.find((e) => e.exerciseId === exercise.id);
  const rec = recommendWeight(sessions, exercise.id, dayId, unit);
  const doneCount = log?.sets.filter((s) => s.done).length ?? 0;
  const allDone = doneCount === exercise.sets;
  const nailedIt = hitTopRange(log, exercise);
  const nextKg = nailedIt
    ? addIncrement(workingWeightKg(log), unit, exercise.increment)
    : rec.increase
      ? rec.weightKg
      : null;

  const sameDay = lastLogForDay(sessions, exercise.id, dayId);
  const any = lastLogAny(sessions, exercise.id);
  const last = sameDay ?? any;
  const lastOther =
    sameDay && any && any.session.id !== sameDay.session.id ? any : !sameDay && any ? any : null;

  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface transition-[border-color] duration-200",
        open && "border-fg/20",
        nailedIt && "border-success/40",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-4 text-left"
      >
        <span className="font-mono text-xs tabular-nums text-subtle pt-1">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="font-display text-lg uppercase tracking-wide text-fg">{exercise.name}</span>
            {allDone ? (
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-success text-success-fg">
                <svg viewBox="0 0 24 24" className="size-3" fill="none">
                  <path
                    d="M5 12.5 9.5 17 19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>{formatPrescription(exercise.sets, exercise.repsMin, exercise.repsMax)}</span>
            <span className="text-subtle">·</span>
            <span className="inline-flex items-center gap-1">
              <Timer className="size-3" />
              {Math.round(exercise.restSec / 60) >= 1 && exercise.restSec % 60 === 0
                ? `${exercise.restSec / 60}m rest`
                : `${exercise.restSec}s rest`}
            </span>
            {exercise.note ? (
              <>
                <span className="text-subtle">·</span>
                <span>{exercise.note}</span>
              </>
            ) : null}
          </span>
        </span>
        <span className="flex items-center gap-2 pt-0.5">
          <span className="font-mono text-xs tabular-nums text-muted">
            {doneCount}/{exercise.sets}
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-subtle transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </span>
      </button>

      {open ? (
        <div className="space-y-4 border-t border-border px-4 pt-4 pb-4">
          {last?.log ? (
            <div className="rounded-md bg-elevated px-3 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-xs tracking-[0.18em] text-muted uppercase">Last time</p>
                <p className="text-xs text-subtle">
                  Day {last.session.dayId} · {relativeDay(last.session.finishedAt ?? last.session.startedAt)}
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {last.log.sets
                  .filter((s) => s.done)
                  .map((s, i) => (
                    <span
                      key={i}
                      className="rounded-sm bg-bg px-2 py-1 font-mono text-xs tabular-nums text-fg"
                    >
                      {formatWeight(s.weightKg, unit, exercise.bodyweight)} × {s.reps}
                    </span>
                  ))}
              </div>
              {rec.increase && rec.log === last.log ? (
                <p className="mt-2 flex items-center gap-2 text-sm text-success">
                  Hit the top of the range. Load {formatWeightUnit(rec.weightKg, unit, exercise.bodyweight)}.
                </p>
              ) : null}
              {lastOther && lastOther.log ? (
                <p className="mt-2 text-xs text-subtle">
                  Also Day {lastOther.session.dayId} · {relativeDay(lastOther.session.finishedAt ?? lastOther.session.startedAt)}
                  {" · "}
                  {lastOther.log.sets
                    .filter((s) => s.done)
                    .map((s) => `${formatWeight(s.weightKg, unit, exercise.bodyweight)}×${s.reps}`)
                    .join("  ")}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted">No history yet. First working sets set the baseline.</p>
          )}

          {nailedIt && nextKg != null ? (
            <OverloadBanner unit={unit} nextKg={nextKg} bodyweight={exercise.bodyweight} />
          ) : rec.increase && !allDone ? (
            <div className="flex items-center gap-2 text-sm text-success">
              <span className="size-1.5 rounded-full bg-success" />
              Suggested load {formatWeightUnit(rec.weightKg, unit, exercise.bodyweight)}
            </div>
          ) : null}

          <ul className="space-y-2">
            {log?.sets.map((row, i) => (
              <li
                key={i}
                className={cn(
                  "flex flex-wrap items-center gap-2 rounded-md border border-border bg-bg px-2 py-2",
                  row.done && "border-success/30",
                )}
              >
                <span className="w-10 font-mono text-xs tabular-nums text-subtle">S{i + 1}</span>
                <Stepper
                  ariaLabel="weight"
                  valueLabel={formatWeight(row.weightKg, unit, exercise.bodyweight)}
                  disabled={row.done}
                  onStep={(dir) =>
                    updateSet(exercise.id, i, {
                      weightKg: stepWeight(row.weightKg, dir, unit, exercise.increment),
                    })
                  }
                />
                <Stepper
                  ariaLabel="reps"
                  valueLabel={String(row.reps)}
                  disabled={row.done}
                  onStep={(dir) =>
                    updateSet(exercise.id, i, {
                      reps: Math.max(0, row.reps + dir),
                    })
                  }
                />
                <Button
                  variant={row.done ? "success" : "secondary"}
                  size="icon"
                  className="ml-auto"
                  aria-label={row.done ? "Unlog set" : "Log set"}
                  onClick={() => toggleSetDone(exercise.id, i)}
                >
                  {row.done ? (
                    <svg viewBox="0 0 24 24" className="size-4" fill="none">
                      <path
                        d="M5 12.5 9.5 17 19 7.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className="font-display text-xs">LOG</span>
                  )}
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => startRest(exercise.id, Math.max(0, doneCount - 1), exercise.restSec)}
            >
              <Timer className="size-4" />
              Rest timer
            </Button>
            <Link
              to="/history/$exerciseId"
              params={{ exerciseId: exercise.id }}
              className="text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              History
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}

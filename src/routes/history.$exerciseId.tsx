import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { HydrateGate } from "@/components/hydrate-gate";
import { OverloadBanner } from "@/components/overload-banner";
import { bestSet, hitTopRange, lastLogsForExercise, recommendWeight, workingWeightKg } from "@/lib/overload";
import { formatPrescription, getExercise, PROGRAM } from "@/lib/program";
import { useForgeStore } from "@/lib/store";
import { formatWeight, formatWeightUnit, kgToDisplay } from "@/lib/units";
import { relativeDay } from "@/lib/utils";

export const Route = createFileRoute("/history/$exerciseId")({ component: ExerciseHistoryPage });

function ExerciseHistoryPage() {
  return (
    <AppShell>
      <HydrateGate>
        <ExerciseHistoryBody />
      </HydrateGate>
    </AppShell>
  );
}

function ExerciseHistoryBody() {
  const { exerciseId } = Route.useParams();
  const exercise = getExercise(exerciseId);
  const sessions = useForgeStore((s) => s.sessions);
  const unit = useForgeStore((s) => s.settings.unit);

  if (!exercise) {
    return (
      <div className="space-y-3">
        <p className="text-muted">Unknown lift.</p>
        <Link to="/history" className="text-sm text-fg underline">
          Back to history
        </Link>
      </div>
    );
  }

  const logs = lastLogsForExercise(sessions, exercise.id);
  const days = PROGRAM.filter((d) => d.exercises.some((e) => e.id === exercise.id));
  const rec = recommendWeight(sessions, exercise.id, days[0]?.id ?? 1, unit);
  const pr = bestSet(sessions, exercise.id);
  const chart = [...logs].reverse().map((row) => ({
    date: new Date(row.session.finishedAt ?? row.session.startedAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    weight: kgToDisplay(workingWeightKg(row.log), unit),
  }));

  return (
    <div className="space-y-6">
      <Link to="/history" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" />
        History
      </Link>
      <header>
        <h1 className="font-display text-4xl uppercase tracking-wide">{exercise.name}</h1>
        <p className="mt-1 text-sm text-muted">
          {days.map((d) => `Day ${d.id} ${formatPrescription(
            d.exercises.find((e) => e.id === exercise.id)?.sets ?? exercise.sets,
            d.exercises.find((e) => e.id === exercise.id)?.repsMin ?? exercise.repsMin,
            d.exercises.find((e) => e.id === exercise.id)?.repsMax ?? exercise.repsMax,
          )}`).join(" · ")}
        </p>
      </header>

      {rec.increase && rec.weightKg > 0 ? (
        <OverloadBanner unit={unit} nextKg={rec.weightKg} bodyweight={exercise.bodyweight} />
      ) : null}

      {pr ? (
        <p className="text-sm text-muted">
          Best set {formatWeightUnit(pr.weightKg, unit, exercise.bodyweight)} × {pr.reps}
          {pr.at ? ` · ${relativeDay(pr.at)}` : ""}
        </p>
      ) : (
        <p className="text-sm text-muted">No logged sets yet.</p>
      )}

      {chart.length >= 2 ? (
        <div className="h-48 rounded-xl border border-border bg-surface p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "var(--color-subtle)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "var(--color-subtle)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  color: "var(--color-fg)",
                }}
                formatter={(value) => [`${value as number} ${unit}`, "Load"]}
              />
              <Line type="monotone" dataKey="weight" stroke="var(--color-accent)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : null}

      <ul className="space-y-3">
        {logs.map((row) => {
          const exOnDay = getExercise(exercise.id)!;
          const dayEx =
            PROGRAM.find((d) => d.id === row.session.dayId)?.exercises.find((e) => e.id === exercise.id) ??
            exOnDay;
          return (
            <li key={row.session.id} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-fg">
                  Day {row.session.dayId} · {relativeDay(row.session.finishedAt ?? row.session.startedAt)}
                </p>
                {hitTopRange(row.log, dayEx) ? (
                  <span className="text-xs text-success">Increase next</span>
                ) : null}
              </div>
              <p className="mt-2 font-mono text-sm tabular-nums text-fg">
                {row.log.sets
                  .filter((s) => s.done)
                  .map((s) => `${formatWeight(s.weightKg, unit, exercise.bodyweight)} × ${s.reps}`)
                  .join("   ")}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

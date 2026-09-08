import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Clock, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { HydrateGate } from "@/components/hydrate-gate";
import { CheckMark } from "@/components/overload-banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WeekMeta, WeekStrip } from "@/components/week-strip";
import { hitTopRange, lastLogForDay, sessionSetCount, sessionVolumeKg } from "@/lib/overload";
import { PROGRAM, focusLabel, formatPrescription, getDay, todayProgramDay } from "@/lib/program";
import { useForgeStore } from "@/lib/store";
import { formatWeight } from "@/lib/units";
import { formatDuration, relativeDay } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <HydrateGate>
        <Dashboard />
      </HydrateGate>
    </AppShell>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const todayId = todayProgramDay();
  const day = getDay(todayId);
  const current = useForgeStore((s) => s.current);
  const sessions = useForgeStore((s) => s.sessions);
  const startSession = useForgeStore((s) => s.startSession);
  const introDismissed = useForgeStore((s) => s.introDismissed);
  const dismissIntro = useForgeStore((s) => s.dismissIntro);
  const unit = useForgeStore((s) => s.settings.unit);
  const last = [...sessions].reverse()[0];
  const weekday = new Date().toLocaleDateString(undefined, { weekday: "long" });

  function begin(dayId: number) {
    const target = getDay(dayId);
    if (target.focus === "rest") return;
    if (current?.dayId === dayId) {
      void navigate({ to: "/train/$dayId", params: { dayId: String(dayId) } });
      return;
    }
    if (current && current.dayId !== dayId) {
      const { done } = sessionSetCount(current);
      if (done > 0) {
        void navigate({ to: "/train/$dayId", params: { dayId: String(current.dayId) } });
        return;
      }
    }
    startSession(dayId);
    void navigate({ to: "/train/$dayId", params: { dayId: String(dayId) } });
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs tracking-[0.22em] text-muted uppercase">{weekday}</p>
        <h1 className="mt-1 font-display text-5xl uppercase leading-none tracking-wide text-fg">
          Day {day.id}
        </h1>
        <p className="mt-2 font-display text-xl uppercase tracking-wide text-muted">
          {day.title} · {focusLabel(day.focus)}
        </p>
      </header>

      {!introDismissed ? (
        <Card>
          <CardContent className="space-y-3 pt-5">
            <p className="font-display text-sm tracking-wide uppercase">How Forge works</p>
            <p className="text-sm leading-relaxed text-muted">
              Log every set. The watch runs your rest. Last session’s numbers sit on the lift so you
              know the load. Hit the top of the rep range on every set — green check, add weight next
              time.
            </p>
            <Button variant="ghost" size="sm" onClick={dismissIntro} className="px-0">
              Got it
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {current ? (
        <Card className="border-accent/30">
          <CardContent className="flex items-center justify-between gap-3 pt-5">
            <div>
              <p className="text-xs tracking-[0.18em] text-muted uppercase">Session in progress</p>
              <p className="mt-1 font-display text-2xl uppercase">
                Day {current.dayId} · {getDay(current.dayId).title}
              </p>
              <p className="text-sm text-muted">
                {sessionSetCount(current).done}/{sessionSetCount(current).total} sets logged
              </p>
            </div>
            <Button asChild>
              <Link to="/train/$dayId" params={{ dayId: String(current.dayId) }}>
                Resume
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : day.focus === "rest" ? (
        <RestPanel />
      ) : (
        <Button className="h-14 w-full text-base" onClick={() => begin(day.id)}>
          Start {day.title} session
          <ArrowRight className="size-4" />
        </Button>
      )}

      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-sm tracking-[0.2em] text-muted uppercase">This week</h2>
          <WeekMeta />
        </div>
        <WeekStrip />
      </section>

      {day.focus !== "rest" && !current ? (
        <section className="space-y-3">
          <h2 className="font-display text-sm tracking-[0.2em] text-muted uppercase">Today’s lifts</h2>
          <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
            {day.exercises.map((ex, i) => {
              const prev = lastLogForDay(sessions, ex.id, day.id) ?? null;
              const increase = prev ? hitTopRange(prev.log, ex) : false;
              return (
                <li key={ex.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="w-6 font-mono text-xs tabular-nums text-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-fg">{ex.name}</p>
                    <p className="text-xs text-muted">
                      {formatPrescription(ex.sets, ex.repsMin, ex.repsMax)}
                      {prev
                        ? ` · last ${prev.log.sets
                            .filter((s) => s.done)
                            .map((s) => `${formatWeight(s.weightKg, unit, ex.bodyweight)}×${s.reps}`)
                            .join("  ")}`
                        : " · no history"}
                    </p>
                  </div>
                  {increase ? <CheckMark className="size-7" /> : null}
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {last?.finishedAt ? (
        <section className="space-y-3">
          <h2 className="font-display text-sm tracking-[0.2em] text-muted uppercase">Last session</h2>
          <Link
            to="/history"
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-4 transition-colors duration-150 hover:bg-elevated"
          >
            <div>
              <p className="font-display text-lg uppercase">
                Day {last.dayId} · {getDay(last.dayId).title}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                <Clock className="size-3.5" />
                {relativeDay(last.finishedAt)} · {formatDuration(last.finishedAt - last.startedAt)} ·{" "}
                {Math.round(sessionVolumeKg(last))} {unit} volume
              </p>
            </div>
            <ArrowRight className="size-4 text-subtle" />
          </Link>
        </section>
      ) : null}

      <p className="flex items-center gap-2 text-xs text-subtle">
        <RotateCcw className="size-3" />
        Logs stay on this device.
      </p>
    </div>
  );
}

function RestPanel() {
  const sessions = useForgeStore((s) => s.sessions);
  const last = [...sessions].reverse()[0];
  const missed = PROGRAM.filter((d) => d.focus !== "rest").filter(
    (d) => !sessions.some((s) => s.dayId === d.id && s.finishedAt),
  );

  return (
    <Card>
      <CardContent className="space-y-4 pt-5">
        <p className="font-display text-2xl uppercase">Rest day</p>
        <p className="text-sm leading-relaxed text-muted">
          Walk, eat, sleep. The next load is earned here. If a session slipped, pick it up from the
          week strip.
        </p>
        {last?.finishedAt ? (
          <p className="text-sm text-muted">
            Last trained Day {last.dayId} {relativeDay(last.finishedAt)}.
          </p>
        ) : null}
        {missed.length > 0 && sessions.length > 0 ? (
          <p className="text-xs text-subtle">
            Still open: {missed.map((d) => `Day ${d.id} ${d.title}`).join(", ")}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

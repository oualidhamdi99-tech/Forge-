import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Flag } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ExerciseBlock } from "@/components/exercise-block";
import { HydrateGate } from "@/components/hydrate-gate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isSessionComplete, sessionSetCount } from "@/lib/overload";
import { focusLabel, getDay } from "@/lib/program";
import { useForgeStore } from "@/lib/store";
import { formatDuration } from "@/lib/utils";
import { useNow } from "@/hooks/use-now";

export const Route = createFileRoute("/train/$dayId")({ component: TrainPage });

function TrainPage() {
  return (
    <AppShell>
      <HydrateGate>
        <TrainBody />
      </HydrateGate>
    </AppShell>
  );
}

function TrainBody() {
  const { dayId: raw } = Route.useParams();
  const dayId = Number(raw);
  const day = getDay(dayId);
  const navigate = useNavigate();
  const current = useForgeStore((s) => s.current);
  const startSession = useForgeStore((s) => s.startSession);
  const finishSession = useForgeStore((s) => s.finishSession);
  const discardCurrent = useForgeStore((s) => s.discardCurrent);
  const focusExercise = useForgeStore((s) => s.focusExercise);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const now = useNow(!!current);

  if (day.focus === "rest" || Number.isNaN(dayId) || dayId < 1 || dayId > 7) {
    return (
      <div className="space-y-4">
        <p className="text-muted">Nothing to train on this day.</p>
        <Button asChild variant="secondary">
          <Link to="/">Back</Link>
        </Button>
      </div>
    );
  }

  const live = current?.dayId === dayId ? current : null;
  const elapsed = live ? now - live.startedAt : 0;
  const counts = live ? sessionSetCount(live) : { done: 0, total: day.exercises.reduce((n, e) => n + e.sets, 0) };
  const complete = live ? isSessionComplete(live) : false;

  function ensureLive() {
    if (live) return;
    if (current && current.dayId !== dayId) {
      const { done } = sessionSetCount(current);
      if (done > 0) return;
      discardCurrent();
    }
    startSession(dayId);
  }

  function onFinish() {
    finishSession();
    void navigate({ to: "/history" });
  }

  if (!live) {
    return (
      <div className="space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" />
          Today
        </Link>
        <header>
          <p className="font-mono text-xs tabular-nums text-subtle">Day {day.id}</p>
          <h1 className="font-display text-4xl uppercase tracking-wide">
            {day.title}
          </h1>
          <p className="mt-1 text-muted">{focusLabel(day.focus)}</p>
        </header>
        {current && current.dayId !== dayId && sessionSetCount(current).done > 0 ? (
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm text-fg">A session is already open on Day {current.dayId}.</p>
            <div className="mt-3 flex gap-2">
              <Button asChild>
                <Link to="/train/$dayId" params={{ dayId: String(current.dayId) }}>
                  Resume it
                </Link>
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  discardCurrent();
                  startSession(dayId);
                }}
              >
                Discard and start Day {day.id}
              </Button>
            </div>
          </div>
        ) : (
          <Button className="h-12 w-full" onClick={ensureLive}>
            Start session
          </Button>
        )}
        <ol className="space-y-2 text-sm text-muted">
          {day.exercises.map((ex, i) => (
            <li key={ex.id}>
              {i + 1}. {ex.name}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="inline-flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg">
          <ArrowLeft className="size-5" />
          <span className="sr-only">Back</span>
        </Link>
        <div className="text-center">
          <p className="font-display text-sm tracking-[0.18em] text-muted uppercase">
            Day {day.id} · {day.title}
          </p>
          <p className="font-mono text-sm tabular-nums text-fg">{formatDuration(elapsed)}</p>
        </div>
        <button
          type="button"
          onClick={() => setConfirmDiscard(true)}
          className="text-xs text-subtle hover:text-muted"
        >
          Reset
        </button>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full bg-accent transition-[width] duration-200 ease-out"
          style={{ width: `${counts.total ? (counts.done / counts.total) * 100 : 0}%` }}
        />
      </div>
      <p className="text-center font-mono text-xs tabular-nums text-muted">
        {counts.done} / {counts.total} sets
      </p>

      <div className="space-y-3">
        {day.exercises.map((ex, i) => (
          <ExerciseBlock
            key={ex.id}
            exercise={ex}
            dayId={day.id}
            index={i}
            open={live.focusExerciseId === ex.id}
            onToggle={() => focusExercise(live.focusExerciseId === ex.id ? "" : ex.id)}
          />
        ))}
      </div>

      <div className="sticky bottom-20 z-20 md:bottom-4">
        <Button
          className="h-12 w-full shadow-[var(--shadow-panel)]"
          variant={complete ? "success" : "secondary"}
          onClick={() => (complete ? onFinish() : setConfirmFinish(true))}
        >
          {complete ? (
            <>
              <Check className="size-4" />
              Finish session
            </>
          ) : (
            <>
              <Flag className="size-4" />
              End session
            </>
          )}
        </Button>
      </div>

      <Dialog open={confirmFinish} onOpenChange={setConfirmFinish}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End session</DialogTitle>
            <DialogDescription>
              {counts.done} of {counts.total} sets are logged. Unfinished sets stay out of history.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmFinish(false)}>
              Keep lifting
            </Button>
            <Button className="flex-1" onClick={onFinish}>
              Save & finish
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDiscard} onOpenChange={setConfirmDiscard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset session</DialogTitle>
            <DialogDescription>
              Clears today’s in-progress sets. Finished sessions in history are untouched.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmDiscard(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                discardCurrent();
                setConfirmDiscard(false);
              }}
            >
              Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

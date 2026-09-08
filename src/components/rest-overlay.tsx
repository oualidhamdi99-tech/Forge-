import { useEffect, useRef } from "react";
import { Pause, Play, SkipForward, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WatchFace } from "@/components/watch-face";
import { chimeRestDone } from "@/lib/audio";
import { getDay, getExercise } from "@/lib/program";
import { restRemaining, useForgeStore } from "@/lib/store";
import { useNow } from "@/hooks/use-now";
import { cn } from "@/lib/utils";

export function RestOverlay() {
  const rest = useForgeStore((s) => s.rest);
  const sound = useForgeStore((s) => s.settings.sound);
  const current = useForgeStore((s) => s.current);
  const skipRest = useForgeStore((s) => s.skipRest);
  const pauseRest = useForgeStore((s) => s.pauseRest);
  const resumeRest = useForgeStore((s) => s.resumeRest);
  const addRest = useForgeStore((s) => s.addRest);
  const setRestOverlay = useForgeStore((s) => s.setRestOverlay);
  const markRestFinished = useForgeStore((s) => s.markRestFinished);
  const clearRest = useForgeStore((s) => s.clearRest);
  const now = useNow(!!rest, 100);
  const remaining = restRemaining(rest, now);
  const chimed = useRef(false);

  useEffect(() => {
    chimed.current = false;
  }, [rest?.endsAt, rest?.durationMs]);

  useEffect(() => {
    if (!rest || rest.finished || rest.paused) return;
    if (remaining > 0) return;
    markRestFinished();
    if (sound && !chimed.current) {
      chimed.current = true;
      chimeRestDone();
    }
  }, [remaining, rest, markRestFinished, sound]);

  if (!rest) return null;

  const day = current ? getDay(current.dayId) : null;
  const ex = getExercise(rest.exerciseId);
  const setLabel = ex ? `Set ${rest.setIndex + 1} / ${ex.sets}` : undefined;
  const nextSet = rest.setIndex + 2;
  const finished = rest.finished || remaining <= 0;

  if (!rest.overlay) {
    return (
      <button
        type="button"
        onClick={() => setRestOverlay(true)}
        className={cn(
          "fixed right-4 bottom-20 z-40 flex items-center gap-3 rounded-full border border-border bg-elevated px-4 py-2.5 shadow-[var(--shadow-panel)] md:bottom-6",
          finished && "border-success/40",
        )}
      >
        {finished ? (
          <span className="font-display text-lg tabular-nums leading-none text-success">GO</span>
        ) : (
          <WatchMini remaining={remaining} duration={rest.durationMs} />
        )}
        <span className="text-xs text-muted">{finished ? "Ready" : "Rest"}</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg">
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          type="button"
          onClick={() => (finished ? clearRest() : setRestOverlay(false))}
          className="inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:text-fg"
          aria-label="Minimize timer"
        >
          <ChevronDown className="size-5" />
        </button>
        <p className="font-display text-sm tracking-[0.2em] text-muted uppercase">
          {day ? `${day.title} · ${day.focus}` : "Rest"}
        </p>
        <span className="size-11" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        <div className={cn(finished && "go-pop")}>
          <WatchFace
            remainingMs={remaining}
            durationMs={rest.durationMs}
            label={finished ? "Ready" : rest.paused ? "Paused" : "Rest"}
            sublabel={setLabel}
            finished={finished}
          />
        </div>
        <div className="text-center">
          <p className="font-display text-2xl uppercase tracking-wide text-fg">{ex?.name ?? "Rest"}</p>
          <p className="mt-1 text-sm text-muted">
            {finished
              ? nextSet && ex && nextSet <= ex.sets
                ? `Next: set ${nextSet} of ${ex.sets}`
                : "Move to the next lift"
              : `${Math.round(rest.durationMs / 1000)}s prescribed`}
          </p>
        </div>
        <div className="flex w-full max-w-sm items-center justify-center gap-3">
          {finished ? (
            <Button className="h-12 min-w-44" onClick={() => clearRest()}>
              Lift
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => addRest(30_000)} className="min-w-20">
                <Plus className="size-4" />
                30s
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => (rest.paused ? resumeRest() : pauseRest())}
                aria-label={rest.paused ? "Resume" : "Pause"}
              >
                {rest.paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </Button>
              <Button variant="secondary" onClick={() => skipRest()} className="min-w-20">
                <SkipForward className="size-4" />
                Skip
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function WatchMini({ remaining, duration }: { remaining: number; duration: number }) {
  const p = duration <= 0 ? 0 : remaining / duration;
  const r = 8;
  const c = 2 * Math.PI * r;
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22" className="shrink-0">
        <circle cx="11" cy="11" r={r} fill="none" stroke="var(--color-border)" strokeWidth="2" />
        <circle
          cx="11"
          cy="11"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - p)}
          transform="rotate(-90 11 11)"
        />
      </svg>
      <span className="font-display text-lg tabular-nums">
        {Math.floor(remaining / 1000 / 60)}:{String(Math.floor((remaining / 1000) % 60)).padStart(2, "0")}
      </span>
    </span>
  );
}

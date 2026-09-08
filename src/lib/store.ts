import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDay } from "./program";
import { recommendWeight } from "./overload";
import { uid } from "./utils";
import type { RestState, Session, SetEntry, Settings, Unit } from "./types";

type ForgeState = {
  settings: Settings;
  sessions: Session[];
  current: Session | null;
  rest: RestState | null;
  introDismissed: boolean;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  setUnit: (unit: Unit) => void;
  setSound: (sound: boolean) => void;
  dismissIntro: () => void;
  startSession: (dayId: number) => void;
  discardCurrent: () => void;
  finishSession: () => void;
  focusExercise: (exerciseId: string) => void;
  updateSet: (exerciseId: string, setIndex: number, patch: Partial<SetEntry>) => void;
  toggleSetDone: (exerciseId: string, setIndex: number) => void;
  startRest: (exerciseId: string, setIndex: number, seconds: number) => void;
  skipRest: () => void;
  pauseRest: () => void;
  resumeRest: () => void;
  addRest: (ms: number) => void;
  setRestOverlay: (open: boolean) => void;
  markRestFinished: () => void;
  clearRest: () => void;
};

function remainingMs(rest: RestState, now = Date.now()) {
  if (rest.paused) return rest.pausedLeftMs;
  return Math.max(0, rest.endsAt - now);
}

export const useForgeStore = create<ForgeState>()(
  persist(
    (set, get) => ({
      settings: { unit: "kg", sound: true },
      sessions: [],
      current: null,
      rest: null,
      introDismissed: false,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setUnit: (unit) => set((s) => ({ settings: { ...s.settings, unit } })),
      setSound: (sound) => set((s) => ({ settings: { ...s.settings, sound } })),
      dismissIntro: () => set({ introDismissed: true }),
      startSession: (dayId) => {
        const day = getDay(dayId);
        if (day.focus === "rest") return;
        const { sessions, settings } = get();
        const exercises = day.exercises.map((ex) => {
          const rec = recommendWeight(sessions, ex.id, dayId, settings.unit);
          return {
            exerciseId: ex.id,
            sets: Array.from({ length: ex.sets }, () => ({
              weightKg: rec.weightKg,
              reps: ex.repsMin,
              done: false,
            })),
          };
        });
        const session: Session = {
          id: uid(),
          dayId,
          startedAt: Date.now(),
          focusExerciseId: day.exercises[0]?.id ?? "",
          exercises,
        };
        set({ current: session, rest: null });
      },
      discardCurrent: () => set({ current: null, rest: null }),
      finishSession: () => {
        const { current, sessions } = get();
        if (!current) return;
        const finished: Session = { ...current, finishedAt: Date.now() };
        set({
          current: null,
          rest: null,
          sessions: [...sessions, finished],
        });
      },
      focusExercise: (exerciseId) =>
        set((s) =>
          s.current ? { current: { ...s.current, focusExerciseId: exerciseId } } : {},
        ),
      updateSet: (exerciseId, setIndex, patch) =>
        set((s) => {
          if (!s.current) return {};
          return {
            current: {
              ...s.current,
              exercises: s.current.exercises.map((log) => {
                if (log.exerciseId !== exerciseId) return log;
                return {
                  ...log,
                  sets: log.sets.map((setRow, i) =>
                    i === setIndex ? { ...setRow, ...patch } : setRow,
                  ),
                };
              }),
            },
          };
        }),
      toggleSetDone: (exerciseId, setIndex) => {
        const { current } = get();
        if (!current) return;
        const log = current.exercises.find((e) => e.exerciseId === exerciseId);
        if (!log) return;
        const row = log.sets[setIndex];
        if (!row) return;
        const nextDone = !row.done;
        get().updateSet(exerciseId, setIndex, { done: nextDone });
        if (nextDone) {
          const day = getDay(current.dayId);
          const ex = day.exercises.find((e) => e.id === exerciseId);
          const isLastExercise = day.exercises.at(-1)?.id === exerciseId;
          const isLastSet = setIndex === log.sets.length - 1;
          if (ex && !(isLastExercise && isLastSet)) {
            get().startRest(exerciseId, setIndex, ex.restSec);
          }
          const nextIncomplete = log.sets.findIndex((s, i) => i > setIndex && !s.done);
          if (nextIncomplete >= 0) {
            const justLogged = { ...row, done: true };
            get().updateSet(exerciseId, nextIncomplete, {
              weightKg: justLogged.weightKg,
              reps: justLogged.reps,
            });
          }
        }
      },
      startRest: (exerciseId, setIndex, seconds) => {
        const durationMs = seconds * 1000;
        set({
          rest: {
            exerciseId,
            setIndex,
            durationMs,
            endsAt: Date.now() + durationMs,
            paused: false,
            pausedLeftMs: durationMs,
            overlay: true,
            finished: false,
          },
        });
      },
      skipRest: () => set({ rest: null }),
      pauseRest: () =>
        set((s) => {
          if (!s.rest || s.rest.paused || s.rest.finished) return {};
          return {
            rest: {
              ...s.rest,
              paused: true,
              pausedLeftMs: remainingMs(s.rest),
            },
          };
        }),
      resumeRest: () =>
        set((s) => {
          if (!s.rest || !s.rest.paused) return {};
          return {
            rest: {
              ...s.rest,
              paused: false,
              endsAt: Date.now() + s.rest.pausedLeftMs,
            },
          };
        }),
      addRest: (ms) =>
        set((s) => {
          if (!s.rest || s.rest.finished) return {};
          if (s.rest.paused) {
            return {
              rest: { ...s.rest, pausedLeftMs: s.rest.pausedLeftMs + ms, durationMs: s.rest.durationMs + ms },
            };
          }
          return {
            rest: {
              ...s.rest,
              endsAt: s.rest.endsAt + ms,
              durationMs: s.rest.durationMs + ms,
            },
          };
        }),
      setRestOverlay: (open) =>
        set((s) => (s.rest ? { rest: { ...s.rest, overlay: open } } : {})),
      markRestFinished: () =>
        set((s) => (s.rest ? { rest: { ...s.rest, finished: true, overlay: true } } : {})),
      clearRest: () => set({ rest: null }),
    }),
    {
      name: "forge-powerbuilding",
      partialize: (s) => ({
        settings: s.settings,
        sessions: s.sessions,
        current: s.current,
        rest: s.rest,
        introDismissed: s.introDismissed,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        if (state?.rest) {
          const left = remainingMs(state.rest);
          if (left <= 0 && !state.rest.finished) {
            state.markRestFinished();
          }
        }
      },
    },
  ),
);

export function restRemaining(rest: RestState | null, now = Date.now()) {
  if (!rest) return 0;
  return remainingMs(rest, now);
}

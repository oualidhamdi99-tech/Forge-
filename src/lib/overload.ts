import { addIncrement } from "./units";
import { getDay, getExercise } from "./program";
import type { Exercise, ExerciseLog, Session, Unit } from "./types";

export function hitTopRange(log: ExerciseLog | undefined, ex: Exercise) {
  if (!log) return false;
  const working = log.sets.slice(0, ex.sets);
  if (working.length < ex.sets) return false;
  return working.every((s) => s.done && s.reps >= ex.repsMax);
}

export function workingWeightKg(log: ExerciseLog | undefined) {
  if (!log) return 0;
  const done = log.sets.filter((s) => s.done);
  if (!done.length) return 0;
  const counts = new Map<number, number>();
  for (const s of done) {
    const key = Math.round(s.weightKg * 100) / 100;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0]?.[0] ?? 0;
}

export function lastLogsForExercise(sessions: Session[], exerciseId: string) {
  const out: { session: Session; log: ExerciseLog }[] = [];
  for (let i = sessions.length - 1; i >= 0; i--) {
    const session = sessions[i];
    if (!session.finishedAt) continue;
    const log = session.exercises.find((e) => e.exerciseId === exerciseId);
    if (log && log.sets.some((s) => s.done)) out.push({ session, log });
  }
  return out;
}

export function lastLogForDay(sessions: Session[], exerciseId: string, dayId: number) {
  return lastLogsForExercise(sessions, exerciseId).find((x) => x.session.dayId === dayId);
}

export function lastLogAny(sessions: Session[], exerciseId: string) {
  return lastLogsForExercise(sessions, exerciseId)[0];
}

export type Recommendation = {
  weightKg: number;
  increase: boolean;
  fromKg: number;
  source: "day" | "any" | "none";
  session?: Session;
  log?: ExerciseLog;
};

export function recommendWeight(
  sessions: Session[],
  exerciseId: string,
  dayId: number,
  unit: Unit,
): Recommendation {
  const ex = getExercise(exerciseId) ?? getDay(dayId).exercises.find((e) => e.id === exerciseId);
  const sameDay = lastLogForDay(sessions, exerciseId, dayId);
  const any = lastLogAny(sessions, exerciseId);
  const picked = sameDay ?? any;
  if (!picked || !ex) {
    return { weightKg: 0, increase: false, fromKg: 0, source: "none" };
  }
  const fromKg = workingWeightKg(picked.log);
  const increase = hitTopRange(picked.log, ex);
  const weightKg = increase ? addIncrement(fromKg, unit, ex.increment) : fromKg;
  return {
    weightKg,
    increase,
    fromKg,
    source: sameDay ? "day" : "any",
    session: picked.session,
    log: picked.log,
  };
}

export function sessionVolumeKg(session: Session) {
  let total = 0;
  for (const log of session.exercises) {
    for (const set of log.sets) {
      if (set.done) total += set.weightKg * set.reps;
    }
  }
  return total;
}

export function sessionSetCount(session: Session) {
  let done = 0;
  let total = 0;
  for (const log of session.exercises) {
    for (const set of log.sets) {
      total += 1;
      if (set.done) done += 1;
    }
  }
  return { done, total };
}

export function isSessionComplete(session: Session) {
  const { done, total } = sessionSetCount(session);
  return total > 0 && done === total;
}

export function bestSet(sessions: Session[], exerciseId: string) {
  let best: { weightKg: number; reps: number; at: number } | null = null;
  for (const session of sessions) {
    if (!session.finishedAt) continue;
    const log = session.exercises.find((e) => e.exerciseId === exerciseId);
    if (!log) continue;
    for (const set of log.sets) {
      if (!set.done) continue;
      const score = set.weightKg * (1 + set.reps / 30);
      const bestScore = best ? best.weightKg * (1 + best.reps / 30) : -1;
      if (score > bestScore) {
        best = { weightKg: set.weightKg, reps: set.reps, at: session.finishedAt };
      }
    }
  }
  return best;
}

export function isPrSet(
  sessions: Session[],
  exerciseId: string,
  weightKg: number,
  reps: number,
  ignoreSessionId?: string,
) {
  const score = weightKg * (1 + reps / 30);
  for (const session of sessions) {
    if (session.id === ignoreSessionId) continue;
    if (!session.finishedAt) continue;
    const log = session.exercises.find((e) => e.exerciseId === exerciseId);
    if (!log) continue;
    for (const set of log.sets) {
      if (!set.done) continue;
      if (set.weightKg * (1 + set.reps / 30) >= score) return false;
    }
  }
  return true;
}

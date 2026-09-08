export type Unit = "kg" | "lb";

export type IncrementKind = "barbell" | "dumbbell" | "cable" | "machine" | "bodyweight";

export type Focus = "strength" | "hypertrophy" | "rest";

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  restSec: number;
  increment: IncrementKind;
  bodyweight?: boolean;
  note?: string;
};

export type ProgramDay = {
  id: number;
  title: string;
  focus: Focus;
  short: string;
  exercises: Exercise[];
};

export type SetEntry = {
  weightKg: number;
  reps: number;
  done: boolean;
};

export type ExerciseLog = {
  exerciseId: string;
  sets: SetEntry[];
};

export type Session = {
  id: string;
  dayId: number;
  startedAt: number;
  finishedAt?: number;
  focusExerciseId: string;
  exercises: ExerciseLog[];
};

export type RestState = {
  exerciseId: string;
  setIndex: number;
  durationMs: number;
  endsAt: number;
  paused: boolean;
  pausedLeftMs: number;
  overlay: boolean;
  finished: boolean;
};

export type Settings = {
  unit: Unit;
  sound: boolean;
};

import type { ProgramDay } from "./types";

export const PROGRAM: ProgramDay[] = [
  {
    id: 1,
    title: "Push",
    short: "Push",
    focus: "strength",
    exercises: [
      { id: "bench-press", name: "Bench Press", sets: 5, repsMin: 5, repsMax: 5, restSec: 180, increment: "barbell" },
      { id: "incline-db-press", name: "Incline Dumbbell Press", sets: 4, repsMin: 6, repsMax: 6, restSec: 150, increment: "dumbbell" },
      { id: "standing-ohp", name: "Standing Overhead Press", sets: 5, repsMin: 5, repsMax: 5, restSec: 180, increment: "barbell" },
      { id: "dips", name: "Dips", sets: 4, repsMin: 6, repsMax: 6, restSec: 120, increment: "bodyweight", bodyweight: true, note: "Triceps-focused" },
      { id: "lateral-raises", name: "Lateral Raises", sets: 3, repsMin: 8, repsMax: 10, restSec: 60, increment: "dumbbell" },
      { id: "triceps-pushdowns", name: "Triceps Pushdowns", sets: 3, repsMin: 6, repsMax: 8, restSec: 60, increment: "cable" },
    ],
  },
  {
    id: 2,
    title: "Pull",
    short: "Pull",
    focus: "hypertrophy",
    exercises: [
      { id: "pull-ups", name: "Pull-Ups", sets: 4, repsMin: 12, repsMax: 15, restSec: 90, increment: "bodyweight", bodyweight: true },
      { id: "chest-supported-row", name: "Chest-Supported Row", sets: 4, repsMin: 12, repsMax: 15, restSec: 90, increment: "dumbbell" },
      { id: "sa-db-row", name: "Single-Arm Dumbbell Row", sets: 3, repsMin: 15, repsMax: 15, restSec: 75, increment: "dumbbell" },
      { id: "face-pulls", name: "Face Pulls", sets: 4, repsMin: 15, repsMax: 20, restSec: 60, increment: "cable" },
      { id: "db-pullovers", name: "Dumbbell Pullovers", sets: 3, repsMin: 12, repsMax: 12, restSec: 75, increment: "dumbbell" },
      { id: "ez-bar-curls", name: "EZ-Bar Curls", sets: 4, repsMin: 12, repsMax: 12, restSec: 75, increment: "barbell" },
    ],
  },
  {
    id: 3,
    title: "Legs",
    short: "Legs",
    focus: "strength",
    exercises: [
      { id: "barbell-squat", name: "Barbell Squat", sets: 5, repsMin: 5, repsMax: 5, restSec: 180, increment: "barbell" },
      { id: "rdl", name: "Romanian Deadlift", sets: 4, repsMin: 6, repsMax: 6, restSec: 150, increment: "barbell" },
      { id: "leg-extension", name: "Leg Extension", sets: 3, repsMin: 10, repsMax: 15, restSec: 75, increment: "machine" },
      { id: "lying-leg-curl", name: "Lying Leg Curl", sets: 3, repsMin: 8, repsMax: 12, restSec: 75, increment: "machine" },
      { id: "standing-calf-raise", name: "Standing Calf Raise", sets: 4, repsMin: 6, repsMax: 8, restSec: 90, increment: "machine" },
      { id: "cable-crunch", name: "Cable Crunch", sets: 3, repsMin: 10, repsMax: 15, restSec: 60, increment: "cable" },
    ],
  },
  {
    id: 4,
    title: "Push",
    short: "Push",
    focus: "hypertrophy",
    exercises: [
      { id: "incline-bb-press", name: "Incline Barbell Press", sets: 4, repsMin: 10, repsMax: 12, restSec: 90, increment: "barbell" },
      { id: "seated-db-press", name: "Seated Dumbbell Press", sets: 4, repsMin: 10, repsMax: 12, restSec: 90, increment: "dumbbell" },
      { id: "cable-fly", name: "High-to-Low Cable Fly", sets: 3, repsMin: 15, repsMax: 15, restSec: 60, increment: "cable" },
      { id: "cable-lateral-raise", name: "Cable Lateral Raise", sets: 4, repsMin: 15, repsMax: 20, restSec: 45, increment: "cable" },
      { id: "reverse-pec-deck", name: "Reverse Pec Deck", sets: 3, repsMin: 15, repsMax: 15, restSec: 60, increment: "machine" },
      { id: "skull-crushers", name: "Skull Crushers", sets: 3, repsMin: 12, repsMax: 12, restSec: 75, increment: "barbell" },
    ],
  },
  {
    id: 5,
    title: "Pull",
    short: "Pull",
    focus: "strength",
    exercises: [
      { id: "conventional-deadlift", name: "Conventional Deadlift", sets: 4, repsMin: 5, repsMax: 5, restSec: 210, increment: "barbell" },
      { id: "pendlay-row", name: "Pendlay Row", sets: 4, repsMin: 5, repsMax: 5, restSec: 180, increment: "barbell" },
      { id: "weighted-pull-ups", name: "Weighted Pull-Ups", sets: 4, repsMin: 5, repsMax: 5, restSec: 180, increment: "bodyweight", bodyweight: true },
      { id: "t-bar-row", name: "T-Bar Row", sets: 3, repsMin: 6, repsMax: 8, restSec: 150, increment: "barbell" },
      { id: "hammer-curls", name: "Hammer Curls", sets: 3, repsMin: 6, repsMax: 8, restSec: 75, increment: "dumbbell" },
    ],
  },
  {
    id: 6,
    title: "Legs",
    short: "Legs",
    focus: "hypertrophy",
    exercises: [
      { id: "high-bar-squat", name: "High-Bar Squat", sets: 4, repsMin: 12, repsMax: 12, restSec: 120, increment: "barbell" },
      { id: "leg-extension", name: "Leg Extension", sets: 4, repsMin: 15, repsMax: 20, restSec: 60, increment: "machine" },
      { id: "lying-leg-curl", name: "Lying Leg Curl", sets: 4, repsMin: 15, repsMax: 20, restSec: 60, increment: "machine" },
      { id: "seated-calf-raise", name: "Seated Calf Raise", sets: 4, repsMin: 15, repsMax: 20, restSec: 45, increment: "machine" },
      { id: "hanging-knee-raise", name: "Hanging Knee Raise", sets: 3, repsMin: 8, repsMax: 15, restSec: 60, increment: "bodyweight", bodyweight: true },
    ],
  },
  {
    id: 7,
    title: "Rest",
    short: "Rest",
    focus: "rest",
    exercises: [],
  },
];

export function getDay(id: number) {
  return PROGRAM.find((d) => d.id === id) ?? PROGRAM[0];
}

export function getExercise(id: string) {
  for (const day of PROGRAM) {
    const ex = day.exercises.find((e) => e.id === id);
    if (ex) return ex;
  }
  return undefined;
}

export function allExercises() {
  const map = new Map<string, { exercise: (typeof PROGRAM)[0]["exercises"][0]; days: number[] }>();
  for (const day of PROGRAM) {
    for (const ex of day.exercises) {
      const prev = map.get(ex.id);
      if (prev) prev.days.push(day.id);
      else map.set(ex.id, { exercise: ex, days: [day.id] });
    }
  }
  return [...map.values()];
}

export function formatPrescription(sets: number, min: number, max: number) {
  if (min === max) return `${sets} × ${min}`;
  return `${sets} × ${min}–${max}`;
}

export function todayProgramDay(now = new Date()) {
  const dow = now.getDay();
  return dow === 0 ? 7 : dow;
}

export function focusLabel(focus: ProgramDay["focus"]) {
  if (focus === "strength") return "Strength";
  if (focus === "hypertrophy") return "Hypertrophy";
  return "Recovery";
}

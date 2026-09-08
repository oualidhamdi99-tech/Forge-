import { roundTo } from "./utils";
import type { IncrementKind, Unit } from "./types";

const KG_PER_LB = 0.45359237;

export const INCREMENT: Record<IncrementKind, { kg: number; lb: number }> = {
  barbell: { kg: 2.5, lb: 5 },
  dumbbell: { kg: 2, lb: 5 },
  cable: { kg: 1.25, lb: 2.5 },
  machine: { kg: 2.5, lb: 5 },
  bodyweight: { kg: 2.5, lb: 5 },
};

export function kgToDisplay(kg: number, unit: Unit) {
  if (unit === "kg") return roundTo(kg, 0.25);
  return roundTo(kg / KG_PER_LB, 0.5);
}

export function displayToKg(value: number, unit: Unit) {
  if (unit === "kg") return roundTo(value, 0.25);
  return value * KG_PER_LB;
}

export function formatNumber(n: number) {
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 100) / 100).replace(/\.0$/, "");
}

export function formatWeight(kg: number, unit: Unit, bodyweight?: boolean) {
  if (bodyweight && kg <= 0) return "BW";
  const v = kgToDisplay(kg, unit);
  const n = formatNumber(v);
  if (bodyweight) return `+${n}`;
  return n;
}

export function formatWeightUnit(kg: number, unit: Unit, bodyweight?: boolean) {
  const core = formatWeight(kg, unit, bodyweight);
  if (core === "BW") return "BW";
  return `${core} ${unit}`;
}

export function stepWeight(currentKg: number, dir: 1 | -1, unit: Unit, kind: IncrementKind) {
  const inc = INCREMENT[kind];
  if (unit === "kg") {
    return Math.max(0, roundTo(currentKg + dir * inc.kg, 0.25));
  }
  const nextLb = Math.max(0, kgToDisplay(currentKg, "lb") + dir * inc.lb);
  return displayToKg(nextLb, "lb");
}

export function addIncrement(kg: number, unit: Unit, kind: IncrementKind) {
  return stepWeight(kg, 1, unit, kind);
}

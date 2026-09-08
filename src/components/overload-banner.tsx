import { formatWeightUnit } from "@/lib/units";
import type { Unit } from "@/lib/types";
import { cn } from "@/lib/utils";

export function OverloadBanner({
  unit,
  nextKg,
  bodyweight,
  compact,
}: {
  unit: Unit;
  nextKg: number;
  bodyweight?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border border-success/30 bg-success/10 px-3 py-3",
        compact && "py-2",
      )}
    >
      <CheckMark />
      <div className="min-w-0">
        <p className="font-display text-sm tracking-wide text-success uppercase">Increase to next weight</p>
        <p className="text-sm text-fg">
          Next session: {formatWeightUnit(nextKg, unit, bodyweight)}
        </p>
      </div>
    </div>
  );
}

export function CheckMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-success-fg",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none">
        <path
          className="check-stroke"
          d="M5 12.5 9.5 17 19 7.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

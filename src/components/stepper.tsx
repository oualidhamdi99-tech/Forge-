import { useRef } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  valueLabel: string;
  onStep: (dir: 1 | -1) => void;
  disabled?: boolean;
  ariaLabel: string;
};

export function Stepper({ valueLabel, onStep, disabled, ariaLabel }: Props) {
  const hold = useRef<number | null>(null);
  const delay = useRef<number | null>(null);

  function clear() {
    if (hold.current) window.clearInterval(hold.current);
    if (delay.current) window.clearTimeout(delay.current);
    hold.current = null;
    delay.current = null;
  }

  function start(dir: 1 | -1) {
    if (disabled) return;
    onStep(dir);
    delay.current = window.setTimeout(() => {
      hold.current = window.setInterval(() => onStep(dir), 90);
    }, 380);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={disabled}
        aria-label={`Decrease ${ariaLabel}`}
        onPointerDown={() => start(-1)}
        onPointerUp={clear}
        onPointerLeave={clear}
        onPointerCancel={clear}
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-sm border border-border bg-elevated text-fg transition-[background-color,transform] duration-150 active:scale-[0.96] disabled:opacity-40",
        )}
      >
        <Minus className="size-4" />
      </button>
      <div
        className="min-w-16 px-1 text-center font-mono text-base font-medium tabular-nums text-fg"
        aria-label={ariaLabel}
      >
        {valueLabel}
      </div>
      <button
        type="button"
        disabled={disabled}
        aria-label={`Increase ${ariaLabel}`}
        onPointerDown={() => start(1)}
        onPointerUp={clear}
        onPointerLeave={clear}
        onPointerCancel={clear}
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-sm border border-border bg-elevated text-fg transition-[background-color,transform] duration-150 active:scale-[0.96] disabled:opacity-40",
        )}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

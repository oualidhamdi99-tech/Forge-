import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useForgeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const unit = useForgeStore((s) => s.settings.unit);
  const sound = useForgeStore((s) => s.settings.sound);
  const setUnit = useForgeStore((s) => s.setUnit);
  const setSound = useForgeStore((s) => s.setSound);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Units, rest chime, and how the log behaves.</DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted uppercase">Units</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["kg", "lb"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={cn(
                    "h-11 rounded-sm border text-sm font-medium transition-colors duration-150",
                    unit === u
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-border bg-elevated text-fg hover:bg-surface",
                  )}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center justify-between gap-4">
            <span>
              <span className="block text-sm text-fg">Rest chime</span>
              <span className="block text-xs text-muted">Three beeps when the watch hits zero</span>
            </span>
            <Switch checked={sound} onCheckedChange={setSound} />
          </label>
          <p className="text-xs leading-relaxed text-subtle">
            Double progression: when every set hits the top of the rep range, Forge flags an increase
            for next session and pre-loads the new weight.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

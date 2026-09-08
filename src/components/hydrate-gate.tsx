import { useEffect, type ReactNode } from "react";
import { useForgeStore } from "@/lib/store";

export function HydrateGate({ children }: { children: ReactNode }) {
  const hydrated = useForgeStore((s) => s.hydrated);

  useEffect(() => {
    if (useForgeStore.persist.hasHydrated()) {
      useForgeStore.setState({ hydrated: true });
    }
    const unsub = useForgeStore.persist.onFinishHydration(() => {
      useForgeStore.setState({ hydrated: true });
    });
    return unsub;
  }, []);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 rounded-sm bg-elevated" />
        <div className="h-40 rounded-xl bg-surface" />
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-16 rounded-md bg-surface" />
          ))}
        </div>
      </div>
    );
  }

  return children;
}

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-elevated text-fg border-border shadow-[var(--shadow-panel)]",
          description: "text-muted",
          actionButton: "bg-accent text-accent-fg",
          cancelButton: "bg-surface text-fg",
        },
      }}
      {...props}
    />
  );
}

import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { History, Settings, Dumbbell } from "lucide-react";
import { RestOverlay } from "@/components/rest-overlay";
import { SettingsDialog } from "@/components/settings-dialog";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-dvh flex-col bg-bg text-fg">
        <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
            <Link to="/" className="font-display text-xl tracking-[0.22em] text-fg uppercase">
              Forge
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <NavLink to="/" active={pathname === "/"}>
                Today
              </NavLink>
              <NavLink to="/program" active={pathname === "/program"}>
                Program
              </NavLink>
              <NavLink to="/history" active={pathname.startsWith("/history")}>
                History
              </NavLink>
            </nav>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:text-fg"
              aria-label="Settings"
            >
              <Settings className="size-5" />
            </button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-6 md:pb-10">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] md:hidden">
          <div className="grid grid-cols-3">
            <TabLink to="/" active={pathname === "/"} icon={<Dumbbell className="size-5" />} label="Today" />
            <TabLink
              to="/program"
              active={pathname === "/program"}
              icon={<ProgramIcon />}
              label="Program"
            />
            <TabLink
              to="/history"
              active={pathname.startsWith("/history")}
              icon={<History className="size-5" />}
              label="History"
            />
          </div>
        </nav>
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
        <RestOverlay />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

function NavLink({
  to,
  active,
  children,
}: {
  to: "/" | "/program" | "/history";
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "rounded-sm px-3 py-2 text-sm transition-colors duration-150",
        active ? "text-fg" : "text-muted hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}

function TabLink({
  to,
  active,
  icon,
  label,
}: {
  to: "/" | "/program" | "/history";
  active: boolean;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex min-h-14 flex-col items-center justify-center gap-1 text-[0.7rem] tracking-wide uppercase",
        active ? "text-fg" : "text-subtle",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function ProgramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="4.5" width="5" height="15" rx="1" />
      <rect x="9.5" y="4.5" width="5" height="15" rx="1" />
      <rect x="15.5" y="4.5" width="5" height="15" rx="1" />
    </svg>
  );
}

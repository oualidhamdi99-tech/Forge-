import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as ArrowRight, m as Clock, o as RotateCcw } from "../_libs/lucide-react.mjs";
import { A as sessionVolumeKg, N as todayProgramDay, O as relativeDay, P as useForgeStore, T as lastLogForDay, _ as formatWeight, c as HydrateGate, g as formatPrescription, h as formatDuration, j as startOfWeek, k as sessionSetCount, l as PROGRAM, m as focusLabel, n as Button, p as cn, t as AppShell, x as hitTopRange, y as getDay } from "./hydrate-gate-CLX3QEzj.mjs";
import { t as CheckMark } from "./overload-banner-B25rRIdh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DQ80MWAn.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-surface text-fg shadow-[var(--shadow-panel)]", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5 pt-0", className),
		...props
	});
}
function WeekStrip({ compact }) {
	const sessions = useForgeStore((s) => s.sessions);
	const current = useForgeStore((s) => s.current);
	const today = todayProgramDay();
	const weekStart = startOfWeek().getTime();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid grid-cols-7 gap-1.5", compact && "gap-1"),
		children: PROGRAM.map((day) => {
			const doneThisWeek = sessions.some((s) => s.dayId === day.id && s.finishedAt && s.finishedAt >= weekStart);
			const isToday = day.id === today;
			const isLive = current?.dayId === day.id;
			const className = cn("flex min-h-16 flex-col items-center justify-center rounded-md border px-1 py-2 text-center transition-colors duration-150", isToday ? "border-fg/30 bg-elevated" : "border-border bg-surface", doneThisWeek && "border-success/40", isLive && "border-accent");
			const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[0.65rem] tabular-nums text-subtle",
					children: day.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xs uppercase tracking-wide text-fg",
					children: day.short
				}),
				!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 text-[0.6rem] text-subtle uppercase",
					children: day.focus === "rest" ? "Off" : day.focus === "strength" ? "Str" : "Hyp"
				}) : null,
				doneThisWeek ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 rounded-full bg-success" }) : null
			] });
			if (day.focus === "rest") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className,
				children: inner
			}, day.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/train/$dayId",
				params: { dayId: String(day.id) },
				className,
				children: inner
			}, day.id);
		})
	});
}
function WeekMeta() {
	const sessions = useForgeStore((s) => s.sessions);
	const weekStart = startOfWeek().getTime();
	const thisWeek = sessions.filter((s) => s.finishedAt && s.finishedAt >= weekStart);
	const trained = new Set(thisWeek.map((s) => s.dayId)).size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			trained,
			"/6 sessions this week",
			thisWeek.length === 0 ? " · open a day when you’re ready" : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) }) });
}
function Dashboard() {
	const navigate = useNavigate();
	const todayId = todayProgramDay();
	const day = getDay(todayId);
	const current = useForgeStore((s) => s.current);
	const sessions = useForgeStore((s) => s.sessions);
	const startSession = useForgeStore((s) => s.startSession);
	const introDismissed = useForgeStore((s) => s.introDismissed);
	const dismissIntro = useForgeStore((s) => s.dismissIntro);
	const unit = useForgeStore((s) => s.settings.unit);
	const last = [...sessions].reverse()[0];
	const weekday = (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { weekday: "long" });
	function begin(dayId) {
		if (getDay(dayId).focus === "rest") return;
		if (current?.dayId === dayId) {
			navigate({
				to: "/train/$dayId",
				params: { dayId: String(dayId) }
			});
			return;
		}
		if (current && current.dayId !== dayId) {
			const { done } = sessionSetCount(current);
			if (done > 0) {
				navigate({
					to: "/train/$dayId",
					params: { dayId: String(current.dayId) }
				});
				return;
			}
		}
		startSession(dayId);
		navigate({
			to: "/train/$dayId",
			params: { dayId: String(dayId) }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-muted uppercase",
					children: weekday
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-5xl uppercase leading-none tracking-wide text-fg",
					children: ["Day ", day.id]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-display text-xl uppercase tracking-wide text-muted",
					children: [
						day.title,
						" · ",
						focusLabel(day.focus)
					]
				})
			] }),
			!introDismissed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3 pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm tracking-wide uppercase",
						children: "How Forge works"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: "Log every set. The watch runs your rest. Last session’s numbers sit on the lift so you know the load. Hit the top of the rep range on every set — green check, add weight next time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: dismissIntro,
						className: "px-0",
						children: "Got it"
					})
				]
			}) }) : null,
			current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-accent/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center justify-between gap-3 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.18em] text-muted uppercase",
							children: "Session in progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-2xl uppercase",
							children: [
								"Day ",
								current.dayId,
								" · ",
								getDay(current.dayId).title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								sessionSetCount(current).done,
								"/",
								sessionSetCount(current).total,
								" sets logged"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/train/$dayId",
							params: { dayId: String(current.dayId) },
							children: ["Resume", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})]
				})
			}) : day.focus === "rest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "h-14 w-full text-base",
				onClick: () => begin(day.id),
				children: [
					"Start ",
					day.title,
					" session",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm tracking-[0.2em] text-muted uppercase",
						children: "This week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekMeta, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekStrip, {})]
			}),
			day.focus !== "rest" && !current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-sm tracking-[0.2em] text-muted uppercase",
					children: "Today’s lifts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface",
					children: day.exercises.map((ex, i) => {
						const prev = lastLogForDay(sessions, ex.id, day.id) ?? null;
						const increase = prev ? hitTopRange(prev.log, ex) : false;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 font-mono text-xs tabular-nums text-subtle",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm text-fg",
										children: ex.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [formatPrescription(ex.sets, ex.repsMin, ex.repsMax), prev ? ` · last ${prev.log.sets.filter((s) => s.done).map((s) => `${formatWeight(s.weightKg, unit, ex.bodyweight)}×${s.reps}`).join("  ")}` : " · no history"]
									})]
								}),
								increase ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckMark, { className: "size-7" }) : null
							]
						}, ex.id);
					})
				})]
			}) : null,
			last?.finishedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-sm tracking-[0.2em] text-muted uppercase",
					children: "Last session"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/history",
					className: "flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-4 transition-colors duration-150 hover:bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg uppercase",
						children: [
							"Day ",
							last.dayId,
							" · ",
							getDay(last.dayId).title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-2 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
							relativeDay(last.finishedAt),
							" · ",
							formatDuration(last.finishedAt - last.startedAt),
							" ·",
							" ",
							Math.round(sessionVolumeKg(last)),
							" ",
							unit,
							" volume"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-subtle" })]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-xs text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3" }), "Logs stay on this device."]
			})
		]
	});
}
function RestPanel() {
	const sessions = useForgeStore((s) => s.sessions);
	const last = [...sessions].reverse()[0];
	const missed = PROGRAM.filter((d) => d.focus !== "rest").filter((d) => !sessions.some((s) => s.dayId === d.id && s.finishedAt));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-4 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl uppercase",
				children: "Rest day"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Walk, eat, sleep. The next load is earned here. If a session slipped, pick it up from the week strip."
			}),
			last?.finishedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Last trained Day ",
					last.dayId,
					" ",
					relativeDay(last.finishedAt),
					"."
				]
			}) : null,
			missed.length > 0 && sessions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-subtle",
				children: ["Still open: ", missed.map((d) => `Day ${d.id} ${d.title}`).join(", ")]
			}) : null
		]
	}) });
}
//#endregion
export { Home as component };

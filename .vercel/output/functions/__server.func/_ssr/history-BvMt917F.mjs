import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as sessionVolumeKg, O as relativeDay, P as useForgeStore, _ as formatWeight, b as getExercise, c as HydrateGate, d as allExercises, h as formatDuration, k as sessionSetCount, t as AppShell, x as hitTopRange, y as getDay } from "./hydrate-gate-CLX3QEzj.mjs";
import { t as Badge } from "./badge-DbDMAokG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-BvMt917F.js
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryBody, {}) }) });
}
function HistoryBody() {
	const sessions = useForgeStore((s) => s.sessions);
	const unit = useForgeStore((s) => s.settings.unit);
	const ordered = [...sessions].reverse();
	const catalog = allExercises();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-muted uppercase",
					children: "Archive"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl uppercase tracking-wide",
					children: "History"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: sessions.length === 0 ? "Finish a session and it lives here — every set, every load." : `${sessions.length} session${sessions.length === 1 ? "" : "s"} saved on this device.`
				})
			] }),
			catalog.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-sm tracking-[0.2em] text-muted uppercase",
					children: "Lifts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: catalog.map(({ exercise }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/history/$exerciseId",
						params: { exerciseId: exercise.id },
						className: "rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-fg transition-colors duration-150 hover:bg-elevated",
						children: exercise.name
					}, exercise.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-sm tracking-[0.2em] text-muted uppercase",
					children: "Sessions"
				}), ordered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted",
					children: "No sessions yet. Start today’s workout to write the first page."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: ordered.map((session) => {
						const day = getDay(session.dayId);
						const { done, total } = sessionSetCount(session);
						const increases = session.exercises.filter((log) => {
							const ex = getExercise(log.exerciseId);
							return ex ? hitTopRange(log, ex) : false;
						}).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-xl uppercase",
									children: [
										"Day ",
										day.id,
										" · ",
										day.title
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										session.finishedAt ? relativeDay(session.finishedAt) : "Open",
										" ·",
										" ",
										session.finishedAt ? formatDuration(session.finishedAt - session.startedAt) : "—",
										" ",
										"· ",
										Math.round(sessionVolumeKg(session)),
										" ",
										unit
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
										done,
										"/",
										total
									] }), increases > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "success",
										children: [increases, " increase"]
									}) : null]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1",
								children: session.exercises.map((log) => {
									const ex = getExercise(log.exerciseId);
									if (!ex) return null;
									const sets = log.sets.filter((s) => s.done);
									if (!sets.length) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-32 shrink-0 truncate text-muted",
												children: ex.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono tabular-nums text-fg",
												children: sets.map((s) => `${formatWeight(s.weightKg, unit, ex.bodyweight)}×${s.reps}`).join("  ")
											}),
											hitTopRange(log, ex) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-success",
												children: "+wt"
											}) : null
										]
									}, log.exerciseId);
								})
							})]
						}, session.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { HistoryPage as component };

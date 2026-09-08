import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { C as kgToDisplay, D as recommendWeight, E as lastLogsForExercise, I as workingWeightKg, O as relativeDay, P as useForgeStore, _ as formatWeight, b as getExercise, c as HydrateGate, f as bestSet, g as formatPrescription, l as PROGRAM, t as AppShell, v as formatWeightUnit, x as hitTopRange } from "./hydrate-gate-CLX3QEzj.mjs";
import { r as Route$1 } from "./router-DH3GfSle.mjs";
import { n as OverloadBanner } from "./overload-banner-B25rRIdh.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history._exerciseId-CVB7L1bT.js
var import_jsx_runtime = require_jsx_runtime();
function ExerciseHistoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseHistoryBody, {}) }) });
}
function ExerciseHistoryBody() {
	const { exerciseId } = Route$1.useParams();
	const exercise = getExercise(exerciseId);
	const sessions = useForgeStore((s) => s.sessions);
	const unit = useForgeStore((s) => s.settings.unit);
	if (!exercise) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Unknown lift."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/history",
			className: "text-sm text-fg underline",
			children: "Back to history"
		})]
	});
	const logs = lastLogsForExercise(sessions, exercise.id);
	const days = PROGRAM.filter((d) => d.exercises.some((e) => e.id === exercise.id));
	const rec = recommendWeight(sessions, exercise.id, days[0]?.id ?? 1, unit);
	const pr = bestSet(sessions, exercise.id);
	const chart = [...logs].reverse().map((row) => ({
		date: new Date(row.session.finishedAt ?? row.session.startedAt).toLocaleDateString(void 0, {
			month: "short",
			day: "numeric"
		}),
		weight: kgToDisplay(workingWeightKg(row.log), unit)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/history",
				className: "inline-flex items-center gap-2 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "History"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl uppercase tracking-wide",
				children: exercise.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: days.map((d) => `Day ${d.id} ${formatPrescription(d.exercises.find((e) => e.id === exercise.id)?.sets ?? exercise.sets, d.exercises.find((e) => e.id === exercise.id)?.repsMin ?? exercise.repsMin, d.exercises.find((e) => e.id === exercise.id)?.repsMax ?? exercise.repsMax)}`).join(" · ")
			})] }),
			rec.increase && rec.weightKg > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverloadBanner, {
				unit,
				nextKg: rec.weightKg,
				bodyweight: exercise.bodyweight
			}) : null,
			pr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Best set ",
					formatWeightUnit(pr.weightKg, unit, exercise.bodyweight),
					" × ",
					pr.reps,
					pr.at ? ` · ${relativeDay(pr.at)}` : ""
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No logged sets yet."
			}),
			chart.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48 rounded-xl border border-border bg-surface p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: chart,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "date",
								tick: {
									fill: "var(--color-subtle)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-subtle)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								width: 36
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "var(--color-elevated)",
									border: "1px solid var(--color-border)",
									borderRadius: 8,
									color: "var(--color-fg)"
								},
								formatter: (value) => [`${value} ${unit}`, "Load"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "weight",
								stroke: "var(--color-accent)",
								strokeWidth: 2,
								dot: { r: 3 }
							})
						]
					})
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: logs.map((row) => {
					const exOnDay = getExercise(exercise.id);
					const dayEx = PROGRAM.find((d) => d.id === row.session.dayId)?.exercises.find((e) => e.id === exercise.id) ?? exOnDay;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-fg",
								children: [
									"Day ",
									row.session.dayId,
									" · ",
									relativeDay(row.session.finishedAt ?? row.session.startedAt)
								]
							}), hitTopRange(row.log, dayEx) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-success",
								children: "Increase next"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-sm tabular-nums text-fg",
							children: row.log.sets.filter((s) => s.done).map((s) => `${formatWeight(s.weightKg, unit, exercise.bodyweight)} × ${s.reps}`).join("   ")
						})]
					}, row.session.id);
				})
			})
		]
	});
}
//#endregion
export { ExerciseHistoryPage as component };

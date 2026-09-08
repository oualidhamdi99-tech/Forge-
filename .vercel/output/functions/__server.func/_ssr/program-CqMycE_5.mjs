import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { P as useForgeStore, c as HydrateGate, g as formatPrescription, j as startOfWeek, l as PROGRAM, m as focusLabel, t as AppShell } from "./hydrate-gate-CLX3QEzj.mjs";
import { t as Badge } from "./badge-DbDMAokG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/program-CqMycE_5.js
var import_jsx_runtime = require_jsx_runtime();
function ProgramPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramBody, {}) }) });
}
function ProgramBody() {
	const sessions = useForgeStore((s) => s.sessions);
	const weekStart = startOfWeek().getTime();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] text-muted uppercase",
				children: "Six-day split"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl uppercase tracking-wide",
				children: "Program"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-muted",
				children: "Strength and hypertrophy alternate. Same lifts keep their history so last week’s numbers are waiting on the bar."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: PROGRAM.map((day) => {
				const done = sessions.some((s) => s.dayId === day.id && s.finishedAt && s.finishedAt >= weekStart);
				const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tabular-nums text-subtle",
						children: ["Day ", day.id]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl uppercase tracking-wide",
						children: day.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "success",
							children: "Done"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: focusLabel(day.focus) })]
					})]
				}), day.exercises.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-1.5",
					children: day.exercises.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 font-mono text-xs tabular-nums text-subtle",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-fg",
								children: ex.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: formatPrescription(ex.sets, ex.repsMin, ex.repsMax)
							})
						]
					}, ex.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Full rest. No work."
				})] });
				const className = "block rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:bg-elevated";
				if (day.focus === "rest") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className,
					children: body
				}, day.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/train/$dayId",
					params: { dayId: String(day.id) },
					className,
					children: body
				}, day.id);
			})
		})]
	});
}
//#endregion
export { ProgramPage as component };

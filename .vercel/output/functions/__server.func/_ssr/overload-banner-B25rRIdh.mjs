import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { p as cn, v as formatWeightUnit } from "./hydrate-gate-CLX3QEzj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/overload-banner-B25rRIdh.js
var import_jsx_runtime = require_jsx_runtime();
function OverloadBanner({ unit, nextKg, bodyweight, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3 rounded-md border border-success/30 bg-success/10 px-3 py-3", compact && "py-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm tracking-wide text-success uppercase",
				children: "Increase to next weight"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-fg",
				children: ["Next session: ", formatWeightUnit(nextKg, unit, bodyweight)]
			})]
		})]
	});
}
function CheckMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-success-fg", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			className: "size-5",
			fill: "none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				className: "check-stroke",
				d: "M5 12.5 9.5 17 19 7.5",
				stroke: "currentColor",
				strokeWidth: "2.2",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	});
}
//#endregion
export { OverloadBanner as n, CheckMark as t };

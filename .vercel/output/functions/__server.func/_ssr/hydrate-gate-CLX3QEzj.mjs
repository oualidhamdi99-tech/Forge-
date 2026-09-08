import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Settings, c as Play, d as History, h as ChevronDown, i as SkipForward, l as Pause, p as Dumbbell, s as Plus, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, f as Slot, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hydrate-gate-CLX3QEzj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
function formatDuration(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function formatClock(ms) {
	const total = Math.max(0, Math.ceil(ms / 1e3));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}
function startOfWeek(d = /* @__PURE__ */ new Date()) {
	const date = new Date(d);
	date.setHours(0, 0, 0, 0);
	const day = date.getDay();
	const diff = day === 0 ? -6 : 1 - day;
	date.setDate(date.getDate() + diff);
	return date;
}
function relativeDay(ts) {
	const then = new Date(ts);
	const now = /* @__PURE__ */ new Date();
	const startThen = new Date(then);
	startThen.setHours(0, 0, 0, 0);
	const startNow = new Date(now);
	startNow.setHours(0, 0, 0, 0);
	const days = Math.round((startNow.getTime() - startThen.getTime()) / 864e5);
	if (days === 0) return "Today";
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days} days ago`;
	if (days < 14) return "Last week";
	const weeks = Math.round(days / 7);
	return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
}
function roundTo(n, step) {
	return Math.round(n / step) * step;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg border border-border hover:bg-surface",
			ghost: "text-fg hover:bg-elevated",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated",
			success: "bg-success text-success-fg hover:opacity-90",
			destructive: "bg-danger/90 text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function WatchFace({ remainingMs, durationMs, label, sublabel, finished }) {
	const progress = durationMs <= 0 ? 0 : Math.min(1, Math.max(0, remainingMs / durationMs));
	const r = 82;
	const c = 2 * Math.PI * r;
	const urgent = !finished && remainingMs > 0 && remainingMs <= 1e4;
	const ticks = Array.from({ length: 60 }, (_, i) => i);
	const handAngle = finished ? 0 : progress * 360;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("watch-face relative", urgent && "watch-urgent"),
		role: "timer",
		"aria-label": `${label} ${formatClock(remainingMs)}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 200 200",
			className: "size-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "100",
					cy: "100",
					r: "96",
					fill: "var(--color-elevated)",
					stroke: "var(--color-border)",
					strokeWidth: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "100",
					cy: "100",
					r: "88",
					fill: "none",
					stroke: "var(--color-border)",
					strokeWidth: "1"
				}),
				ticks.map((i) => {
					const a = i / 60 * Math.PI * 2 - Math.PI / 2;
					const major = i % 5 === 0;
					const inner = major ? 74 : 80;
					const outer = 86;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: 100 + Math.cos(a) * inner,
						y1: 100 + Math.sin(a) * inner,
						x2: 100 + Math.cos(a) * outer,
						y2: 100 + Math.sin(a) * outer,
						stroke: major ? "var(--color-muted)" : "var(--color-border)",
						strokeWidth: major ? 1.5 : 1
					}, i);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "watch-ring",
					cx: "100",
					cy: "100",
					r,
					fill: "none",
					stroke: finished ? "var(--color-success)" : "var(--color-accent)",
					strokeWidth: "4",
					strokeLinecap: "round",
					strokeDasharray: c,
					strokeDashoffset: c * (1 - (finished ? 1 : progress)),
					transform: "rotate(-90 100 100)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "100",
					y1: "100",
					x2: 100 + Math.sin(handAngle * Math.PI / 180) * 62,
					y2: 100 - Math.cos(handAngle * Math.PI / 180) * 62,
					stroke: finished ? "var(--color-success)" : "var(--color-fg)",
					strokeWidth: "2",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "100",
					cy: "100",
					r: "3.5",
					fill: "var(--color-fg)"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xs tracking-[0.28em] text-muted uppercase",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-display text-5xl font-medium tabular-nums leading-none tracking-tight text-fg", finished && "text-success"),
					children: finished ? "GO" : formatClock(remainingMs)
				}),
				sublabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 font-mono text-[0.7rem] tracking-widest text-subtle uppercase",
					children: sublabel
				}) : null
			]
		})]
	});
}
var ctx = null;
function getCtx() {
	if (typeof window === "undefined") return null;
	const AC = window.AudioContext || window.webkitAudioContext;
	if (!AC) return null;
	if (!ctx) ctx = new AC();
	return ctx;
}
function chimeRestDone() {
	const ac = getCtx();
	if (!ac) return;
	ac.resume();
	const now = ac.currentTime;
	[
		0,
		.16,
		.32
	].forEach((t, i) => {
		const osc = ac.createOscillator();
		const gain = ac.createGain();
		osc.type = "square";
		osc.frequency.value = i === 2 ? 1174 : 880;
		gain.gain.setValueAtTime(1e-4, now + t);
		gain.gain.exponentialRampToValueAtTime(.07, now + t + .018);
		gain.gain.exponentialRampToValueAtTime(1e-4, now + t + .12);
		osc.connect(gain);
		gain.connect(ac.destination);
		osc.start(now + t);
		osc.stop(now + t + .14);
	});
}
var PROGRAM = [
	{
		id: 1,
		title: "Push",
		short: "Push",
		focus: "strength",
		exercises: [
			{
				id: "bench-press",
				name: "Bench Press",
				sets: 5,
				repsMin: 5,
				repsMax: 5,
				restSec: 180,
				increment: "barbell"
			},
			{
				id: "incline-db-press",
				name: "Incline Dumbbell Press",
				sets: 4,
				repsMin: 6,
				repsMax: 6,
				restSec: 150,
				increment: "dumbbell"
			},
			{
				id: "standing-ohp",
				name: "Standing Overhead Press",
				sets: 5,
				repsMin: 5,
				repsMax: 5,
				restSec: 180,
				increment: "barbell"
			},
			{
				id: "dips",
				name: "Dips",
				sets: 4,
				repsMin: 6,
				repsMax: 6,
				restSec: 120,
				increment: "bodyweight",
				bodyweight: true,
				note: "Triceps-focused"
			},
			{
				id: "lateral-raises",
				name: "Lateral Raises",
				sets: 3,
				repsMin: 8,
				repsMax: 10,
				restSec: 60,
				increment: "dumbbell"
			},
			{
				id: "triceps-pushdowns",
				name: "Triceps Pushdowns",
				sets: 3,
				repsMin: 6,
				repsMax: 8,
				restSec: 60,
				increment: "cable"
			}
		]
	},
	{
		id: 2,
		title: "Pull",
		short: "Pull",
		focus: "hypertrophy",
		exercises: [
			{
				id: "pull-ups",
				name: "Pull-Ups",
				sets: 4,
				repsMin: 12,
				repsMax: 15,
				restSec: 90,
				increment: "bodyweight",
				bodyweight: true
			},
			{
				id: "chest-supported-row",
				name: "Chest-Supported Row",
				sets: 4,
				repsMin: 12,
				repsMax: 15,
				restSec: 90,
				increment: "dumbbell"
			},
			{
				id: "sa-db-row",
				name: "Single-Arm Dumbbell Row",
				sets: 3,
				repsMin: 15,
				repsMax: 15,
				restSec: 75,
				increment: "dumbbell"
			},
			{
				id: "face-pulls",
				name: "Face Pulls",
				sets: 4,
				repsMin: 15,
				repsMax: 20,
				restSec: 60,
				increment: "cable"
			},
			{
				id: "db-pullovers",
				name: "Dumbbell Pullovers",
				sets: 3,
				repsMin: 12,
				repsMax: 12,
				restSec: 75,
				increment: "dumbbell"
			},
			{
				id: "ez-bar-curls",
				name: "EZ-Bar Curls",
				sets: 4,
				repsMin: 12,
				repsMax: 12,
				restSec: 75,
				increment: "barbell"
			}
		]
	},
	{
		id: 3,
		title: "Legs",
		short: "Legs",
		focus: "strength",
		exercises: [
			{
				id: "barbell-squat",
				name: "Barbell Squat",
				sets: 5,
				repsMin: 5,
				repsMax: 5,
				restSec: 180,
				increment: "barbell"
			},
			{
				id: "rdl",
				name: "Romanian Deadlift",
				sets: 4,
				repsMin: 6,
				repsMax: 6,
				restSec: 150,
				increment: "barbell"
			},
			{
				id: "leg-extension",
				name: "Leg Extension",
				sets: 3,
				repsMin: 10,
				repsMax: 15,
				restSec: 75,
				increment: "machine"
			},
			{
				id: "lying-leg-curl",
				name: "Lying Leg Curl",
				sets: 3,
				repsMin: 8,
				repsMax: 12,
				restSec: 75,
				increment: "machine"
			},
			{
				id: "standing-calf-raise",
				name: "Standing Calf Raise",
				sets: 4,
				repsMin: 6,
				repsMax: 8,
				restSec: 90,
				increment: "machine"
			},
			{
				id: "cable-crunch",
				name: "Cable Crunch",
				sets: 3,
				repsMin: 10,
				repsMax: 15,
				restSec: 60,
				increment: "cable"
			}
		]
	},
	{
		id: 4,
		title: "Push",
		short: "Push",
		focus: "hypertrophy",
		exercises: [
			{
				id: "incline-bb-press",
				name: "Incline Barbell Press",
				sets: 4,
				repsMin: 10,
				repsMax: 12,
				restSec: 90,
				increment: "barbell"
			},
			{
				id: "seated-db-press",
				name: "Seated Dumbbell Press",
				sets: 4,
				repsMin: 10,
				repsMax: 12,
				restSec: 90,
				increment: "dumbbell"
			},
			{
				id: "cable-fly",
				name: "High-to-Low Cable Fly",
				sets: 3,
				repsMin: 15,
				repsMax: 15,
				restSec: 60,
				increment: "cable"
			},
			{
				id: "cable-lateral-raise",
				name: "Cable Lateral Raise",
				sets: 4,
				repsMin: 15,
				repsMax: 20,
				restSec: 45,
				increment: "cable"
			},
			{
				id: "reverse-pec-deck",
				name: "Reverse Pec Deck",
				sets: 3,
				repsMin: 15,
				repsMax: 15,
				restSec: 60,
				increment: "machine"
			},
			{
				id: "skull-crushers",
				name: "Skull Crushers",
				sets: 3,
				repsMin: 12,
				repsMax: 12,
				restSec: 75,
				increment: "barbell"
			}
		]
	},
	{
		id: 5,
		title: "Pull",
		short: "Pull",
		focus: "strength",
		exercises: [
			{
				id: "conventional-deadlift",
				name: "Conventional Deadlift",
				sets: 4,
				repsMin: 5,
				repsMax: 5,
				restSec: 210,
				increment: "barbell"
			},
			{
				id: "pendlay-row",
				name: "Pendlay Row",
				sets: 4,
				repsMin: 5,
				repsMax: 5,
				restSec: 180,
				increment: "barbell"
			},
			{
				id: "weighted-pull-ups",
				name: "Weighted Pull-Ups",
				sets: 4,
				repsMin: 5,
				repsMax: 5,
				restSec: 180,
				increment: "bodyweight",
				bodyweight: true
			},
			{
				id: "t-bar-row",
				name: "T-Bar Row",
				sets: 3,
				repsMin: 6,
				repsMax: 8,
				restSec: 150,
				increment: "barbell"
			},
			{
				id: "hammer-curls",
				name: "Hammer Curls",
				sets: 3,
				repsMin: 6,
				repsMax: 8,
				restSec: 75,
				increment: "dumbbell"
			}
		]
	},
	{
		id: 6,
		title: "Legs",
		short: "Legs",
		focus: "hypertrophy",
		exercises: [
			{
				id: "high-bar-squat",
				name: "High-Bar Squat",
				sets: 4,
				repsMin: 12,
				repsMax: 12,
				restSec: 120,
				increment: "barbell"
			},
			{
				id: "leg-extension",
				name: "Leg Extension",
				sets: 4,
				repsMin: 15,
				repsMax: 20,
				restSec: 60,
				increment: "machine"
			},
			{
				id: "lying-leg-curl",
				name: "Lying Leg Curl",
				sets: 4,
				repsMin: 15,
				repsMax: 20,
				restSec: 60,
				increment: "machine"
			},
			{
				id: "seated-calf-raise",
				name: "Seated Calf Raise",
				sets: 4,
				repsMin: 15,
				repsMax: 20,
				restSec: 45,
				increment: "machine"
			},
			{
				id: "hanging-knee-raise",
				name: "Hanging Knee Raise",
				sets: 3,
				repsMin: 8,
				repsMax: 15,
				restSec: 60,
				increment: "bodyweight",
				bodyweight: true
			}
		]
	},
	{
		id: 7,
		title: "Rest",
		short: "Rest",
		focus: "rest",
		exercises: []
	}
];
function getDay(id) {
	return PROGRAM.find((d) => d.id === id) ?? PROGRAM[0];
}
function getExercise(id) {
	for (const day of PROGRAM) {
		const ex = day.exercises.find((e) => e.id === id);
		if (ex) return ex;
	}
}
function allExercises() {
	const map = /* @__PURE__ */ new Map();
	for (const day of PROGRAM) for (const ex of day.exercises) {
		const prev = map.get(ex.id);
		if (prev) prev.days.push(day.id);
		else map.set(ex.id, {
			exercise: ex,
			days: [day.id]
		});
	}
	return [...map.values()];
}
function formatPrescription(sets, min, max) {
	if (min === max) return `${sets} × ${min}`;
	return `${sets} × ${min}–${max}`;
}
function todayProgramDay(now = /* @__PURE__ */ new Date()) {
	const dow = now.getDay();
	return dow === 0 ? 7 : dow;
}
function focusLabel(focus) {
	if (focus === "strength") return "Strength";
	if (focus === "hypertrophy") return "Hypertrophy";
	return "Recovery";
}
var KG_PER_LB = .45359237;
var INCREMENT = {
	barbell: {
		kg: 2.5,
		lb: 5
	},
	dumbbell: {
		kg: 2,
		lb: 5
	},
	cable: {
		kg: 1.25,
		lb: 2.5
	},
	machine: {
		kg: 2.5,
		lb: 5
	},
	bodyweight: {
		kg: 2.5,
		lb: 5
	}
};
function kgToDisplay(kg, unit) {
	if (unit === "kg") return roundTo(kg, .25);
	return roundTo(kg / KG_PER_LB, .5);
}
function displayToKg(value, unit) {
	if (unit === "kg") return roundTo(value, .25);
	return value * KG_PER_LB;
}
function formatNumber(n) {
	if (Number.isInteger(n)) return String(n);
	return String(Math.round(n * 100) / 100).replace(/\.0$/, "");
}
function formatWeight(kg, unit, bodyweight) {
	if (bodyweight && kg <= 0) return "BW";
	const n = formatNumber(kgToDisplay(kg, unit));
	if (bodyweight) return `+${n}`;
	return n;
}
function formatWeightUnit(kg, unit, bodyweight) {
	const core = formatWeight(kg, unit, bodyweight);
	if (core === "BW") return "BW";
	return `${core} ${unit}`;
}
function stepWeight(currentKg, dir, unit, kind) {
	const inc = INCREMENT[kind];
	if (unit === "kg") return Math.max(0, roundTo(currentKg + dir * inc.kg, .25));
	return displayToKg(Math.max(0, kgToDisplay(currentKg, "lb") + dir * inc.lb), "lb");
}
function addIncrement(kg, unit, kind) {
	return stepWeight(kg, 1, unit, kind);
}
function hitTopRange(log, ex) {
	if (!log) return false;
	const working = log.sets.slice(0, ex.sets);
	if (working.length < ex.sets) return false;
	return working.every((s) => s.done && s.reps >= ex.repsMax);
}
function workingWeightKg(log) {
	if (!log) return 0;
	const done = log.sets.filter((s) => s.done);
	if (!done.length) return 0;
	const counts = /* @__PURE__ */ new Map();
	for (const s of done) {
		const key = Math.round(s.weightKg * 100) / 100;
		counts.set(key, (counts.get(key) ?? 0) + 1);
	}
	return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0]?.[0] ?? 0;
}
function lastLogsForExercise(sessions, exerciseId) {
	const out = [];
	for (let i = sessions.length - 1; i >= 0; i--) {
		const session = sessions[i];
		if (!session.finishedAt) continue;
		const log = session.exercises.find((e) => e.exerciseId === exerciseId);
		if (log && log.sets.some((s) => s.done)) out.push({
			session,
			log
		});
	}
	return out;
}
function lastLogForDay(sessions, exerciseId, dayId) {
	return lastLogsForExercise(sessions, exerciseId).find((x) => x.session.dayId === dayId);
}
function lastLogAny(sessions, exerciseId) {
	return lastLogsForExercise(sessions, exerciseId)[0];
}
function recommendWeight(sessions, exerciseId, dayId, unit) {
	const ex = getExercise(exerciseId) ?? getDay(dayId).exercises.find((e) => e.id === exerciseId);
	const sameDay = lastLogForDay(sessions, exerciseId, dayId);
	const any = lastLogAny(sessions, exerciseId);
	const picked = sameDay ?? any;
	if (!picked || !ex) return {
		weightKg: 0,
		increase: false,
		fromKg: 0,
		source: "none"
	};
	const fromKg = workingWeightKg(picked.log);
	const increase = hitTopRange(picked.log, ex);
	return {
		weightKg: increase ? addIncrement(fromKg, unit, ex.increment) : fromKg,
		increase,
		fromKg,
		source: sameDay ? "day" : "any",
		session: picked.session,
		log: picked.log
	};
}
function sessionVolumeKg(session) {
	let total = 0;
	for (const log of session.exercises) for (const set of log.sets) if (set.done) total += set.weightKg * set.reps;
	return total;
}
function sessionSetCount(session) {
	let done = 0;
	let total = 0;
	for (const log of session.exercises) for (const set of log.sets) {
		total += 1;
		if (set.done) done += 1;
	}
	return {
		done,
		total
	};
}
function isSessionComplete(session) {
	const { done, total } = sessionSetCount(session);
	return total > 0 && done === total;
}
function bestSet(sessions, exerciseId) {
	let best = null;
	for (const session of sessions) {
		if (!session.finishedAt) continue;
		const log = session.exercises.find((e) => e.exerciseId === exerciseId);
		if (!log) continue;
		for (const set of log.sets) {
			if (!set.done) continue;
			if (set.weightKg * (1 + set.reps / 30) > (best ? best.weightKg * (1 + best.reps / 30) : -1)) best = {
				weightKg: set.weightKg,
				reps: set.reps,
				at: session.finishedAt
			};
		}
	}
	return best;
}
function remainingMs(rest, now = Date.now()) {
	if (rest.paused) return rest.pausedLeftMs;
	return Math.max(0, rest.endsAt - now);
}
var useForgeStore = create()(persist((set, get) => ({
	settings: {
		unit: "kg",
		sound: true
	},
	sessions: [],
	current: null,
	rest: null,
	introDismissed: false,
	hydrated: false,
	setHydrated: (v) => set({ hydrated: v }),
	setUnit: (unit) => set((s) => ({ settings: {
		...s.settings,
		unit
	} })),
	setSound: (sound) => set((s) => ({ settings: {
		...s.settings,
		sound
	} })),
	dismissIntro: () => set({ introDismissed: true }),
	startSession: (dayId) => {
		const day = getDay(dayId);
		if (day.focus === "rest") return;
		const { sessions, settings } = get();
		const exercises = day.exercises.map((ex) => {
			const rec = recommendWeight(sessions, ex.id, dayId, settings.unit);
			return {
				exerciseId: ex.id,
				sets: Array.from({ length: ex.sets }, () => ({
					weightKg: rec.weightKg,
					reps: ex.repsMin,
					done: false
				}))
			};
		});
		set({
			current: {
				id: uid(),
				dayId,
				startedAt: Date.now(),
				focusExerciseId: day.exercises[0]?.id ?? "",
				exercises
			},
			rest: null
		});
	},
	discardCurrent: () => set({
		current: null,
		rest: null
	}),
	finishSession: () => {
		const { current, sessions } = get();
		if (!current) return;
		const finished = {
			...current,
			finishedAt: Date.now()
		};
		set({
			current: null,
			rest: null,
			sessions: [...sessions, finished]
		});
	},
	focusExercise: (exerciseId) => set((s) => s.current ? { current: {
		...s.current,
		focusExerciseId: exerciseId
	} } : {}),
	updateSet: (exerciseId, setIndex, patch) => set((s) => {
		if (!s.current) return {};
		return { current: {
			...s.current,
			exercises: s.current.exercises.map((log) => {
				if (log.exerciseId !== exerciseId) return log;
				return {
					...log,
					sets: log.sets.map((setRow, i) => i === setIndex ? {
						...setRow,
						...patch
					} : setRow)
				};
			})
		} };
	}),
	toggleSetDone: (exerciseId, setIndex) => {
		const { current } = get();
		if (!current) return;
		const log = current.exercises.find((e) => e.exerciseId === exerciseId);
		if (!log) return;
		const row = log.sets[setIndex];
		if (!row) return;
		const nextDone = !row.done;
		get().updateSet(exerciseId, setIndex, { done: nextDone });
		if (nextDone) {
			const day = getDay(current.dayId);
			const ex = day.exercises.find((e) => e.id === exerciseId);
			const isLastExercise = day.exercises.at(-1)?.id === exerciseId;
			const isLastSet = setIndex === log.sets.length - 1;
			if (ex && !(isLastExercise && isLastSet)) get().startRest(exerciseId, setIndex, ex.restSec);
			const nextIncomplete = log.sets.findIndex((s, i) => i > setIndex && !s.done);
			if (nextIncomplete >= 0) {
				const justLogged = {
					...row,
					done: true
				};
				get().updateSet(exerciseId, nextIncomplete, { weightKg: justLogged.weightKg });
			} else if (isLastSet) {
				const idx = day.exercises.findIndex((e) => e.id === exerciseId);
				const nextEx = day.exercises[idx + 1];
				if (nextEx) get().focusExercise(nextEx.id);
			}
		}
	},
	startRest: (exerciseId, setIndex, seconds) => {
		const durationMs = seconds * 1e3;
		set({ rest: {
			exerciseId,
			setIndex,
			durationMs,
			endsAt: Date.now() + durationMs,
			paused: false,
			pausedLeftMs: durationMs,
			overlay: true,
			finished: false
		} });
	},
	skipRest: () => set({ rest: null }),
	pauseRest: () => set((s) => {
		if (!s.rest || s.rest.paused || s.rest.finished) return {};
		return { rest: {
			...s.rest,
			paused: true,
			pausedLeftMs: remainingMs(s.rest)
		} };
	}),
	resumeRest: () => set((s) => {
		if (!s.rest || !s.rest.paused) return {};
		return { rest: {
			...s.rest,
			paused: false,
			endsAt: Date.now() + s.rest.pausedLeftMs
		} };
	}),
	addRest: (ms) => set((s) => {
		if (!s.rest || s.rest.finished) return {};
		if (s.rest.paused) return { rest: {
			...s.rest,
			pausedLeftMs: s.rest.pausedLeftMs + ms,
			durationMs: s.rest.durationMs + ms
		} };
		return { rest: {
			...s.rest,
			endsAt: s.rest.endsAt + ms,
			durationMs: s.rest.durationMs + ms
		} };
	}),
	setRestOverlay: (open) => set((s) => s.rest ? { rest: {
		...s.rest,
		overlay: open
	} } : {}),
	markRestFinished: () => set((s) => s.rest ? { rest: {
		...s.rest,
		finished: true,
		overlay: true
	} } : {}),
	clearRest: () => set({ rest: null })
}), {
	name: "forge-powerbuilding",
	partialize: (s) => ({
		settings: s.settings,
		sessions: s.sessions,
		current: s.current,
		rest: s.rest,
		introDismissed: s.introDismissed
	}),
	onRehydrateStorage: () => (state) => {
		state?.setHydrated(true);
		if (state?.rest) {
			if (remainingMs(state.rest) <= 0 && !state.rest.finished) state.markRestFinished();
		}
	}
}));
function restRemaining(rest, now = Date.now()) {
	if (!rest) return 0;
	return remainingMs(rest, now);
}
function useNow(active = true, interval = 200) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const id = window.setInterval(() => setNow(Date.now()), interval);
		return () => window.clearInterval(id);
	}, [active, interval]);
	return now;
}
function RestOverlay() {
	const rest = useForgeStore((s) => s.rest);
	const sound = useForgeStore((s) => s.settings.sound);
	const current = useForgeStore((s) => s.current);
	const skipRest = useForgeStore((s) => s.skipRest);
	const pauseRest = useForgeStore((s) => s.pauseRest);
	const resumeRest = useForgeStore((s) => s.resumeRest);
	const addRest = useForgeStore((s) => s.addRest);
	const setRestOverlay = useForgeStore((s) => s.setRestOverlay);
	const markRestFinished = useForgeStore((s) => s.markRestFinished);
	const clearRest = useForgeStore((s) => s.clearRest);
	const remaining = restRemaining(rest, useNow(!!rest, 100));
	const chimed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		chimed.current = false;
	}, [rest?.endsAt, rest?.durationMs]);
	(0, import_react.useEffect)(() => {
		if (!rest || rest.finished || rest.paused) return;
		if (remaining > 0) return;
		markRestFinished();
		if (sound && !chimed.current) {
			chimed.current = true;
			chimeRestDone();
		}
	}, [
		remaining,
		rest,
		markRestFinished,
		sound
	]);
	if (!rest) return null;
	const day = current ? getDay(current.dayId) : null;
	const ex = getExercise(rest.exerciseId);
	const setLabel = ex ? `Set ${rest.setIndex + 1} / ${ex.sets}` : void 0;
	const nextSet = rest.setIndex + 2;
	const finished = rest.finished || remaining <= 0;
	if (!rest.overlay) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setRestOverlay(true),
		className: cn("fixed right-4 bottom-20 z-40 flex items-center gap-3 rounded-full border border-border bg-elevated px-4 py-2.5 shadow-[var(--shadow-panel)] md:bottom-6", finished && "border-success/40"),
		children: [finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg tabular-nums leading-none text-success",
			children: "GO"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchMini, {
			remaining,
			duration: rest.durationMs
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted",
			children: finished ? "Ready" : "Rest"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-bg/95",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => finished ? clearRest() : setRestOverlay(false),
					className: "inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:text-fg",
					"aria-label": "Minimize timer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm tracking-[0.2em] text-muted uppercase",
					children: day ? `${day.title} · ${day.focus}` : "Rest"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-11" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-8 px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn(finished && "go-pop"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchFace, {
						remainingMs: remaining,
						durationMs: rest.durationMs,
						label: finished ? "Ready" : rest.paused ? "Paused" : "Rest",
						sublabel: setLabel,
						finished
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl uppercase tracking-wide text-fg",
						children: ex?.name ?? "Rest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: finished ? nextSet && ex && nextSet <= ex.sets ? `Next: set ${nextSet} of ${ex.sets}` : "Move to the next lift" : `${Math.round(rest.durationMs / 1e3)}s prescribed`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full max-w-sm items-center justify-center gap-3",
					children: finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "h-12 min-w-44",
						onClick: () => clearRest(),
						children: "Lift"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: () => addRest(3e4),
							className: "min-w-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "30s"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => rest.paused ? resumeRest() : pauseRest(),
							"aria-label": rest.paused ? "Resume" : "Pause",
							children: rest.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							onClick: () => skipRest(),
							className: "min-w-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-4" }), "Skip"]
						})
					] })
				})
			]
		})]
	});
}
function WatchMini({ remaining, duration }) {
	const p = duration <= 0 ? 0 : remaining / duration;
	const r = 8;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "22",
			height: "22",
			viewBox: "0 0 22 22",
			className: "shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "11",
				cy: "11",
				r,
				fill: "none",
				stroke: "var(--color-border)",
				strokeWidth: "2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "11",
				cy: "11",
				r,
				fill: "none",
				stroke: "var(--color-accent)",
				strokeWidth: "2",
				strokeDasharray: c,
				strokeDashoffset: c * (1 - p),
				transform: "rotate(-90 11 11)"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-lg tabular-nums",
			children: [
				Math.floor(remaining / 1e3 / 60),
				":",
				String(Math.floor(remaining / 1e3 % 60)).padStart(2, "0")
			]
		})]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-panel)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-sm p-1 text-muted transition-opacity duration-150 hover:text-fg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-6", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium uppercase tracking-wide", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border bg-elevated transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=checked]:border-accent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-fg shadow-sm transition-transform duration-150 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-accent-fg") })
	});
}
function SettingsDialog({ open, onOpenChange }) {
	const unit = useForgeStore((s) => s.settings.unit);
	const sound = useForgeStore((s) => s.settings.sound);
	const setUnit = useForgeStore((s) => s.setUnit);
	const setSound = useForgeStore((s) => s.setSound);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Units, rest chime, and how the log behaves." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted uppercase",
					children: "Units"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: ["kg", "lb"].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setUnit(u),
						className: cn("h-11 rounded-sm border text-sm font-medium transition-colors duration-150", unit === u ? "border-accent bg-accent text-accent-fg" : "border-border bg-elevated text-fg hover:bg-surface"),
						children: u.toUpperCase()
					}, u))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-fg",
						children: "Rest chime"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: "Three beeps when the watch hits zero"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: sound,
						onCheckedChange: setSound
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-subtle",
					children: "Double progression: when every set hits the top of the rep range, Forge flags an increase for next session and pre-loads the new weight."
				})
			]
		})] })
	});
}
function Toaster$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "dark",
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast bg-elevated text-fg border-border shadow-[var(--shadow-panel)]",
			description: "text-muted",
			actionButton: "bg-accent text-accent-fg",
			cancelButton: "bg-surface text-fg"
		} },
		...props
	});
}
var TooltipProvider = Provider;
function AppShell({ children }) {
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh flex-col bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-14 max-w-3xl items-center justify-between px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "font-display text-xl tracking-[0.22em] text-fg uppercase",
								children: "Forge"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "hidden items-center gap-1 md:flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
										to: "/",
										active: pathname === "/",
										children: "Today"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
										to: "/program",
										active: pathname === "/program",
										children: "Program"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
										to: "/history",
										active: pathname.startsWith("/history"),
										children: "History"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSettingsOpen(true),
								className: "inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:text-fg",
								"aria-label": "Settings",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-6 md:pb-10",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
								to: "/",
								active: pathname === "/",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "size-5" }),
								label: "Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
								to: "/program",
								active: pathname === "/program",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramIcon, {}),
								label: "Program"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabLink, {
								to: "/history",
								active: pathname.startsWith("/history"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5" }),
								label: "History"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {
					open: settingsOpen,
					onOpenChange: setSettingsOpen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestOverlay, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
			]
		})
	});
}
function NavLink({ to, active, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("rounded-sm px-3 py-2 text-sm transition-colors duration-150", active ? "text-fg" : "text-muted hover:text-fg"),
		children
	});
}
function TabLink({ to, active, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-[0.7rem] tracking-wide uppercase", active ? "text-fg" : "text-subtle"),
		children: [icon, label]
	});
}
function ProgramIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3.5",
				y: "4.5",
				width: "5",
				height: "15",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9.5",
				y: "4.5",
				width: "5",
				height: "15",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "15.5",
				y: "4.5",
				width: "5",
				height: "15",
				rx: "1"
			})
		]
	});
}
function HydrateGate({ children }) {
	const hydrated = useForgeStore((s) => s.hydrated);
	(0, import_react.useEffect)(() => {
		if (useForgeStore.persist.hasHydrated()) useForgeStore.setState({ hydrated: true });
		return useForgeStore.persist.onFinishHydration(() => {
			useForgeStore.setState({ hydrated: true });
		});
	}, []);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 rounded-sm bg-elevated" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-xl bg-surface" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1.5",
				children: Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 rounded-md bg-surface" }, i))
			})
		]
	});
	return children;
}
//#endregion
export { sessionVolumeKg as A, kgToDisplay as C, recommendWeight as D, lastLogsForExercise as E, useNow as F, workingWeightKg as I, stepWeight as M, todayProgramDay as N, relativeDay as O, useForgeStore as P, isSessionComplete as S, lastLogForDay as T, formatWeight as _, DialogDescription as a, getExercise as b, HydrateGate as c, allExercises as d, bestSet as f, formatPrescription as g, formatDuration as h, DialogContent as i, startOfWeek as j, sessionSetCount as k, PROGRAM as l, focusLabel as m, Button as n, DialogHeader as o, cn as p, Dialog as r, DialogTitle as s, AppShell as t, addIncrement as u, formatWeightUnit as v, lastLogAny as w, hitTopRange as x, getDay as y };

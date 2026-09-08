import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as Flag, g as Check, h as ChevronDown, r as Timer, s as Plus, u as Minus, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { D as recommendWeight, F as useNow, I as workingWeightKg, M as stepWeight, O as relativeDay, P as useForgeStore, S as isSessionComplete, T as lastLogForDay, _ as formatWeight, a as DialogDescription, c as HydrateGate, g as formatPrescription, h as formatDuration, i as DialogContent, k as sessionSetCount, m as focusLabel, n as Button, o as DialogHeader, p as cn, r as Dialog, s as DialogTitle, t as AppShell, u as addIncrement, v as formatWeightUnit, w as lastLogAny, x as hitTopRange, y as getDay } from "./hydrate-gate-CLX3QEzj.mjs";
import { n as Route } from "./router-DH3GfSle.mjs";
import { n as OverloadBanner } from "./overload-banner-B25rRIdh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/train._dayId-DdOVgAwI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Stepper({ valueLabel, onStep, disabled, ariaLabel }) {
	const hold = (0, import_react.useRef)(null);
	const delay = (0, import_react.useRef)(null);
	function clear() {
		if (hold.current) window.clearInterval(hold.current);
		if (delay.current) window.clearTimeout(delay.current);
		hold.current = null;
		delay.current = null;
	}
	function start(dir) {
		if (disabled) return;
		onStep(dir);
		delay.current = window.setTimeout(() => {
			hold.current = window.setInterval(() => onStep(dir), 90);
		}, 380);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled,
				"aria-label": `Decrease ${ariaLabel}`,
				onPointerDown: () => start(-1),
				onPointerUp: clear,
				onPointerLeave: clear,
				onPointerCancel: clear,
				className: cn("inline-flex size-11 items-center justify-center rounded-sm border border-border bg-elevated text-fg transition-[background-color,transform] duration-150 active:scale-[0.96] disabled:opacity-40"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-16 px-1 text-center font-mono text-base font-medium tabular-nums text-fg",
				"aria-label": ariaLabel,
				children: valueLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled,
				"aria-label": `Increase ${ariaLabel}`,
				onPointerDown: () => start(1),
				onPointerUp: clear,
				onPointerLeave: clear,
				onPointerCancel: clear,
				className: cn("inline-flex size-11 items-center justify-center rounded-sm border border-border bg-elevated text-fg transition-[background-color,transform] duration-150 active:scale-[0.96] disabled:opacity-40"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
			})
		]
	});
}
function ExerciseBlock({ exercise, dayId, open, onToggle, index }) {
	const current = useForgeStore((s) => s.current);
	const sessions = useForgeStore((s) => s.sessions);
	const unit = useForgeStore((s) => s.settings.unit);
	const updateSet = useForgeStore((s) => s.updateSet);
	const toggleSetDone = useForgeStore((s) => s.toggleSetDone);
	const startRest = useForgeStore((s) => s.startRest);
	const log = current?.exercises.find((e) => e.exerciseId === exercise.id);
	const rec = recommendWeight(sessions, exercise.id, dayId, unit);
	const doneCount = log?.sets.filter((s) => s.done).length ?? 0;
	const allDone = doneCount === exercise.sets;
	const nailedIt = hitTopRange(log, exercise);
	const nextKg = nailedIt ? addIncrement(workingWeightKg(log), unit, exercise.increment) : rec.increase ? rec.weightKg : null;
	const sameDay = lastLogForDay(sessions, exercise.id, dayId);
	const any = lastLogAny(sessions, exercise.id);
	const last = sameDay ?? any;
	const lastOther = sameDay && any && any.session.id !== sameDay.session.id ? any : !sameDay && any ? any : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("overflow-hidden rounded-xl border border-border bg-surface transition-[border-color] duration-200", open && "border-fg/20", nailedIt && "border-success/40"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			className: "flex w-full items-start gap-3 px-4 py-4 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tabular-nums text-subtle pt-1",
					children: String(index + 1).padStart(2, "0")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg uppercase tracking-wide text-fg",
							children: exercise.name
						}), allDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex size-5 items-center justify-center rounded-full bg-success text-success-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 24 24",
								className: "size-3",
								fill: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M5 12.5 9.5 17 19 7.5",
									stroke: "currentColor",
									strokeWidth: "2.4",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrescription(exercise.sets, exercise.repsMin, exercise.repsMax) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-3" }), Math.round(exercise.restSec / 60) >= 1 && exercise.restSec % 60 === 0 ? `${exercise.restSec / 60}m rest` : `${exercise.restSec}s rest`]
							}),
							exercise.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exercise.note })] }) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 pt-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs tabular-nums text-muted",
						children: [
							doneCount,
							"/",
							exercise.sets
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 text-subtle transition-transform duration-200", open && "rotate-180") })]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 border-t border-border px-4 pt-4 pb-4",
			children: [
				last?.log ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md bg-elevated px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xs tracking-[0.18em] text-muted uppercase",
								children: "Last time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-subtle",
								children: [
									"Day ",
									last.session.dayId,
									" · ",
									relativeDay(last.session.finishedAt ?? last.session.startedAt)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: last.log.sets.filter((s) => s.done).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-sm bg-bg px-2 py-1 font-mono text-xs tabular-nums text-fg",
								children: [
									formatWeight(s.weightKg, unit, exercise.bodyweight),
									" × ",
									s.reps
								]
							}, i))
						}),
						rec.increase && rec.log === last.log ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 flex items-center gap-2 text-sm text-success",
							children: [
								"Hit the top of the range. Load ",
								formatWeightUnit(rec.weightKg, unit, exercise.bodyweight),
								"."
							]
						}) : null,
						lastOther && lastOther.log ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-subtle",
							children: [
								"Also Day ",
								lastOther.session.dayId,
								" · ",
								relativeDay(lastOther.session.finishedAt ?? lastOther.session.startedAt),
								" · ",
								lastOther.log.sets.filter((s) => s.done).map((s) => `${formatWeight(s.weightKg, unit, exercise.bodyweight)}×${s.reps}`).join("  ")
							]
						}) : null
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No history yet. First working sets set the baseline."
				}),
				nailedIt && nextKg != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverloadBanner, {
					unit,
					nextKg,
					bodyweight: exercise.bodyweight
				}) : rec.increase && !allDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-success",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-success" }),
						"Suggested load ",
						formatWeightUnit(rec.weightKg, unit, exercise.bodyweight)
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: log?.sets.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("flex flex-wrap items-center gap-2 rounded-md border border-border bg-bg px-2 py-2", row.done && "border-success/30"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-10 font-mono text-xs tabular-nums text-subtle",
								children: ["S", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
								ariaLabel: "weight",
								valueLabel: formatWeight(row.weightKg, unit, exercise.bodyweight),
								disabled: row.done,
								onStep: (dir) => updateSet(exercise.id, i, { weightKg: stepWeight(row.weightKg, dir, unit, exercise.increment) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
								ariaLabel: "reps",
								valueLabel: String(row.reps),
								disabled: row.done,
								onStep: (dir) => updateSet(exercise.id, i, { reps: Math.max(0, row.reps + dir) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: row.done ? "success" : "secondary",
								size: "icon",
								className: "ml-auto",
								"aria-label": row.done ? "Unlog set" : "Log set",
								onClick: () => toggleSetDone(exercise.id, i),
								children: row.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									className: "size-4",
									fill: "none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M5 12.5 9.5 17 19 7.5",
										stroke: "currentColor",
										strokeWidth: "2.4",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xs",
									children: "LOG"
								})
							})
						]
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => startRest(exercise.id, Math.max(0, doneCount - 1), exercise.restSec),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4" }), "Rest timer"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/history/$exerciseId",
						params: { exerciseId: exercise.id },
						className: "text-xs text-muted underline-offset-4 hover:text-fg hover:underline",
						children: "History"
					})]
				})
			]
		}) : null]
	});
}
function TrainPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainBody, {}) }) });
}
function TrainBody() {
	const { dayId: raw } = Route.useParams();
	const dayId = Number(raw);
	const day = getDay(dayId);
	const navigate = useNavigate();
	const current = useForgeStore((s) => s.current);
	const startSession = useForgeStore((s) => s.startSession);
	const finishSession = useForgeStore((s) => s.finishSession);
	const discardCurrent = useForgeStore((s) => s.discardCurrent);
	const focusExercise = useForgeStore((s) => s.focusExercise);
	const [confirmFinish, setConfirmFinish] = (0, import_react.useState)(false);
	const [confirmDiscard, setConfirmDiscard] = (0, import_react.useState)(false);
	const now = useNow(!!current);
	if (day.focus === "rest" || Number.isNaN(dayId) || dayId < 1 || dayId > 7) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Nothing to train on this day."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Back"
			})
		})]
	});
	const live = current?.dayId === dayId ? current : null;
	const elapsed = live ? now - live.startedAt : 0;
	const counts = live ? sessionSetCount(live) : {
		done: 0,
		total: day.exercises.reduce((n, e) => n + e.sets, 0)
	};
	const complete = live ? isSessionComplete(live) : false;
	function ensureLive() {
		if (live) return;
		if (current && current.dayId !== dayId) {
			const { done } = sessionSetCount(current);
			if (done > 0) return;
			discardCurrent();
		}
		startSession(dayId);
	}
	function onFinish() {
		finishSession();
		navigate({ to: "/history" });
	}
	if (!live) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-2 text-sm text-muted hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Today"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs tabular-nums text-subtle",
					children: ["Day ", day.id]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl uppercase tracking-wide",
					children: day.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: focusLabel(day.focus)
				})
			] }),
			current && current.dayId !== dayId && sessionSetCount(current).done > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-fg",
					children: [
						"A session is already open on Day ",
						current.dayId,
						"."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/train/$dayId",
							params: { dayId: String(current.dayId) },
							children: "Resume it"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => {
							discardCurrent();
							startSession(dayId);
						},
						children: ["Discard and start Day ", day.id]
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "h-12 w-full",
				onClick: ensureLive,
				children: "Start session"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2 text-sm text-muted",
				children: day.exercises.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					i + 1,
					". ",
					ex.name
				] }, ex.id))
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Back"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-sm tracking-[0.18em] text-muted uppercase",
							children: [
								"Day ",
								day.id,
								" · ",
								day.title
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm tabular-nums text-fg",
							children: formatDuration(elapsed)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConfirmDiscard(true),
						className: "text-xs text-subtle hover:text-muted",
						children: "Reset"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-200 ease-out",
					style: { width: `${counts.total ? counts.done / counts.total * 100 : 0}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center font-mono text-xs tabular-nums text-muted",
				children: [
					counts.done,
					" / ",
					counts.total,
					" sets"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: day.exercises.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseBlock, {
					exercise: ex,
					dayId: day.id,
					index: i,
					open: live.focusExerciseId === ex.id,
					onToggle: () => focusExercise(live.focusExerciseId === ex.id ? "" : ex.id)
				}, ex.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-20 z-20 md:bottom-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-12 w-full shadow-[var(--shadow-panel)]",
					variant: complete ? "success" : "secondary",
					onClick: () => complete ? onFinish() : setConfirmFinish(true),
					children: complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Finish session"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }), "End session"] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: confirmFinish,
				onOpenChange: setConfirmFinish,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "End session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					counts.done,
					" of ",
					counts.total,
					" sets are logged. Unfinished sets stay out of history."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "flex-1",
						onClick: () => setConfirmFinish(false),
						children: "Keep lifting"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						onClick: onFinish,
						children: "Save & finish"
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: confirmDiscard,
				onOpenChange: setConfirmDiscard,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Reset session" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Clears today’s in-progress sets. Finished sessions in history are untouched." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "flex-1",
						onClick: () => setConfirmDiscard(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						className: "flex-1",
						onClick: () => {
							discardCurrent();
							setConfirmDiscard(false);
						},
						children: "Reset"
					})]
				})] })
			})
		]
	});
}
//#endregion
export { TrainPage as component };

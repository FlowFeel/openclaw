import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import "./string-coerce-runtime-CLK2YdzD.js";
//#region extensions/browser/src/browser-tool-binding.ts
/** Validate the plugin-owned run binding before any browser route is resolved. */
function parseBrowserTabToolBinding(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {
		ok: false,
		error: "browser tool binding must be an object"
	};
	const record = value;
	const target = record.target === "host" || record.target === "node" ? record.target : void 0;
	const node = normalizeOptionalString(record.node);
	const profile = normalizeOptionalString(record.profile);
	const targetId = normalizeOptionalString(record.targetId);
	if (record.kind !== "tab") return {
		ok: false,
		error: "browser tool binding kind must be \"tab\""
	};
	if (!Number.isSafeInteger(record.tabId) || Number(record.tabId) < 0) return {
		ok: false,
		error: "browser tool binding tabId must be a non-negative integer"
	};
	if (!target || !profile || !targetId || target === "node" && !node) return {
		ok: false,
		error: "browser tool binding requires target, profile, and targetId"
	};
	if (target === "host" && node) return {
		ok: false,
		error: "browser host binding cannot include node"
	};
	return {
		ok: true,
		binding: {
			kind: "tab",
			tabId: Number(record.tabId),
			target,
			...node ? { node } : {},
			profile,
			targetId
		}
	};
}
const TAB_BOUND_ACTIONS = /* @__PURE__ */ new Set([
	"act",
	"close",
	"console",
	"dialog",
	"download",
	"extract",
	"focus",
	"navigate",
	"pdf",
	"screenshot",
	"snapshot",
	"tabs",
	"upload",
	"waitfordownload"
]);
function bindTargetId(record, targetId) {
	const requestedTargetId = normalizeOptionalString(record.targetId);
	if (requestedTargetId && requestedTargetId !== targetId) throw new Error("browser action cannot override its run-bound tab target");
	const actions = Array.isArray(record.actions) ? record.actions.map((action) => action && typeof action === "object" && !Array.isArray(action) ? bindTargetId(action, targetId) : action) : record.actions;
	return {
		...record,
		targetId,
		...actions ? { actions } : {}
	};
}
/** Pin model-supplied browser arguments to the trusted tab route for this run. */
function applyBrowserTabToolBinding(input, binding) {
	const action = normalizeOptionalString(input.action);
	if (!action || !TAB_BOUND_ACTIONS.has(action)) throw new Error(`browser action ${JSON.stringify(action)} is unavailable in a tab-bound run`);
	const requestedTarget = normalizeOptionalString(input.target);
	const requestedNode = normalizeOptionalString(input.node);
	const requestedProfile = normalizeOptionalString(input.profile);
	if (requestedTarget && requestedTarget !== binding.target) throw new Error("browser action cannot override its run-bound target");
	if (requestedNode && requestedNode !== binding.node) throw new Error("browser action cannot override its run-bound node");
	if (requestedProfile && requestedProfile !== binding.profile) throw new Error("browser action cannot override its run-bound profile");
	const bound = bindTargetId(input, binding.targetId);
	const request = bound.request && typeof bound.request === "object" && !Array.isArray(bound.request) ? bindTargetId(bound.request, binding.targetId) : bound.request;
	return {
		...bound,
		target: binding.target,
		...binding.node ? { node: binding.node } : {},
		profile: binding.profile,
		...request ? { request } : {}
	};
}
//#endregion
//#region extensions/browser/src/browser-tool-description.ts
/** Build the Browser tool guidance shared by lazy registration and runtime execution. */
function describeBrowserTool(opts) {
	return [
		"Control the browser via OpenClaw's browser control server (status/start/stop/profiles/tabs/open/snapshot/screenshot/pdf print-to-PDF/download/console logs/dialog accept-dismiss/actions incl. act:evaluate to run JS in the page).",
		"Browser choice: omit profile to use the configured default (normally the isolated OpenClaw-managed `openclaw` browser).",
		"When existing logins/cookies matter, use action=profiles to inspect available profiles, then select the appropriate profile by name. Do not assume a profile name. Use only when the task requires an existing session and the user has authorized it.",
		"Use action=importprofile on macOS to copy cookies from an authorized Chrome-family system profile into a fresh managed profile; this may show a Keychain consent prompt.",
		"For Chrome MCP existing-session profiles, omit timeoutMs on act:type, hover, scrollIntoView, drag, select, and fill; that driver rejects per-call timeout overrides for those actions. act:evaluate supports timeoutMs.",
		"When a node-hosted browser proxy is available, the tool may auto-route to it. Pin a node with node=<id|name> or target=\"node\".",
		"When using refs from snapshot (e.g. e12), keep the same tab: prefer passing targetId from the snapshot response into subsequent actions (act/click/type/etc). For tab operations, targetId also accepts tabId handles (t1) and labels from action=tabs.",
		"For multi-step browser work, login checks, stale refs, duplicate tabs, or Google Meet flows, use the bundled browser-automation skill when it is available.",
		"For stable, self-resolving refs across calls, use snapshot with refs=\"aria\" (Playwright aria-ref ids). Default refs=\"role\" are role+name-based.",
		"Repeated compatible snapshots with stable document identity mark newly appeared ref-bearing elements with [new].",
		"navigate returns the loaded page's compact snapshot inline (efficient interactive tier; use action=snapshot for a full snapshot); do not call snapshot after navigate. Batch act results that report a cross-document navigation also include fresh page state; after a single act that triggers navigation, snapshot before using refs.",
		"Use snapshot+act for UI automation. Avoid act:wait by default; use only in exceptional cases when no reliable UI state exists.",
		"To read or answer questions from page text, prefer action=extract with query (optionally selector, ignoreSelectors, or schema) over snapshot: it answers in one call without loading page content into context.",
		"For file chooser uploads, pass the trigger ref with paths in the same upload call when available; use paths-only arming only when a later trigger is intentional. Use inputRef or element to set a file input directly.",
		`target selects browser location (sandbox|host|node). Default: ${opts.targetDefault}.`,
		opts.hostHint
	].join(" ");
}
//#endregion
export { applyBrowserTabToolBinding as n, parseBrowserTabToolBinding as r, describeBrowserTool as t };

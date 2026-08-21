import { a as optionalPositiveIntegerSchema, i as optionalNonNegativeIntegerSchema, o as optionalStringEnum, r as optionalFiniteNumberSchema, s as stringEnum } from "./typebox-H9BhzMVW.js";
import "./channel-actions-BcF0YtO7.js";
import { n as ACT_MAX_VIEWPORT_DIMENSION } from "./act-policy-9AEfR1NQ.js";
import { Type } from "typebox";
//#region extensions/browser/src/browser-tool.schema.ts
/**
* JSON schema for the Browser agent tool.
*
* The schema stays intentionally flat because provider function-tool validators
* reject several nested union shapes that TypeBox can otherwise emit.
*/
const BROWSER_ACT_KINDS = [
	"batch",
	"click",
	"clickCoords",
	"type",
	"press",
	"hover",
	"scrollIntoView",
	"drag",
	"select",
	"fill",
	"resize",
	"wait",
	"evaluate",
	"close"
];
const BROWSER_TOOL_ACTIONS = [
	"doctor",
	"status",
	"start",
	"stop",
	"profiles",
	"importprofile",
	"tabs",
	"open",
	"focus",
	"close",
	"snapshot",
	"extract",
	"screenshot",
	"navigate",
	"console",
	"pdf",
	"download",
	"waitfordownload",
	"upload",
	"dialog",
	"act"
];
const BROWSER_TARGETS = [
	"sandbox",
	"host",
	"node"
];
const BROWSER_SNAPSHOT_FORMATS = ["aria", "ai"];
const BROWSER_SNAPSHOT_MODES = ["efficient"];
const BROWSER_SNAPSHOT_REFS = ["role", "aria"];
const BROWSER_IMAGE_TYPES = ["png", "jpeg"];
const TAB_REFERENCE_DESCRIPTION = "Tab reference. Prefer suggestedTargetId, tabId, or label from tabs output; raw CDP targetId and unique raw prefixes remain supported for compatibility.";
const BrowserActSchema = Type.Object({
	kind: stringEnum(BROWSER_ACT_KINDS),
	targetId: Type.Optional(Type.String({ description: TAB_REFERENCE_DESCRIPTION })),
	ref: Type.Optional(Type.String()),
	actions: Type.Optional(Type.Array(Type.Object({}, { additionalProperties: true }))),
	stopOnError: Type.Optional(Type.Boolean()),
	doubleClick: Type.Optional(Type.Boolean()),
	button: Type.Optional(Type.String()),
	modifiers: Type.Optional(Type.Array(Type.String())),
	x: optionalFiniteNumberSchema(),
	y: optionalFiniteNumberSchema(),
	text: Type.Optional(Type.String()),
	submit: Type.Optional(Type.Boolean()),
	slowly: Type.Optional(Type.Boolean()),
	key: Type.Optional(Type.String()),
	delayMs: optionalNonNegativeIntegerSchema(),
	startRef: Type.Optional(Type.String()),
	endRef: Type.Optional(Type.String()),
	values: Type.Optional(Type.Array(Type.String())),
	fields: Type.Optional(Type.Array(Type.Object({}, { additionalProperties: true }))),
	width: optionalPositiveIntegerSchema({ maximum: ACT_MAX_VIEWPORT_DIMENSION }),
	height: optionalPositiveIntegerSchema({ maximum: ACT_MAX_VIEWPORT_DIMENSION }),
	timeMs: optionalNonNegativeIntegerSchema(),
	selector: Type.Optional(Type.String()),
	url: Type.Optional(Type.String()),
	loadState: Type.Optional(Type.String()),
	textGone: Type.Optional(Type.String()),
	timeoutMs: optionalPositiveIntegerSchema(),
	fn: Type.Optional(Type.String())
});
/** Provider-compatible Browser tool argument schema. */
const BrowserToolSchema = Type.Object({
	action: stringEnum(BROWSER_TOOL_ACTIONS),
	target: optionalStringEnum(BROWSER_TARGETS),
	node: Type.Optional(Type.String()),
	profile: Type.Optional(Type.String()),
	browser: Type.Optional(Type.String()),
	systemProfile: Type.Optional(Type.String()),
	into: Type.Optional(Type.String()),
	domains: Type.Optional(Type.Array(Type.String())),
	targetUrl: Type.Optional(Type.String()),
	url: Type.Optional(Type.String()),
	query: Type.Optional(Type.String()),
	ignoreSelectors: Type.Optional(Type.Array(Type.String())),
	schema: Type.Optional(Type.Object({}, { additionalProperties: true })),
	targetId: Type.Optional(Type.String({ description: TAB_REFERENCE_DESCRIPTION })),
	label: Type.Optional(Type.String()),
	limit: optionalPositiveIntegerSchema(),
	maxChars: optionalNonNegativeIntegerSchema(),
	mode: optionalStringEnum(BROWSER_SNAPSHOT_MODES),
	snapshotFormat: optionalStringEnum(BROWSER_SNAPSHOT_FORMATS),
	refs: optionalStringEnum(BROWSER_SNAPSHOT_REFS),
	interactive: Type.Optional(Type.Boolean()),
	compact: Type.Optional(Type.Boolean()),
	depth: optionalNonNegativeIntegerSchema(),
	selector: Type.Optional(Type.String()),
	frame: Type.Optional(Type.String()),
	labels: Type.Optional(Type.Boolean()),
	urls: Type.Optional(Type.Boolean()),
	fullPage: Type.Optional(Type.Boolean()),
	ref: Type.Optional(Type.String()),
	path: Type.Optional(Type.String()),
	element: Type.Optional(Type.String()),
	type: optionalStringEnum(BROWSER_IMAGE_TYPES),
	level: Type.Optional(Type.String()),
	paths: Type.Optional(Type.Array(Type.String())),
	inputRef: Type.Optional(Type.String()),
	timeoutMs: optionalPositiveIntegerSchema(),
	dialogId: Type.Optional(Type.String()),
	accept: Type.Optional(Type.Boolean()),
	promptText: Type.Optional(Type.String()),
	kind: Type.Optional(stringEnum(BROWSER_ACT_KINDS)),
	actions: Type.Optional(Type.Array(Type.Object({}, { additionalProperties: true }))),
	stopOnError: Type.Optional(Type.Boolean()),
	doubleClick: Type.Optional(Type.Boolean()),
	button: Type.Optional(Type.String()),
	modifiers: Type.Optional(Type.Array(Type.String())),
	x: optionalFiniteNumberSchema(),
	y: optionalFiniteNumberSchema(),
	text: Type.Optional(Type.String()),
	submit: Type.Optional(Type.Boolean()),
	slowly: Type.Optional(Type.Boolean()),
	key: Type.Optional(Type.String()),
	delayMs: optionalNonNegativeIntegerSchema(),
	startRef: Type.Optional(Type.String()),
	endRef: Type.Optional(Type.String()),
	values: Type.Optional(Type.Array(Type.String())),
	fields: Type.Optional(Type.Array(Type.Object({}, { additionalProperties: true }))),
	width: optionalPositiveIntegerSchema({ maximum: ACT_MAX_VIEWPORT_DIMENSION }),
	height: optionalPositiveIntegerSchema({ maximum: ACT_MAX_VIEWPORT_DIMENSION }),
	timeMs: optionalNonNegativeIntegerSchema(),
	textGone: Type.Optional(Type.String()),
	loadState: Type.Optional(Type.String()),
	fn: Type.Optional(Type.String()),
	request: Type.Optional(BrowserActSchema)
});
const BrowserSnapshotStatsSchema = Type.Object({
	lines: Type.Number(),
	chars: Type.Number(),
	refs: Type.Number(),
	interactive: Type.Number()
}, { additionalProperties: false });
const BrowserBatchAbortSchema = Type.Object({
	reason: stringEnum(["navigation", "closed"]),
	afterAction: Type.Number(),
	url: Type.String(),
	skipped: Type.Number()
}, { additionalProperties: false });
/** Common structured result fields returned across Browser tool actions. */
const BrowserToolOutputSchema = Type.Object({
	ok: Type.Optional(Type.Boolean()),
	targetId: Type.Optional(Type.String()),
	url: Type.Optional(Type.String()),
	format: Type.Optional(stringEnum(BROWSER_SNAPSHOT_FORMATS)),
	snapshot: Type.Optional(Type.String()),
	refs: Type.Optional(Type.Union([Type.Number(), Type.Record(Type.String(), Type.Unknown())])),
	stats: Type.Optional(BrowserSnapshotStatsSchema),
	truncated: Type.Optional(Type.Boolean()),
	chars: Type.Optional(Type.Number()),
	model: Type.Optional(Type.String()),
	json: Type.Optional(Type.Unknown()),
	newElements: Type.Optional(Type.Number()),
	tabs: Type.Optional(Type.Array(Type.Object({
		suggestedTargetId: Type.Optional(Type.String()),
		tabId: Type.Optional(Type.String()),
		label: Type.Optional(Type.String()),
		targetId: Type.Optional(Type.String()),
		title: Type.Optional(Type.String()),
		url: Type.Optional(Type.String()),
		type: Type.Optional(Type.String())
	}, { additionalProperties: true }))),
	tabCount: Type.Optional(Type.Number()),
	results: Type.Optional(Type.Array(Type.Object({
		ok: Type.Boolean(),
		error: Type.Optional(Type.String()),
		navigated: Type.Optional(Type.Literal(true)),
		url: Type.Optional(Type.String())
	}, { additionalProperties: false }))),
	aborted: Type.Optional(BrowserBatchAbortSchema),
	pageState: Type.Optional(Type.Object({}, {
		additionalProperties: true,
		description: "Inline snapshot details attached when the action changed the page document."
	})),
	enabled: Type.Optional(Type.Boolean()),
	running: Type.Optional(Type.Boolean()),
	profile: Type.Optional(Type.String()),
	driver: Type.Optional(Type.String()),
	transport: Type.Optional(Type.String()),
	pid: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
	cdpPort: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
	cdpUrl: Type.Optional(Type.Union([Type.String(), Type.Null()]))
}, { additionalProperties: true });
//#endregion
export { BrowserToolSchema as n, BrowserToolOutputSchema as t };

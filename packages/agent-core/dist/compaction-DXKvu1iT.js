import { t as resolveAgentReasoningOption } from "./reasoning-D-xemFxK.js";
import { resolveAgentCoreCompleteFn } from "./runtime-deps.js";
import { asAgentMessage, convertToLlm, createBranchSummaryMessage, createCompactionSummaryMessage, createCustomMessage } from "./harness/messages.js";
import { resolveClaudeFable5ModelIdentity } from "@openclaw/llm-core";
//#region packages/agent-core/src/harness/session/session.ts
const SESSION_HISTORY_PRELUDE = Symbol.for("openclaw.sessionHistoryPrelude");
function appendContextMessage(messages, entry) {
	if (entry.type === "message") messages.push(entry.message);
	else if (entry.type === "custom_message") messages.push(asAgentMessage(createCustomMessage(entry.customType, entry.content, entry.display, entry.details, entry.timestamp)));
	else if (entry.type === "branch_summary" && entry.summary) messages.push(asAgentMessage(createBranchSummaryMessage(entry.summary, entry.fromId, entry.timestamp)));
}
function appendResetKeptMessage(messages, entry) {
	if (entry.type === "message" && (entry.message.role === "user" || entry.message.role === "assistant")) {
		const message = { ...entry.message };
		Object.defineProperty(message, SESSION_HISTORY_PRELUDE, {
			configurable: true,
			enumerable: false,
			value: true
		});
		messages.push(message);
	}
}
/** Build model context from an ordered session branch and its latest state markers. */
function buildSessionContext(pathEntries) {
	let thinkingLevel = "off";
	let model = null;
	let boundary = null;
	for (const entry of pathEntries) if (entry.type === "thinking_level_change") thinkingLevel = entry.thinkingLevel;
	else if (entry.type === "model_change") model = {
		provider: entry.provider,
		modelId: entry.modelId
	};
	else if (entry.type === "message" && entry.message.role === "assistant") model = {
		provider: entry.message.provider,
		modelId: entry.message.model
	};
	else if (entry.type === "compaction" || entry.type === "reset") boundary = entry;
	const messages = [];
	if (boundary) {
		if (boundary.type === "compaction") messages.push(asAgentMessage(createCompactionSummaryMessage(boundary.summary, boundary.tokensBefore, boundary.timestamp)));
		const boundaryIdx = pathEntries.findIndex((entry) => entry.id === boundary.id);
		let foundFirstKept = false;
		for (const entry of pathEntries.slice(0, boundaryIdx)) {
			if (entry.id === boundary.firstKeptEntryId) foundFirstKept = true;
			if (foundFirstKept) if (boundary.type === "reset") appendResetKeptMessage(messages, entry);
			else appendContextMessage(messages, entry);
		}
		for (const entry of pathEntries.slice(boundaryIdx + 1)) appendContextMessage(messages, entry);
	} else for (const entry of pathEntries) appendContextMessage(messages, entry);
	return {
		messages,
		thinkingLevel,
		model
	};
}
//#endregion
//#region packages/normalization-core/src/result.ts
/** Create a successful {@link Result}. */
function ok(value) {
	return {
		ok: true,
		value
	};
}
/** Create a failed {@link Result}. */
function err(error) {
	return {
		ok: false,
		error
	};
}
//#endregion
//#region packages/agent-core/src/harness/types.ts
var CompactionError = class extends Error {
	constructor(code, message, cause) {
		super(message, cause === void 0 ? void 0 : { cause });
		this.name = "CompactionError";
		this.code = code;
	}
};
/** Internal typed signal for a completed summary response with no usable text. */
var InvalidSummaryOutputError = class extends CompactionError {
	constructor(message) {
		super("summarization_failed", message);
	}
};
var BranchSummaryError = class extends Error {
	constructor(code, message, cause) {
		super(message, cause === void 0 ? void 0 : { cause });
		this.name = "BranchSummaryError";
		this.code = code;
	}
};
const NON_ASCII_RE = /[\u0080-\u{10FFFF}]/u;
const COMMON_CJK_RE = /[\u00B7\u3000-\u319F\u4E00-\u9FA5\uAC00-\uD7AF\uFF01-\uFF60]/gu;
const RARE_BMP_CJK_RE = /[\u1100-\u11FF\u2E80-\u2FFF\u31A0-\u4DFF\u9FA6-\u9FFF\uA000-\uA4FF\uA700-\uA707\uA960-\uA97F\uD7B0-\uD7FF\uF900-\uFAFF]/gu;
const TWO_TOKEN_CJK_RE = /[\u{02C7}\u{02C9}-\u{02CB}\u{02D9}\u{02EA}-\u{02EB}\uFE10-\uFE4F\uFF61-\uFFDC\uFFE0-\uFFE6]|\u{0305}|\u{0323}/gu;
const THREE_TOKEN_SUPPLEMENTARY_CJK_RE = /[\u{1D360}-\u{1D371}]/gu;
const SUPPLEMENTARY_CJK_RE = /[\u{16FE0}-\u{16FFF}\u{1AFF0}-\u{1AFFF}\u{1B000}-\u{1B16F}\u{1F200}-\u{1F2FF}\u{20000}-\u{2FA1F}\u{30000}-\u{3347F}]/gu;
const SPECIAL_CJK_RE = /[\u{02C7}\u{02C9}-\u{02CB}\u{02D9}\u{02EA}-\u{02EB}\u1100-\u11FF\u2E80-\u2FFF\u31A0-\u4DFF\u9FA6-\u9FFF\uA000-\uA4FF\uA700-\uA707\uA960-\uA97F\uD7B0-\uD7FF\uF900-\uFAFF\uFE10-\uFE4F\uFF61-\uFFDC\uFFE0-\uFFE6\u{16FE0}-\u{16FFF}\u{1AFF0}-\u{1AFFF}\u{1B000}-\u{1B16F}\u{1D360}-\u{1D371}\u{1F200}-\u{1F2FF}\u{20000}-\u{2FA1F}\u{30000}-\u{3347F}]|\u{0305}|\u{0323}/u;
function countMatches(text, pattern) {
	return (text.match(pattern) ?? []).length;
}
function estimateStringChars(text) {
	if (!NON_ASCII_RE.test(text)) return text.length;
	const commonCjkCount = countMatches(text, COMMON_CJK_RE);
	const commonEstimate = text.length + commonCjkCount * 3;
	if (!SPECIAL_CJK_RE.test(text)) return commonEstimate;
	const rareBmpCjkCount = countMatches(text, RARE_BMP_CJK_RE);
	const twoTokenCjkCount = countMatches(text, TWO_TOKEN_CJK_RE);
	const threeTokenSupplementaryCjkCount = countMatches(text, THREE_TOKEN_SUPPLEMENTARY_CJK_RE);
	const supplementaryCjkCount = countMatches(text, SUPPLEMENTARY_CJK_RE);
	return commonEstimate + rareBmpCjkCount * 11 + twoTokenCjkCount * 7 + threeTokenSupplementaryCjkCount * 10 + supplementaryCjkCount * 14;
}
//#endregion
//#region packages/normalization-core/src/utf16-slice.ts
function isHighSurrogate(codeUnit) {
	return codeUnit >= 55296 && codeUnit <= 56319;
}
function isLowSurrogate(codeUnit) {
	return codeUnit >= 56320 && codeUnit <= 57343;
}
/** Slices a UTF-16 string without returning dangling surrogate halves at either edge. */
function sliceUtf16Safe(input, start, end) {
	const len = input.length;
	let from = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
	let to = end === void 0 ? len : end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
	if (to <= from) return "";
	if (from > 0 && from < len) {
		if (isLowSurrogate(input.charCodeAt(from)) && isHighSurrogate(input.charCodeAt(from - 1))) from += 1;
	}
	if (to > 0 && to < len) {
		if (isHighSurrogate(input.charCodeAt(to - 1)) && isLowSurrogate(input.charCodeAt(to))) to -= 1;
	}
	return input.slice(from, to);
}
/** Truncates a UTF-16 string without cutting a surrogate pair in half. */
function truncateUtf16Safe(input, maxLen) {
	const limit = Math.max(0, Math.floor(maxLen));
	if (input.length <= limit) return input;
	return sliceUtf16Safe(input, 0, limit);
}
//#endregion
//#region packages/agent-core/src/harness/compaction/utils.ts
/** Create an empty file-operation accumulator. */
function createFileOps() {
	return {
		read: /* @__PURE__ */ new Set(),
		written: /* @__PURE__ */ new Set(),
		edited: /* @__PURE__ */ new Set()
	};
}
/** Add file operations from assistant tool calls to an accumulator. */
function extractFileOpsFromMessage(message, fileOps) {
	if (message.role !== "assistant") return;
	if (!("content" in message) || !Array.isArray(message.content)) return;
	for (const block of message.content) {
		if (typeof block !== "object" || block === null) continue;
		if (!("type" in block) || block.type !== "toolCall") continue;
		if (!("arguments" in block) || !("name" in block)) continue;
		const args = block.arguments;
		if (!args) continue;
		const path = typeof args.path === "string" ? args.path : void 0;
		if (!path) continue;
		switch (block.name) {
			case "read":
				fileOps.read.add(path);
				break;
			case "write":
				fileOps.written.add(path);
				break;
			case "edit":
				fileOps.edited.add(path);
				break;
		}
	}
}
/** Compute sorted read-only and modified file lists from accumulated operations. */
function computeFileLists(fileOps) {
	const modified = /* @__PURE__ */ new Set([...fileOps.edited, ...fileOps.written]);
	return {
		readFiles: [...fileOps.read].filter((f) => !modified.has(f)).toSorted(),
		modifiedFiles: [...modified].toSorted()
	};
}
/** Format file lists as summary metadata tags. */
function formatFileOperations(readFiles, modifiedFiles) {
	const sections = [];
	if (readFiles.length > 0) sections.push(`<read-files>\n${readFiles.join("\n")}\n</read-files>`);
	if (modifiedFiles.length > 0) sections.push(`<modified-files>\n${modifiedFiles.join("\n")}\n</modified-files>`);
	if (sections.length === 0) return "";
	return `\n\n${sections.join("\n\n")}`;
}
/** Extract visible summary text without normalizing valid model output. */
function extractSummaryText(response) {
	const summary = response.content.filter((block) => block.type === "text").map((block) => block.text).join("\n");
	return summary.trim() ? summary : void 0;
}
const TOOL_RESULT_MAX_CHARS = 2e3;
const IMPORTANT_TOOL_RESULT_TAIL = /(error|exception|failed|fatal|traceback|panic|stack trace|errno|exit code)/i;
function safeJsonStringify$1(value) {
	try {
		return JSON.stringify(value) ?? "undefined";
	} catch {
		return "[unserializable]";
	}
}
function truncateForSummary(text, maxChars) {
	if (text.length <= maxChars) return text;
	const tailChars = Math.min(Math.floor(maxChars * .3), 600);
	const diagnosticSearch = sliceUtf16Safe(text, -maxChars);
	const diagnosticMatches = Array.from(diagnosticSearch.matchAll(new RegExp(IMPORTANT_TOOL_RESULT_TAIL.source, "gi")));
	const diagnosticMatch = diagnosticMatches.toReversed().find((match) => /^(error|exception|fatal|panic|errno)$/i.test(match[0])) ?? diagnosticMatches.at(-1);
	if (diagnosticMatch) {
		const head = truncateUtf16Safe(text, maxChars - tailChars);
		const displacedHead = sliceUtf16Safe(text, Math.max(0, head.length - 32), maxChars);
		if (!IMPORTANT_TOOL_RESULT_TAIL.test(displacedHead)) {
			const diagnosticOffset = text.length - diagnosticSearch.length + (diagnosticMatch.index ?? 0);
			const tailStart = Math.min(diagnosticOffset, text.length - tailChars);
			if (tailStart >= head.length) {
				const tail = sliceUtf16Safe(text, tailStart, tailStart + tailChars);
				return `${head}\n\n[... ${text.length - head.length - tail.length} ${tailStart + tail.length < text.length ? "middle/trailing" : "more"} characters truncated]\n\n${tail}`;
			}
		}
	}
	const sliced = truncateUtf16Safe(text, maxChars);
	return `${sliced}\n\n[... ${text.length - sliced.length} more characters truncated]`;
}
/** Extract text that compaction both estimates and includes in summary prompts. */
function getCompactionContentBlockText(block) {
	if (block.type === "text" && block.text) return block.text;
	if (block.type !== "toolResult" && block.type !== "tool_result") return "";
	if (block.text) return block.text;
	return typeof block.content === "string" ? block.content : "";
}
/** Serialize LLM messages to plain text for summarization prompts. */
function serializeConversation(messages) {
	const parts = [];
	for (const msg of messages) if (msg.role === "user") {
		const content = typeof msg.content === "string" ? msg.content : msg.content.filter((c) => c.type === "text").map((c) => c.text).join("");
		if (content) parts.push(`[User]: ${content}`);
	} else if (msg.role === "assistant") {
		const textParts = [];
		const thinkingParts = [];
		const toolCalls = [];
		for (const block of msg.content) if (block.type === "text") textParts.push(block.text);
		else if (block.type === "thinking") thinkingParts.push(block.thinking);
		else if (block.type === "toolCall") {
			const args = block.arguments;
			const argsStr = Object.entries(args).map(([k, v]) => `${k}=${safeJsonStringify$1(v)}`).join(", ");
			toolCalls.push(`${block.name}(${argsStr})`);
		}
		if (thinkingParts.length > 0) parts.push(`[Assistant thinking]: ${thinkingParts.join("\n")}`);
		if (textParts.length > 0) parts.push(`[Assistant]: ${textParts.join("\n")}`);
		if (toolCalls.length > 0) parts.push(`[Assistant tool calls]: ${toolCalls.join("; ")}`);
	} else if (msg.role === "toolResult") {
		const content = msg.content.map(getCompactionContentBlockText).join("");
		if (content) parts.push(`[Tool result]: ${truncateForSummary(content, TOOL_RESULT_MAX_CHARS)}`);
	}
	return parts.join("\n\n");
}
//#endregion
//#region packages/agent-core/src/harness/compaction/compaction.ts
function safeJsonStringify(value) {
	try {
		return JSON.stringify(value) ?? "undefined";
	} catch {
		return "[unserializable]";
	}
}
function extractFileOperations(messages, entries, prevBoundaryIndex) {
	const fileOps = createFileOps();
	if (prevBoundaryIndex >= 0 && entries[prevBoundaryIndex]?.type === "compaction") {
		const prevCompaction = entries[prevBoundaryIndex];
		if (!prevCompaction.fromHook && prevCompaction.details) {
			const details = prevCompaction.details;
			if (Array.isArray(details.readFiles)) for (const f of details.readFiles) fileOps.read.add(f);
			if (Array.isArray(details.modifiedFiles)) for (const f of details.modifiedFiles) fileOps.edited.add(f);
		}
	}
	for (const msg of messages) extractFileOpsFromMessage(msg, fileOps);
	return fileOps;
}
function getMessageFromEntry(entry) {
	if (entry.type === "message") return entry.message;
	if (entry.type === "custom_message") return asAgentMessage(createCustomMessage(entry.customType, entry.content, entry.display, entry.details, entry.timestamp));
	if (entry.type === "branch_summary") return asAgentMessage(createBranchSummaryMessage(entry.summary, entry.fromId, entry.timestamp));
	if (entry.type === "compaction") return asAgentMessage(createCompactionSummaryMessage(entry.summary, entry.tokensBefore, entry.timestamp));
}
function getMessageFromEntryForCompaction(entry) {
	if (entry.type === "compaction") return;
	return getMessageFromEntry(entry);
}
function isResetReplayableEntry(entry) {
	return entry.type === "message" && (entry.message.role === "user" || entry.message.role === "assistant");
}
/** Default proactive compaction ratio (fire at 70% of context window). */
const DEFAULT_COMPACT_AT_RATIO = .7;
/** Default compaction settings used by the harness. */
const DEFAULT_COMPACTION_SETTINGS = {
	enabled: true,
	reserveTokens: 16384,
	keepRecentTokens: 2e4,
	compactAtRatio: DEFAULT_COMPACT_AT_RATIO
};
/** Calculate total context tokens from provider usage. */
function calculateContextTokens(usage) {
	if (usage.contextUsage?.state === "available") return usage.contextUsage.totalTokens;
	return usage.totalTokens || usage.input + usage.output + usage.cacheRead + usage.cacheWrite;
}
function getAssistantUsage(msg) {
	if (msg.role === "assistant" && "usage" in msg) {
		const assistantMsg = msg;
		if (assistantMsg.stopReason !== "aborted" && assistantMsg.stopReason !== "error" && assistantMsg.usage && calculateContextTokens(assistantMsg.usage) > 0) return assistantMsg.usage;
	}
}
/** Return usage from the last valid assistant message in session entries. */
function getLastAssistantUsage(entries) {
	for (const entry of entries.toReversed()) if (entry.type === "message") {
		const usage = getAssistantUsage(entry.message);
		if (usage) return usage;
	}
}
function getLastAssistantUsageInfo(messages) {
	for (let i = messages.length - 1; i >= 0; i--) {
		const message = messages.at(i);
		if (!message) continue;
		const usage = getAssistantUsage(message);
		if (usage && usage.contextUsage?.state !== "unavailable") return {
			usage,
			index: i
		};
	}
}
/** Estimate context tokens for messages using provider usage when available. */
function estimateContextTokens(messages) {
	const usageInfo = getLastAssistantUsageInfo(messages);
	if (!usageInfo) {
		let estimated = 0;
		for (const message of messages) estimated += estimateTokens(message);
		return {
			tokens: estimated,
			usageTokens: 0,
			trailingTokens: estimated,
			lastUsageIndex: null
		};
	}
	const usageTokens = calculateContextTokens(usageInfo.usage);
	let trailingTokens = 0;
	for (const message of messages.slice(usageInfo.index + 1)) trailingTokens += estimateTokens(message);
	return {
		tokens: usageTokens + trailingTokens,
		usageTokens,
		trailingTokens,
		lastUsageIndex: usageInfo.index
	};
}
/**
* Return whether context usage exceeds the configured compaction threshold.
*
* R1 (proactive compaction): fires at `compactAtRatio` of the context window
* (default 0.70) — well before the reactive edge (`contextWindow - reserveTokens`,
* ~93%). The `min` ensures we never fire later than the reactive threshold,
* so a high `compactAtRatio` (e.g. 0.95) falls back to reactive behavior.
*
* Prediction: firing at 70% gives the model a smaller, more summarizable
* context, producing higher-quality summaries that fit the budget on the
* first pass.
*
* Competing account: firing at 93% is fine if the model can summarize a
* near-full context window effectively.
*
* Support: on 2026-08-15, topic 53 reached 275K tokens (114% over the 242K
* budget) because compaction at ~93% left the model with too much context to
* summarize. At 70% (~169K), the model would have had a manageable input.
*/
function shouldCompact(contextTokens, contextWindow, settings) {
	if (!settings.enabled) return false;
	const reactiveThreshold = contextWindow - settings.reserveTokens;
	const compactAtRatio = settings.compactAtRatio ?? .7;
	const proactiveThreshold = Math.floor(contextWindow * compactAtRatio);
	return contextTokens > Math.min(proactiveThreshold, reactiveThreshold);
}
const IMAGE_BLOCK_CHARS = 4800;
function countContentBlockChars(content) {
	let chars = 0;
	for (const block of content) if (block.type === "image") chars += IMAGE_BLOCK_CHARS;
	else chars += estimateStringChars(getCompactionContentBlockText(block));
	return chars;
}
/** Estimate token count for one message using a conservative character heuristic. */
function estimateTokens(message) {
	let chars = 0;
	const harnessMessage = message;
	switch (harnessMessage.role) {
		case "user": {
			const content = harnessMessage.content;
			if (typeof content === "string") chars = estimateStringChars(content);
			else if (Array.isArray(content)) chars = countContentBlockChars(content);
			return Math.ceil(chars / 4);
		}
		case "assistant": {
			const assistant = harnessMessage;
			for (const block of assistant.content) if (block.type === "text") chars += estimateStringChars(block.text);
			else if (block.type === "thinking") chars += estimateStringChars(block.thinking);
			else if (block.type === "toolCall") chars += estimateStringChars(block.name) + estimateStringChars(safeJsonStringify(block.arguments));
			return Math.ceil(chars / 4);
		}
		case "custom":
		case "toolResult":
			if (typeof harnessMessage.content === "string") chars = estimateStringChars(harnessMessage.content);
			else chars = countContentBlockChars(harnessMessage.content);
			return Math.ceil(chars / 4);
		case "bashExecution":
			chars = estimateStringChars(harnessMessage.command) + estimateStringChars(harnessMessage.output);
			return Math.ceil(chars / 4);
		case "branchSummary":
		case "compactionSummary":
			chars = estimateStringChars(harnessMessage.summary);
			return Math.ceil(chars / 4);
	}
	return 0;
}
function isCutPointMessage(message) {
	switch (message.role) {
		case "user":
		case "assistant":
		case "bashExecution":
		case "custom":
		case "branchSummary":
		case "compactionSummary": return true;
		case "toolResult": return false;
	}
	return false;
}
function isTurnStartMessage(message) {
	switch (message.role) {
		case "user":
		case "bashExecution":
		case "custom":
		case "branchSummary":
		case "compactionSummary": return true;
		case "assistant":
		case "toolResult": return false;
	}
	return false;
}
function isTurnStartEntry(entry) {
	const message = getMessageFromEntryForCompaction(entry);
	return message ? isTurnStartMessage(message) : false;
}
function findValidCutPoints(entries, startIndex, endIndex) {
	const cutPoints = [];
	for (let i = startIndex; i < endIndex; i++) {
		const entry = entries[i];
		if (!entry) continue;
		const message = getMessageFromEntryForCompaction(entry);
		if (message && isCutPointMessage(message)) cutPoints.push(i);
	}
	return cutPoints;
}
/** Find the user-visible message that starts the turn containing an entry. */
function findTurnStartIndex(entries, entryIndex, startIndex) {
	for (let i = entryIndex; i >= startIndex; i--) {
		const entry = entries[i];
		if (!entry) continue;
		if (isTurnStartEntry(entry)) return i;
	}
	return -1;
}
/** Find the compaction cut point that keeps approximately the requested recent-token budget. */
function findCutPoint(entries, startIndex, endIndex, keepRecentTokens) {
	const cutPoints = findValidCutPoints(entries, startIndex, endIndex);
	if (cutPoints.length === 0) return {
		firstKeptEntryIndex: startIndex,
		turnStartIndex: -1,
		isSplitTurn: false
	};
	let accumulatedTokens = 0;
	const firstCutIndex = cutPoints.at(0);
	if (firstCutIndex === void 0) return {
		firstKeptEntryIndex: startIndex,
		turnStartIndex: -1,
		isSplitTurn: false
	};
	let cutIndex = firstCutIndex;
	for (let i = endIndex - 1; i >= startIndex; i--) {
		const entry = entries[i];
		if (!entry) continue;
		const message = getMessageFromEntryForCompaction(entry);
		if (!message) continue;
		const messageTokens = estimateTokens(message);
		accumulatedTokens += messageTokens;
		if (accumulatedTokens >= keepRecentTokens) {
			const lastCutIndex = cutPoints.at(-1);
			if (lastCutIndex === void 0) throw new Error("compaction cut-point list became empty during selection");
			cutIndex = lastCutIndex;
			for (const cutPoint of cutPoints) if (cutPoint >= i) {
				cutIndex = cutPoint;
				break;
			}
			break;
		}
	}
	while (cutIndex > startIndex) {
		const prevEntry = entries[cutIndex - 1];
		if (!prevEntry) break;
		if (prevEntry.type === "compaction" || prevEntry.type === "reset") break;
		if (getMessageFromEntryForCompaction(prevEntry)) break;
		cutIndex--;
	}
	const cutEntry = entries[cutIndex];
	if (!cutEntry) throw new Error("compaction cut point does not reference a session entry");
	const startsTurn = isTurnStartEntry(cutEntry);
	const turnStartIndex = startsTurn ? -1 : findTurnStartIndex(entries, cutIndex, startIndex);
	return {
		firstKeptEntryIndex: cutIndex,
		turnStartIndex,
		isSplitTurn: !startsTurn && turnStartIndex !== -1
	};
}
const SUMMARIZATION_SYSTEM_PROMPT = `You are a context summarization assistant. Your task is to read a conversation between a user and an AI assistant, then produce a structured summary following the exact format specified.

Do NOT continue the conversation. Do NOT respond to any questions in the conversation. ONLY output the structured summary.

If the workspace defines stable axiom IDs (e.g., S-xxx, C-xxx, E-xxx, M-xxx, T-xxx in AGENTS.md), preserve and reference them by ID when summarizing constraints, decisions, and context. Do not paraphrase axiom IDs away — they are stable cross-references that survive compaction.`;
const SUMMARIZATION_PROMPT = `The messages above are a conversation to summarize. Create a structured context checkpoint summary that another LLM will use to continue the work.

Use this EXACT format:

## Goal
[What is the user trying to accomplish? Can be multiple items if the session covers different tasks.]

## Constraints & Preferences
- [Any constraints, preferences, or requirements mentioned by user]
- [Reference workspace axiom IDs where applicable, e.g., "Must follow T-102 (Exec Hygiene)"]
- [Or "(none)" if none were mentioned]

## Progress
### Done
- [x] [Completed tasks/changes]

### In Progress
- [ ] [Current work]

### Blocked
- [Issues preventing progress, if any]

## Key Decisions
- **[Decision]**: [Brief rationale, referencing axiom IDs where relevant]

## Next Steps
1. [Ordered list of what should happen next]

## Critical Context
- [Any data, examples, or references needed to continue]
- [Preserve exact file paths, function names, axiom IDs, and error messages]
- [Or "(none)" if not applicable]

Keep each section concise. Preserve exact file paths, function names, axiom IDs, and error messages.`;
const UPDATE_SUMMARIZATION_PROMPT = `The messages above are NEW conversation messages to incorporate into the existing summary provided in <previous-summary> tags.

Update the existing structured summary with new information. RULES:
- PRESERVE all existing information from the previous summary
- ADD new progress, decisions, and context from the new messages
- UPDATE the Progress section: move items from "In Progress" to "Done" when completed
- UPDATE "Next Steps" based on what was accomplished
- PRESERVE exact file paths, function names, axiom IDs, and error messages
- If something is no longer relevant, you may remove it

Use this EXACT format:

## Goal
[Preserve existing goals, add new ones if the task expanded]

## Constraints & Preferences
- [Preserve existing, add new ones discovered]
- [Reference workspace axiom IDs where applicable]

## Progress
### Done
- [x] [Include previously done items AND newly completed items]

### In Progress
- [ ] [Current work - update based on progress]

### Blocked
- [Current blockers - remove if resolved]

## Key Decisions
- **[Decision]**: [Brief rationale] (preserve all previous, add new)

## Next Steps
1. [Update based on current state]

## Critical Context
- [Preserve important context, add new if needed]
- [Preserve axiom ID references]

Keep each section concise. Preserve exact file paths, function names, axiom IDs, and error messages.`;
function createSummarizationOptions(model, maxTokens, apiKey, headers, signal, thinkingLevel) {
	const options = {
		maxTokens,
		signal,
		apiKey,
		headers
	};
	const fableReasoning = (model.api === "anthropic-messages" || model.api === "bedrock-converse-stream") && resolveClaudeFable5ModelIdentity(model) !== void 0;
	if ((model.reasoning || fableReasoning) && thinkingLevel) options.reasoning = resolveAgentReasoningOption(model, thinkingLevel);
	return options;
}
async function completeSummarization(model, context, options, streamFn, runtime) {
	if (streamFn) return (await streamFn(model, context, options)).result();
	return await resolveAgentCoreCompleteFn(runtime)(model, context, options);
}
/** Runs one summarization completion and maps abort/error stops to CompactionError. */
async function runSummarizationCompletion(params) {
	const summarizationMessages = [{
		role: "user",
		content: [{
			type: "text",
			text: params.promptText
		}],
		timestamp: Date.now()
	}];
	const response = await completeSummarization(params.model, {
		systemPrompt: SUMMARIZATION_SYSTEM_PROMPT,
		messages: summarizationMessages
	}, createSummarizationOptions(params.model, params.maxTokens, params.apiKey, params.headers, params.signal, params.thinkingLevel), params.streamFn, params.runtime);
	if (response.stopReason === "aborted") return err(new CompactionError("aborted", response.errorMessage || `${params.errorLabel} aborted`));
	if (response.stopReason === "error") return err(new CompactionError("summarization_failed", `${params.errorLabel} failed: ${response.errorMessage || "Unknown error"}`));
	const summary = extractSummaryText(response);
	if (summary === void 0) return err(new InvalidSummaryOutputError(`${params.errorLabel} failed: model returned no summary text`));
	return ok(summary);
}
/** Generate or update a conversation summary for compaction. */
async function generateSummary(currentMessages, model, reserveTokens, apiKey, headers, signal, customInstructions, previousSummary, thinkingLevel, streamFn, runtime, contextTokenBudget, keepRecentTokens) {
	const budgetForSummary = contextTokenBudget && keepRecentTokens != null ? Math.max(2048, contextTokenBudget - keepRecentTokens - reserveTokens) : reserveTokens;
	const summaryCap = contextTokenBudget ? Math.floor(.25 * contextTokenBudget) : Number.POSITIVE_INFINITY;
	const maxTokens = Math.min(Math.floor(.8 * Math.min(budgetForSummary, summaryCap)), model.maxTokens > 0 ? model.maxTokens : Number.POSITIVE_INFINITY);
	let basePrompt = previousSummary ? UPDATE_SUMMARIZATION_PROMPT : SUMMARIZATION_PROMPT;
	if (customInstructions) basePrompt = `${basePrompt}\n\nAdditional focus: ${customInstructions}`;
	let promptText = `<conversation>\n${serializeConversation(convertToLlm(currentMessages))}\n</conversation>\n\n`;
	if (previousSummary) promptText += `<previous-summary>\n${previousSummary}\n</previous-summary>\n\n`;
	promptText += basePrompt;
	return await runSummarizationCompletion({
		promptText,
		model,
		maxTokens,
		apiKey,
		headers,
		signal,
		thinkingLevel,
		streamFn,
		runtime,
		errorLabel: "Summarization"
	});
}
/** Prepare session entries for compaction, or return undefined when compaction is not applicable. */
function prepareCompaction(pathEntries, settings) {
	if (pathEntries.at(-1)?.type === "compaction" || pathEntries.at(-1)?.type === "reset" || pathEntries.length === 0) return ok(void 0);
	let prevBoundaryIndex = -1;
	for (let i = pathEntries.length - 1; i >= 0; i--) {
		const type = pathEntries.at(i)?.type;
		if (type === "compaction" || type === "reset") {
			prevBoundaryIndex = i;
			break;
		}
	}
	let previousSummary;
	let effectiveEntries = pathEntries;
	let resetPreludeMessages = [];
	let boundaryStart = 0;
	if (prevBoundaryIndex >= 0) {
		const prevBoundary = pathEntries[prevBoundaryIndex];
		previousSummary = prevBoundary?.type === "compaction" ? prevBoundary.summary : void 0;
		const firstKeptEntryId = prevBoundary?.type === "compaction" || prevBoundary?.type === "reset" ? prevBoundary.firstKeptEntryId : void 0;
		const firstKeptEntryIndex = pathEntries.findIndex((entry) => entry.id === firstKeptEntryId);
		if (prevBoundary?.type === "reset") {
			resetPreludeMessages = (firstKeptEntryIndex >= 0 ? pathEntries.slice(firstKeptEntryIndex, prevBoundaryIndex).filter(isResetReplayableEntry) : []).flatMap((entry) => {
				const message = getMessageFromEntryForCompaction(entry);
				return message ? [message] : [];
			});
			effectiveEntries = pathEntries.slice(prevBoundaryIndex + 1);
			prevBoundaryIndex = -1;
		} else boundaryStart = firstKeptEntryIndex >= 0 ? firstKeptEntryIndex : prevBoundaryIndex + 1;
	}
	const boundaryEnd = effectiveEntries.length;
	const contextMessages = buildSessionContext(pathEntries).messages;
	const contextUsage = estimateContextTokens(contextMessages);
	const tokensBefore = contextUsage.tokens;
	const totalEstimatedTokens = contextMessages.reduce((total, message) => total + estimateTokens(message), 0);
	const triggerUnitScale = totalEstimatedTokens > 0 && Number.isFinite(totalEstimatedTokens) && Number.isFinite(contextUsage.usageTokens) ? Math.min(Math.max(1, settings.keepRecentTokens), Math.max(1, contextUsage.usageTokens / totalEstimatedTokens)) : 1;
	const resetPreludeTokens = resetPreludeMessages.reduce((total, message) => total + estimateTokens(message), 0);
	const keepRecentTokens = Math.min(Number.MAX_SAFE_INTEGER, settings.keepRecentTokens / triggerUnitScale + resetPreludeTokens);
	const cutPoint = findCutPoint(effectiveEntries, boundaryStart, boundaryEnd, keepRecentTokens);
	const firstKeptEntry = effectiveEntries[cutPoint.firstKeptEntryIndex];
	if (!firstKeptEntry?.id) return err(new CompactionError("invalid_session", "First kept entry has no UUID - session may need migration"));
	const firstKeptEntryId = firstKeptEntry.id;
	const historyEnd = cutPoint.isSplitTurn ? cutPoint.turnStartIndex : cutPoint.firstKeptEntryIndex;
	const messagesToSummarize = [...resetPreludeMessages];
	for (let i = boundaryStart; i < historyEnd; i++) {
		const entry = effectiveEntries.at(i);
		const msg = entry ? getMessageFromEntryForCompaction(entry) : void 0;
		if (msg) messagesToSummarize.push(msg);
	}
	const turnPrefixMessages = [];
	if (cutPoint.isSplitTurn) for (let i = cutPoint.turnStartIndex; i < cutPoint.firstKeptEntryIndex; i++) {
		const entry = effectiveEntries.at(i);
		const msg = entry ? getMessageFromEntryForCompaction(entry) : void 0;
		if (msg) turnPrefixMessages.push(msg);
	}
	if (messagesToSummarize.length === 0 && turnPrefixMessages.length === 0) return ok(void 0);
	const fileOps = extractFileOperations(messagesToSummarize, effectiveEntries, prevBoundaryIndex);
	if (cutPoint.isSplitTurn) for (const msg of turnPrefixMessages) extractFileOpsFromMessage(msg, fileOps);
	return ok({
		firstKeptEntryId,
		messagesToSummarize,
		turnPrefixMessages,
		isSplitTurn: cutPoint.isSplitTurn,
		tokensBefore,
		previousSummary,
		fileOps,
		settings
	});
}
const TURN_PREFIX_SUMMARIZATION_PROMPT = `This is the PREFIX of a turn that was too large to keep. The SUFFIX (recent work) is retained.

Summarize the prefix to provide context for the retained suffix:

## Original Request
[What did the user ask for in this turn?]

## Early Progress
- [Key decisions and work done in the prefix]

## Context for Suffix
- [Information needed to understand the retained recent work]

Be concise. Focus on what's needed to understand the kept suffix.`;
/** Generate compaction summary data from prepared session history. */
async function compact(preparation, model, apiKey, headers, customInstructions, signal, thinkingLevel, streamFn, runtime, contextTokenBudget) {
	const { firstKeptEntryId, messagesToSummarize, turnPrefixMessages, isSplitTurn, tokensBefore, previousSummary, fileOps, settings } = preparation;
	if (!firstKeptEntryId) return err(new CompactionError("invalid_session", "First kept entry has no UUID - session may need migration"));
	let summary;
	if (isSplitTurn && turnPrefixMessages.length > 0) {
		const historyResult = messagesToSummarize.length > 0 ? await generateSummary(messagesToSummarize, model, settings.reserveTokens, apiKey, headers, signal, customInstructions, previousSummary, thinkingLevel, streamFn, runtime, contextTokenBudget, settings.keepRecentTokens) : ok("No prior history.");
		if (!historyResult.ok) return err(historyResult.error);
		const turnPrefixResult = await generateTurnPrefixSummary(turnPrefixMessages, model, settings.reserveTokens, apiKey, headers, signal, thinkingLevel, streamFn, runtime);
		if (!turnPrefixResult.ok) return err(turnPrefixResult.error);
		summary = `${historyResult.value}\n\n---\n\n**Turn Context (split turn):**\n\n${turnPrefixResult.value}`;
	} else {
		const summaryResult = await generateSummary(messagesToSummarize, model, settings.reserveTokens, apiKey, headers, signal, customInstructions, previousSummary, thinkingLevel, streamFn, runtime, contextTokenBudget, settings.keepRecentTokens);
		if (!summaryResult.ok) return err(summaryResult.error);
		summary = summaryResult.value;
	}
	let convergencePasses = 1;
	let convergenceKeepRecent = settings.keepRecentTokens;
	let convergenceConverged = true;
	if (contextTokenBudget && contextTokenBudget > 0 && !isSplitTurn && messagesToSummarize.length > 0) {
		const projectedTotal = Math.ceil(estimateStringChars(summary) / 4) + settings.keepRecentTokens;
		const convergenceThreshold = Math.floor(contextTokenBudget * .85);
		if (projectedTotal > convergenceThreshold) {
			convergenceConverged = false;
			const halvedKeepRecent = Math.max(2048, Math.floor(settings.keepRecentTokens / 2));
			const secondPass = await generateSummary(messagesToSummarize, model, settings.reserveTokens, apiKey, headers, signal, customInstructions, summary, thinkingLevel, streamFn, runtime, contextTokenBudget, halvedKeepRecent);
			if (secondPass.ok) {
				summary = secondPass.value;
				convergencePasses = 2;
				convergenceKeepRecent = halvedKeepRecent;
				convergenceConverged = Math.ceil(estimateStringChars(summary) / 4) + halvedKeepRecent <= convergenceThreshold;
			}
		}
	}
	const { readFiles, modifiedFiles } = computeFileLists(fileOps);
	summary += formatFileOperations(readFiles, modifiedFiles);
	const convergence = contextTokenBudget && contextTokenBudget > 0 && !isSplitTurn && messagesToSummarize.length > 0 ? {
		passes: convergencePasses,
		converged: convergenceConverged,
		summaryTokens: Math.ceil(estimateStringChars(summary) / 4),
		keepRecentTokens: convergenceKeepRecent,
		contextTokenBudget
	} : void 0;
	return ok({
		summary,
		firstKeptEntryId,
		tokensBefore,
		details: {
			readFiles,
			modifiedFiles
		},
		convergence
	});
}
async function generateTurnPrefixSummary(messages, model, reserveTokens, apiKey, headers, signal, thinkingLevel, streamFn, runtime) {
	const maxTokens = Math.min(Math.floor(.5 * reserveTokens), model.maxTokens > 0 ? model.maxTokens : Number.POSITIVE_INFINITY);
	return await runSummarizationCompletion({
		promptText: `<conversation>\n${serializeConversation(convertToLlm(messages))}\n</conversation>\n\n${TURN_PREFIX_SUMMARIZATION_PROMPT}`,
		model,
		maxTokens,
		apiKey,
		headers,
		signal,
		thinkingLevel,
		streamFn,
		runtime,
		errorLabel: "Turn prefix summarization"
	});
}
//#endregion
export { buildSessionContext as C, ok as S, extractSummaryText as _, compact as a, BranchSummaryError as b, findCutPoint as c, getLastAssistantUsage as d, prepareCompaction as f, extractFileOpsFromMessage as g, createFileOps as h, calculateContextTokens as i, findTurnStartIndex as l, computeFileLists as m, DEFAULT_COMPACT_AT_RATIO as n, estimateContextTokens as o, shouldCompact as p, SUMMARIZATION_SYSTEM_PROMPT as r, estimateTokens as s, DEFAULT_COMPACTION_SETTINGS as t, generateSummary as u, formatFileOperations as v, err as x, serializeConversation as y };

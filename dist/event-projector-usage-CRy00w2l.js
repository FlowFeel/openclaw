import { P as normalizeUsage } from "./session-accessor.sqlite-B9iW7DOt.js";
import "./agent-harness-runtime-C6lTQ2x2.js";
import { at as isJsonObject } from "./shared-client-C1J_DxeO.js";
import { H as readString, V as readNumber, z as readNonNegativeInteger } from "./thread-resume-CDsDVTvc.js";
//#region extensions/codex/src/app-server/event-projector-usage.ts
function readTokenCount(record, key) {
	const value = readNonNegativeInteger(record, key);
	return value !== void 0 && Number.isSafeInteger(value) ? value : void 0;
}
function readCodexThreadTokenUsage(params) {
	const tokenUsage = isJsonObject(params.tokenUsage) ? params.tokenUsage : void 0;
	const last = tokenUsage && isJsonObject(tokenUsage.last) ? tokenUsage.last : void 0;
	return last ? normalizeCodexThreadTokenUsage(last) : void 0;
}
function readCodexThreadContextSnapshot(params) {
	const tokenUsage = isJsonObject(params.tokenUsage) ? params.tokenUsage : void 0;
	const last = tokenUsage && isJsonObject(tokenUsage.last) ? tokenUsage.last : void 0;
	const modelContextWindow = tokenUsage ? readTokenCount(tokenUsage, "modelContextWindow") : void 0;
	const promptTokens = last ? readTokenCount(last, "inputTokens") : void 0;
	return {
		...modelContextWindow && modelContextWindow > 0 ? { modelContextWindow } : {},
		...promptTokens !== void 0 ? { promptTokens } : {}
	};
}
function projectCodexThreadUsageUpdate(params, currentUsage, applyUsage, emitContext) {
	applyUsage(readCodexThreadTokenUsage(params) ?? currentUsage);
	const context = readCodexThreadContextSnapshot(params);
	if (context.modelContextWindow !== void 0 || context.promptTokens !== void 0) emitContext(context);
}
function normalizeCodexThreadTokenUsage(record) {
	const inputTokens = readNumber(record, "inputTokens");
	const cacheRead = readNumber(record, "cachedInputTokens");
	const usage = normalizeUsage({
		input: inputTokens !== void 0 && cacheRead !== void 0 ? Math.max(0, inputTokens - cacheRead) : inputTokens,
		output: readNumber(record, "outputTokens"),
		cacheRead,
		total: readNumber(record, "totalTokens")
	});
	return usage ? {
		...usage,
		contextUsage: { state: "unavailable" }
	} : void 0;
}
function normalizeCodexResponseTokenUsage(record) {
	const totalTokens = readTokenCount(record, "totalTokens");
	const inputTokens = readTokenCount(record, "inputTokens");
	const cacheRead = readTokenCount(record, "cachedInputTokens");
	const output = readTokenCount(record, "outputTokens");
	const reasoningOutput = readTokenCount(record, "reasoningOutputTokens");
	const cacheWrite = record.cacheWriteInputTokens === void 0 ? 0 : readTokenCount(record, "cacheWriteInputTokens");
	if (totalTokens === void 0 || inputTokens === void 0 || cacheRead === void 0 || cacheWrite === void 0 || output === void 0 || reasoningOutput === void 0 || cacheRead + cacheWrite > inputTokens || totalTokens !== inputTokens + output) return;
	const usage = normalizeUsage({
		input: inputTokens - cacheRead - cacheWrite,
		output,
		cacheRead,
		cacheWrite,
		total: totalTokens
	});
	if (!usage) return;
	return {
		...usage,
		contextUsage: {
			state: "available",
			promptTokens: inputTokens,
			totalTokens
		}
	};
}
var CodexResponseCompletionProjection = class {
	constructor() {
		this.responseIds = /* @__PURE__ */ new Set();
	}
	get modelIterations() {
		return this.responseIds.size;
	}
	clear() {
		this.usage = void 0;
	}
	record(params) {
		const responseId = readString(params, "responseId");
		if (responseId) this.responseIds.add(responseId);
		const usage = isJsonObject(params.usage) ? params.usage : void 0;
		this.usage = usage ? normalizeCodexResponseTokenUsage(usage) : void 0;
	}
};
//#endregion
export { normalizeCodexResponseTokenUsage as n, projectCodexThreadUsageUpdate as r, CodexResponseCompletionProjection as t };

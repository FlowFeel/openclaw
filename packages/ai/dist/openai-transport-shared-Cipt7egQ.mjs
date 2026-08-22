import { b as isRecord, n as getAiTransportHost } from "./host-Bl7Kgddo.mjs";
import { n as calculateCost, t as applyProviderReportedUsageCost } from "./model-utils-Dau5dlgm.mjs";
import { n as clampOpenAIPromptCacheKey } from "./openai-prompt-cache-mZTCdRPo.mjs";
import { t as projectRuntimeToolInputSchema } from "./tool-schema-json-projection-B1b-XCn5.mjs";
import { d as transportAbortError } from "./transport-stream-shared-CPNv7A3r.mjs";
//#region packages/ai/src/providers/openai-tool-projection.ts
function unreadableToolDiagnostic(toolIndex) {
	return {
		toolIndex,
		violations: [`tool[${toolIndex}] is unreadable`]
	};
}
/** Snapshots direct/custom tool descriptors before OpenAI payload construction. */
function projectOpenAITools(tools) {
	let inputToolCount;
	try {
		inputToolCount = tools.length;
	} catch {
		return {
			inputToolCount: 0,
			tools: [],
			diagnostics: [unreadableToolDiagnostic(0)]
		};
	}
	const projectedTools = [];
	const diagnostics = [];
	for (let toolIndex = 0; toolIndex < inputToolCount; toolIndex += 1) {
		let tool;
		try {
			const candidate = tools[toolIndex];
			if (!candidate) {
				diagnostics.push(unreadableToolDiagnostic(toolIndex));
				continue;
			}
			tool = candidate;
		} catch {
			diagnostics.push(unreadableToolDiagnostic(toolIndex));
			continue;
		}
		let name;
		try {
			name = tool.name;
		} catch {
			diagnostics.push({
				toolIndex,
				violations: [`tool[${toolIndex}].name is unreadable`]
			});
			continue;
		}
		if (typeof name !== "string" || !name) {
			diagnostics.push({
				toolIndex,
				violations: [`tool[${toolIndex}].name is empty`]
			});
			continue;
		}
		let parameters;
		try {
			parameters = tool.parameters;
		} catch {
			diagnostics.push({
				toolIndex,
				toolName: name,
				violations: [`${name}.parameters is unreadable`]
			});
			continue;
		}
		const schemaProjection = projectRuntimeToolInputSchema(parameters ?? {}, `${name}.parameters`);
		if (!isRecord(schemaProjection.schema) || schemaProjection.violations.length > 0) {
			diagnostics.push({
				toolIndex,
				toolName: name,
				violations: schemaProjection.violations.length > 0 ? schemaProjection.violations : [`${name}.parameters must be a JSON object schema`]
			});
			continue;
		}
		let descriptionValue;
		try {
			descriptionValue = tool.description;
		} catch {}
		const description = typeof descriptionValue === "string" ? descriptionValue : void 0;
		projectedTools.push({
			toolIndex,
			name,
			...description !== void 0 ? { description } : {},
			parameters: schemaProjection.schema
		});
	}
	return {
		inputToolCount,
		tools: projectedTools,
		diagnostics
	};
}
function requireProjectedFunction(name, projection, choiceLabel) {
	if (!projection.tools.some((tool) => tool.name === name)) throw new Error(`${choiceLabel} requested unavailable tool "${name}" after schema conversion`);
}
/** Keeps Responses tool choices aligned with surviving function schemas. */
function reconcileOpenAIResponsesToolChoice(choice, projection) {
	if (choice === "auto") return projection.tools.length > 0 ? choice : void 0;
	if (choice === "required") {
		if (projection.tools.length === 0) throw new Error("OpenAI Responses tool_choice requires a tool, but no tools survived schema conversion");
		return choice;
	}
	if (choice === "none" || !isRecord(choice)) return choice;
	const choiceType = choice.type;
	if (choiceType === "function") {
		const functionName = choice.name;
		if (typeof functionName !== "string") return choice;
		requireProjectedFunction(functionName, projection, "OpenAI Responses tool_choice");
		return {
			type: "function",
			name: functionName
		};
	}
	if (choiceType !== "allowed_tools") return choice;
	const mode = choice.mode;
	const tools = choice.tools;
	if (mode !== "auto" && mode !== "required" || !Array.isArray(tools)) return choice;
	const normalizedAllowedTools = [];
	for (const tool of tools) {
		if (!isRecord(tool) || tool.type !== "function") {
			normalizedAllowedTools.push(tool);
			continue;
		}
		const functionName = tool.name;
		if (typeof functionName === "string" && projection.tools.some((projectedTool) => projectedTool.name === functionName)) normalizedAllowedTools.push({
			type: "function",
			name: functionName
		});
	}
	if (normalizedAllowedTools.length === 0) {
		if (mode === "auto") return "none";
		throw new Error("OpenAI Responses tool_choice requires a tool, but no allowed tools survived schema conversion");
	}
	return {
		type: "allowed_tools",
		mode,
		tools: normalizedAllowedTools
	};
}
/** Keeps Chat Completions tool choices aligned with surviving function schemas. */
function reconcileOpenAICompletionsToolChoice(choice, projection) {
	if (choice === "auto") return projection.tools.length > 0 ? choice : void 0;
	if (choice === "required") {
		if (projection.tools.length === 0) throw new Error("OpenAI Chat Completions tool_choice requires a tool, but no tools survived schema conversion");
		return choice;
	}
	if (choice === "none" || !isRecord(choice)) return choice;
	const choiceType = choice.type;
	if (choiceType === "custom") throw new Error("OpenAI Chat Completions custom tool_choice is unsupported because this adapter emits function tools only");
	if (choiceType === "function") {
		const functionChoice = choice.function;
		if (!isRecord(functionChoice)) return choice;
		const functionName = functionChoice.name;
		if (typeof functionName !== "string") return choice;
		requireProjectedFunction(functionName, projection, "OpenAI Chat Completions tool_choice");
		return {
			type: "function",
			function: { name: functionName }
		};
	}
	if (choiceType !== "allowed_tools") return choice;
	const allowedConfig = choice.allowed_tools;
	if (!isRecord(allowedConfig)) return choice;
	const mode = allowedConfig.mode;
	const tools = allowedConfig.tools;
	if (mode !== "auto" && mode !== "required" || !Array.isArray(tools)) return choice;
	const normalizedAllowedTools = [];
	for (const tool of tools) {
		if (!isRecord(tool) || tool.type !== "function") continue;
		const functionChoice = tool.function;
		const functionName = isRecord(functionChoice) ? functionChoice.name : void 0;
		if (typeof functionName === "string" && projection.tools.some((projectedTool) => projectedTool.name === functionName)) normalizedAllowedTools.push({
			type: "function",
			function: { name: functionName }
		});
	}
	if (normalizedAllowedTools.length === 0) {
		if (mode === "auto") return "none";
		throw new Error("OpenAI Chat Completions tool_choice requires a tool, but no allowed tools survived schema conversion");
	}
	return {
		type: "allowed_tools",
		allowed_tools: {
			mode,
			tools: normalizedAllowedTools
		}
	};
}
//#endregion
//#region packages/ai/src/transports/openai-transport-shared.ts
/** Shared options, usage shape, cache identity, ordering, and stream scheduling for OpenAI APIs. */
const MODEL_STREAM_COOPERATIVE_YIELD_INTERVAL_MS = 12;
const MODEL_STREAM_COOPERATIVE_YIELD_MAX_EVENTS = 64;
const GEMINI_THOUGHT_SIGNATURE_VALIDATOR_SKIP = "skip_thought_signature_validator";
const log = {
	debug(message, data) {
		getAiTransportHost().logDebug("openai-transport", () => ({
			message,
			data
		}));
	},
	info(message, data) {
		getAiTransportHost().logInfo("openai-transport", message, data);
	},
	warn(message, data) {
		getAiTransportHost().logWarn("openai-transport", message, data);
	}
};
function parseOpenAICompletionsUsage(rawUsage, model, options) {
	const cacheRead = rawUsage.prompt_tokens_details?.cached_tokens ?? rawUsage.prompt_cache_hit_tokens ?? 0;
	const cacheWrite = rawUsage.prompt_tokens_details?.cache_write_tokens || 0;
	const input = Math.max(0, (rawUsage.prompt_tokens || 0) - cacheRead - cacheWrite);
	const output = rawUsage.completion_tokens || 0;
	const reasoningTokens = rawUsage.completion_tokens_details?.reasoning_tokens;
	const usage = {
		input,
		output,
		cacheRead,
		cacheWrite,
		...options?.includeReasoningTokens !== false && typeof reasoningTokens === "number" && Number.isFinite(reasoningTokens) ? { reasoningTokens } : {},
		totalTokens: input + output + cacheRead + cacheWrite,
		cost: {
			input: 0,
			output: 0,
			cacheRead: 0,
			cacheWrite: 0,
			total: 0
		}
	};
	calculateCost(model, usage);
	applyProviderReportedUsageCost(usage, rawUsage.cost);
	return usage;
}
function throwIfModelStreamAborted(signal) {
	if (signal?.aborted) throw transportAbortError(signal);
}
function createModelStreamCooperativeScheduler(signal) {
	let lastYieldedAt = Date.now();
	let eventsSinceYield = 0;
	return { async afterEvent() {
		throwIfModelStreamAborted(signal);
		eventsSinceYield += 1;
		const now = Date.now();
		if (eventsSinceYield < MODEL_STREAM_COOPERATIVE_YIELD_MAX_EVENTS && now - lastYieldedAt < MODEL_STREAM_COOPERATIVE_YIELD_INTERVAL_MS) return;
		eventsSinceYield = 0;
		lastYieldedAt = now;
		await new Promise((resolve) => {
			setTimeout(resolve, 0);
		});
		throwIfModelStreamAborted(signal);
	} };
}
function resolvePromptCacheKey(options, cacheRetention) {
	if (cacheRetention === "none") return;
	return clampOpenAIPromptCacheKey(options?.promptCacheKey ?? options?.sessionId);
}
function isOpenAICompletionsThinkingEnabled(effort) {
	const normalized = effort.trim().toLowerCase();
	return normalized !== "off" && normalized !== "none";
}
function readOpenAICompletionsContentDeltas(content, topLevelRefusal, mirroredThinking = []) {
	let deltas = readOpenAICompletionsContentPartDeltas(content);
	if (mirroredThinking.length > 0) {
		const structuredThinking = deltas.filter((delta) => delta.kind === "thinking").map((delta) => delta.text);
		const mirrorsCombinedThinking = structuredThinking.length > 1 && mirroredThinking.includes(structuredThinking.join(""));
		deltas = deltas.filter((delta) => delta.kind !== "thinking" || !mirrorsCombinedThinking && !mirroredThinking.includes(delta.text));
	}
	if (typeof topLevelRefusal !== "string" || !topLevelRefusal) return deltas;
	const structuredRefusals = deltas.filter((delta) => delta.kind === "text" && delta.source === "refusal").map((delta) => delta.text);
	if (structuredRefusals.some((refusal) => refusal === topLevelRefusal) || structuredRefusals.length > 1 && structuredRefusals.join("") === topLevelRefusal) return deltas;
	return [...deltas, {
		kind: "text",
		text: topLevelRefusal,
		source: "refusal"
	}];
}
function readOpenAICompletionsContentPartDeltas(content) {
	if (typeof content === "string") return content ? [{
		kind: "text",
		text: content
	}] : [];
	if (Array.isArray(content)) return content.flatMap(readOpenAICompletionsContentPartDeltas);
	if (!content || typeof content !== "object") return [];
	const record = content;
	const type = typeof record.type === "string" ? record.type.toLowerCase() : "";
	const extractText = (value) => {
		if (typeof value === "string") return value;
		if (Array.isArray(value)) return value.map(extractText).join("");
		if (value && typeof value === "object") {
			const nested = value;
			return extractText(nested.text ?? nested.content ?? nested.thinking ?? nested.refusal);
		}
		return "";
	};
	const text = extractText(record.text ?? record.content ?? record.thinking ?? record.refusal);
	if (!text) return [];
	if (type.includes("thinking") || type.includes("reasoning")) return [{
		kind: "thinking",
		text
	}];
	if (type === "refusal") return [{
		kind: "text",
		text,
		source: "refusal"
	}];
	if (["text", "output_text"].includes(type) || type.endsWith(".output_text")) return [{
		kind: "text",
		text
	}];
	return [];
}
//#endregion
export { parseOpenAICompletionsUsage as a, throwIfModelStreamAborted as c, reconcileOpenAIResponsesToolChoice as d, log as i, projectOpenAITools as l, createModelStreamCooperativeScheduler as n, readOpenAICompletionsContentDeltas as o, isOpenAICompletionsThinkingEnabled as r, resolvePromptCacheKey as s, GEMINI_THOUGHT_SIGNATURE_VALIDATOR_SKIP as t, reconcileOpenAICompletionsToolChoice as u };

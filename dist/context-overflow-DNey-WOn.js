import { a as normalizeLowercaseStringOrEmpty } from "./string-coerce-DW4mBlAt.js";
import { b as isRateLimitErrorMessage, g as isBillingErrorMessage } from "./sanitize-user-facing-text-Ba4C3tZ5.js";
import { isConfiguredContextSizeOverflowError } from "@openclaw/ai/internal/runtime";
//#region src/logging/node-require.ts
/** Resolves createRequire from process.getBuiltinModule without static CommonJS imports. */
function resolveNodeRequireFromMeta(metaUrl) {
	const getBuiltinModule = process.getBuiltinModule;
	if (typeof getBuiltinModule !== "function") return null;
	try {
		const moduleNamespace = getBuiltinModule("module");
		const createRequire = typeof moduleNamespace.createRequire === "function" ? moduleNamespace.createRequire : null;
		return createRequire ? createRequire(metaUrl) : null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/agents/embedded-agent-helpers/provider-error-patterns.ts
/**
* Provider-owned error-pattern dispatch plus legacy fallback patterns.
*
* Most provider-specific failover classification now lives on provider-plugin
* hooks. This module keeps only fallback patterns for providers that do not
* yet ship a dedicated provider plugin hook surface.
*/
/**
* Provider-specific context overflow patterns not covered by the generic
* `isContextOverflowError()` in errors.ts. Called from `isContextOverflowError()`
* to catch provider-specific wording that the generic regex misses.
*/
const PROVIDER_CONTEXT_OVERFLOW_PATTERNS = [
	/\binput token count exceeds the maximum number of input tokens\b/i,
	/\binput is too long for this model\b/i,
	/\binput exceeds the maximum number of tokens\b/i,
	/\bollama error:\s*context length exceeded(?:,\s*too many tokens)?\b/i,
	/\btotal tokens?.*exceeds? (?:the )?(?:model(?:'s)? )?(?:max|maximum|limit)/i,
	/\b(?:request|prompt) \(\d[\d,]*\s*tokens?\) exceeds (?:the )?available context size\b/i,
	/\binput (?:is )?too long for (?:the )?model\b/i
];
/**
* Provider-specific patterns that map to specific failover reasons.
* These handle cases where the generic classifiers in failover-matches.ts
* produce wrong results for specific providers.
*/
const PROVIDER_SPECIFIC_PATTERNS = [
	{
		test: /\bthrottlingexception\b/i,
		reason: "rate_limit"
	},
	{
		test: /\bconcurrency limit(?: has been)? reached\b/i,
		reason: "rate_limit"
	},
	{
		test: /\bworkers_ai\b.*\bquota limit exceeded\b/i,
		reason: "rate_limit"
	},
	{
		test: /\bmodelnotreadyexception\b/i,
		reason: "overloaded"
	},
	{
		test: /model(?:_is)?_deactivated|model has been deactivated/i,
		reason: "model_not_found"
	}
];
const requireProviderRuntime = resolveNodeRequireFromMeta(import.meta.url);
let cachedProviderRuntimeHooks;
const PROVIDER_CONTEXT_OVERFLOW_SIGNAL_RE = /\b(?:context|window|prompt|token|tokens|input|request|model)\b/i;
const PROVIDER_CONTEXT_OVERFLOW_ACTION_RE = /\b(?:too\s+(?:large|long|many)|exceed(?:s|ed|ing)?|overflow|limit|maximum|max)\b/i;
function resolveProviderRuntimeHooks() {
	if (cachedProviderRuntimeHooks !== void 0) return cachedProviderRuntimeHooks;
	if (!requireProviderRuntime) {
		cachedProviderRuntimeHooks = null;
		return cachedProviderRuntimeHooks;
	}
	try {
		const loaded = requireProviderRuntime("../../plugins/provider-runtime.js");
		cachedProviderRuntimeHooks = {
			classifyProviderFailoverReasonWithPlugin: ({ provider, context }) => loaded.classifyProviderFailoverReasonWithPlugin({
				provider,
				context
			}) ?? null,
			matchesProviderContextOverflowWithPlugin: loaded.matchesProviderContextOverflowWithPlugin
		};
	} catch {
		cachedProviderRuntimeHooks = null;
	}
	return cachedProviderRuntimeHooks ?? null;
}
function looksLikeProviderContextOverflowCandidate(errorMessage) {
	return PROVIDER_CONTEXT_OVERFLOW_SIGNAL_RE.test(errorMessage) && PROVIDER_CONTEXT_OVERFLOW_ACTION_RE.test(errorMessage);
}
function normalizeProviderSpecificErrorContext(input) {
	return typeof input === "string" ? { errorMessage: input } : input;
}
/**
* Check if an error message matches any provider-specific context overflow pattern.
* Called from `isContextOverflowError()` to catch provider-specific wording.
*/
function matchesProviderContextOverflow(errorMessage) {
	if (!looksLikeProviderContextOverflowCandidate(errorMessage)) return false;
	return resolveProviderRuntimeHooks()?.matchesProviderContextOverflowWithPlugin({ context: { errorMessage } }) === true || PROVIDER_CONTEXT_OVERFLOW_PATTERNS.some((pattern) => pattern.test(errorMessage));
}
function classifyProviderPluginError(input) {
	const context = normalizeProviderSpecificErrorContext(input);
	return resolveProviderRuntimeHooks()?.classifyProviderFailoverReasonWithPlugin({
		provider: context.provider,
		context
	}) ?? null;
}
/**
* Try to classify an error using provider-specific patterns.
* Returns null if no provider-specific pattern matches (fall through to generic classification).
*/
function classifyProviderSpecificError(input, opts) {
	const context = normalizeProviderSpecificErrorContext(input);
	if (opts?.includePluginHooks !== false) {
		const pluginReason = classifyProviderPluginError(context);
		if (pluginReason) return pluginReason;
	}
	for (const pattern of PROVIDER_SPECIFIC_PATTERNS) if (pattern.test.test(context.errorMessage)) return pattern.reason;
	return null;
}
//#endregion
//#region src/agents/embedded-agent-helpers/context-overflow.ts
/** Detect provider errors that require reasoning to stay enabled. */
function isReasoningConstraintErrorMessage(raw) {
	if (!raw) return false;
	const lower = normalizeLowercaseStringOrEmpty(raw);
	return lower.includes("reasoning is mandatory") || lower.includes("reasoning is required") || lower.includes("requires reasoning") || lower.includes("reasoning") && lower.includes("cannot be disabled");
}
function hasRateLimitTpmHint(raw) {
	const lower = normalizeLowercaseStringOrEmpty(raw);
	return /\btpm\b/i.test(lower) || lower.includes("tokens per minute");
}
/** Detect explicit context-window overflow without confusing TPM rate limits. */
function isContextOverflowError(errorMessage) {
	if (!errorMessage) return false;
	const lower = normalizeLowercaseStringOrEmpty(errorMessage);
	if (hasRateLimitTpmHint(errorMessage)) return false;
	if (isReasoningConstraintErrorMessage(errorMessage)) return false;
	const hasRequestSizeExceeds = lower.includes("request size exceeds");
	const hasContextWindow = lower.includes("context window") || lower.includes("context length") || lower.includes("maximum context length");
	const hasContextWindowOutOfRoom = hasContextWindow && (lower.includes("ran out of room") || lower.includes("ran out of space"));
	return lower.includes("request_too_large") || lower.includes("context_overflow") || isConfiguredContextSizeOverflowError(errorMessage) || lower.includes("invalid_argument") && lower.includes("maximum number of tokens") || lower.includes("request exceeds the maximum size") || lower.includes("context length exceeded") || lower.includes("maximum context length") || lower.includes("prompt is too long") || lower.includes("prompt too long") || lower.includes("exceeds model context window") || lower.includes("model token limit") || lower.includes("input exceeds") && lower.includes("maximum number of tokens") || hasContextWindowOutOfRoom || hasRequestSizeExceeds && hasContextWindow || lower.includes("context overflow:") || lower.includes("exceed context limit") || lower.includes("exceeds the model's maximum context") || lower.includes("max_tokens") && lower.includes("exceed") && lower.includes("context") || lower.includes("input length") && lower.includes("exceed") && lower.includes("context") || lower.includes("413") && lower.includes("too large") || lower.includes("context_window_exceeded") || errorMessage.includes("上下文过长") || errorMessage.includes("上下文超出") || errorMessage.includes("上下文长度超") || errorMessage.includes("超出最大上下文") || errorMessage.includes("请压缩上下文") || matchesProviderContextOverflow(errorMessage);
}
const CONTEXT_WINDOW_TOO_SMALL_RE = /context window.*(too small|minimum is)/i;
const CONTEXT_OVERFLOW_HINT_RE = /context.*overflow|context window.*(too (?:large|long)|exceed|over|limit|max(?:imum)?|requested|sent|tokens)|prompt.*(too (?:large|long)|exceed|over|limit|max(?:imum)?)|(?:request|input).*(?:context|window|length|token).*(too (?:large|long)|exceed|over|limit|max(?:imum)?)/i;
const RATE_LIMIT_HINT_RE = /rate limit|too many requests|requests per (?:minute|hour|day)|quota|throttl|429\b|tokens per day/i;
function isLikelyContextOverflowError(errorMessage) {
	if (!errorMessage) return false;
	if (hasRateLimitTpmHint(errorMessage)) return false;
	if (isReasoningConstraintErrorMessage(errorMessage)) return false;
	if (isBillingErrorMessage(errorMessage)) return false;
	if (CONTEXT_WINDOW_TOO_SMALL_RE.test(errorMessage)) return false;
	if (isRateLimitErrorMessage(errorMessage)) return false;
	if (isContextOverflowError(errorMessage)) return true;
	if (RATE_LIMIT_HINT_RE.test(errorMessage)) return false;
	return CONTEXT_OVERFLOW_HINT_RE.test(errorMessage);
}
//#endregion
export { classifyProviderSpecificError as a, classifyProviderPluginError as i, isLikelyContextOverflowError as n, isReasoningConstraintErrorMessage as r, isContextOverflowError as t };

//#region packages/ai/src/providers/openai-prompt-cache.ts
/** Maximum prompt cache key length accepted by OpenAI-compatible request metadata. */
const OPENAI_PROMPT_CACHE_KEY_MAX_LENGTH = 64;
/** Truncates a prompt cache key by Unicode code point count. */
function clampOpenAIPromptCacheKey(key) {
	if (key === void 0) return;
	const chars = Array.from(key);
	if (chars.length <= 64) return key;
	return chars.slice(0, 64).join("");
}
//#endregion
export { clampOpenAIPromptCacheKey as n, OPENAI_PROMPT_CACHE_KEY_MAX_LENGTH as t };

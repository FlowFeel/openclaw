//#region packages/ai/src/providers/openai-prompt-cache.d.ts
/** Maximum prompt cache key length accepted by OpenAI-compatible request metadata. */
declare const OPENAI_PROMPT_CACHE_KEY_MAX_LENGTH = 64;
/** Truncates a prompt cache key by Unicode code point count. */
declare function clampOpenAIPromptCacheKey(key: string | undefined): string | undefined;
//#endregion
export { clampOpenAIPromptCacheKey as n, OPENAI_PROMPT_CACHE_KEY_MAX_LENGTH as t };
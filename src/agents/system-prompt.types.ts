// Prompt rendering modes shared across system-prompt builders and config.
export type PromptMode = "full" | "minimal" | "scaffold" | "none";
export type SilentReplyPromptMode = "generic" | "none";

/** A named, self-contained section of the system prompt.
 *
 * Each section has a stable `id` (for testing/ordering) and `lines` (the
 * rendered text). Sections marked `cacheStable` belong to the cache-stable
 * prefix (before the cache boundary); others belong to the dynamic suffix.
 */
export type PromptSection = {
  id: string;
  lines: string[];
  cacheStable: boolean;
};

import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { f as resolveAgentIdFromSessionKey, u as normalizeMainKey } from "./session-key-DtTE9-Tg.js";
import { a as resolveMainSessionKey } from "./main-session-Bjm_i_Af.js";
//#region src/agents/internal-event-contract.ts
const AGENT_INTERNAL_EVENT_TYPE_TASK_COMPLETION = "task_completion";
const GENERATED_MEDIA_COMPLETION_SOURCES = /* @__PURE__ */ new Set([
	"image_generation",
	"video_generation",
	"music_generation"
]);
/** Identifies completion events that can resume an exact cron run. */
function hasGeneratedMediaCompletionEvent(events) {
	return Boolean(events?.some((event) => event.type === "task_completion" && GENERATED_MEDIA_COMPLETION_SOURCES.has(event.source)));
}
//#endregion
//#region src/agents/subagent-requester-store-key.ts
/**
* Subagent requester store-key normalization.
*
* Converts raw requester session keys into the canonical registry key shape.
*/
/** Resolve the canonical store key for a subagent requester session. */
function resolveRequesterStoreKey(cfg, requesterSessionKey) {
	const raw = (requesterSessionKey ?? "").trim();
	if (!raw) return raw;
	if (raw === "global" || raw === "unknown") return raw;
	if (raw.startsWith("agent:")) return raw;
	const mainKey = normalizeMainKey(cfg?.session?.mainKey);
	if (raw === "main" || raw === mainKey) return resolveMainSessionKey(cfg);
	return `agent:${resolveAgentIdFromSessionKey(raw, resolveDefaultAgentId(cfg))}:${raw}`;
}
//#endregion
export { AGENT_INTERNAL_EVENT_TYPE_TASK_COMPLETION as n, hasGeneratedMediaCompletionEvent as r, resolveRequesterStoreKey as t };

import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { f as resolveDefaultAgentId, i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import "./agent-scope-DyEposw2.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { t as resolveMemorySearchStaleness } from "./types-Dpy5yVLQ.js";
import { i as getActiveMemorySearchManager } from "./memory-runtime-ja-7MYoL.js";
//#region src/gateway/server-methods/memory-search.ts
const DEFAULT_MAX_RESULTS = 20;
const MAX_RESULTS = 50;
function resolveSearchMode(status) {
	const statusMode = status.custom?.searchMode;
	if (statusMode === "hybrid" || statusMode === "fts-only") return statusMode;
	return status.provider === "none" || status.vector?.enabled === false ? "fts-only" : "hybrid";
}
function resolveSearchOptions(params) {
	const rawMaxResults = params.maxResults;
	if (rawMaxResults !== void 0 && (typeof rawMaxResults !== "number" || !Number.isFinite(rawMaxResults))) return null;
	const maxResults = Math.min(MAX_RESULTS, Math.max(1, Math.floor(rawMaxResults ?? DEFAULT_MAX_RESULTS)));
	const rawMinScore = params.minScore;
	if (rawMinScore !== void 0 && (typeof rawMinScore !== "number" || !Number.isFinite(rawMinScore))) return null;
	return {
		maxResults,
		...rawMinScore === void 0 ? {} : { minScore: rawMinScore }
	};
}
function hasUsableAgentIdInput(value) {
	return normalizeAgentId(`${value}a`) !== "a";
}
/** Operator-scoped search over the active agent memory index. */
const memorySearchHandlers = { "memory.search": async ({ params, respond, context }) => {
	const record = params && typeof params === "object" ? params : {};
	const query = typeof record.query === "string" ? record.query.trim() : "";
	if (!query) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "query must be a non-empty string"));
		return;
	}
	const searchOptions = resolveSearchOptions(record);
	if (!searchOptions) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "maxResults and minScore must be finite numbers when provided"));
		return;
	}
	const cfg = context.getRuntimeConfig();
	const hasAgentId = Object.hasOwn(record, "agentId");
	if (hasAgentId && typeof record.agentId !== "string") {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "agentId must be a string"));
		return;
	}
	if (hasAgentId && !hasUsableAgentIdInput(record.agentId)) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unknown agentId"));
		return;
	}
	const requestedAgentId = hasAgentId ? normalizeAgentId(record.agentId) : null;
	if (requestedAgentId !== null && !listAgentIds(cfg).includes(requestedAgentId)) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "unknown agentId"));
		return;
	}
	const agentId = requestedAgentId ?? resolveDefaultAgentId(cfg);
	let acquired;
	try {
		acquired = await getActiveMemorySearchManager({
			cfg,
			agentId,
			purpose: "cli"
		});
	} catch (error) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `memory search unavailable: ${formatErrorMessage(error)}`));
		return;
	}
	const { manager, error: acquireError } = acquired;
	if (!manager) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, acquireError ?? "memory search unavailable"));
		return;
	}
	try {
		const results = await manager.search(query, searchOptions);
		const status = manager.status();
		respond(true, {
			agentId,
			provider: status.provider,
			searchMode: resolveSearchMode(status),
			results,
			...resolveMemorySearchStaleness(status, agentId)
		}, void 0);
	} catch (error) {
		respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `memory search failed: ${formatErrorMessage(error)}`));
	} finally {
		await manager.close?.().catch(() => {});
	}
} };
//#endregion
export { memorySearchHandlers };

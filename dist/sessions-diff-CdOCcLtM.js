import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { f as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import "./agent-scope-DyEposw2.js";
import { ur as validateSessionsDiffParams } from "./src-BSn6va4B.js";
import { C as loadSessionEntryReadOnly } from "./session-utils-row-Br8x7LNG.js";
import "./session-utils-P5pxtsqu.js";
import { r as loadCheckoutDiff, t as applySessionDiffBaseline } from "./session-diff-Uf7FrCgX.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
//#region src/gateway/server-methods/sessions-diff.ts
async function loadSessionDiff(params) {
	const empty = (unavailableReason) => ({
		sessionKey: params.sessionKey,
		files: [],
		additions: 0,
		deletions: 0,
		...unavailableReason ? { unavailableReason } : {}
	});
	const { cfg, entry, storePath, canonicalKey } = loadSessionEntryReadOnly(params.sessionKey, { agentId: params.agentId });
	if (!entry?.sessionId || !storePath) return empty("unknown_session");
	const agentId = normalizeAgentId(parseAgentSessionKey(canonicalKey)?.agentId ?? params.agentId ?? parseAgentSessionKey(params.sessionKey)?.agentId ?? resolveDefaultAgentId(cfg));
	const cwd = normalizeOptionalString(entry.spawnedCwd) ?? normalizeOptionalString(entry.spawnedWorkspaceDir) ?? normalizeOptionalString(resolveAgentWorkspaceDir(cfg, agentId));
	if (!cwd) return empty("unknown_session");
	return await applySessionDiffBaseline({
		baseline: entry.sessionDiffBaseline,
		diff: await loadCheckoutDiff({
			cwd,
			sessionKey: params.sessionKey
		}),
		sessionId: entry.sessionId
	});
}
const sessionsDiffHandlers = { "sessions.diff": async ({ params, respond }) => {
	if (!assertValidParams(params, validateSessionsDiffParams, "sessions.diff", respond)) return;
	respond(true, await loadSessionDiff(params));
} };
//#endregion
export { sessionsDiffHandlers };

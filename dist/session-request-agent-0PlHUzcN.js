import { c as normalizeOptionalString } from "./string-coerce-DW4mBlAt.js";
import { i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import { c as parseAgentSessionKey } from "./session-key-utils-02xWdGSz.js";
import "./agent-scope-DyEposw2.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { n as resolveSessionStoreAgentId, r as resolveSessionStoreKey } from "./session-store-key-DmGCpash.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
//#region src/gateway/session-request-agent.ts
function resolveRequestedSessionAgentId(cfg, key, explicitAgentId) {
	const canonicalKey = resolveSessionStoreKey({
		cfg,
		sessionKey: key
	});
	const parsed = parseAgentSessionKey(key);
	const requestedAgentId = normalizeOptionalString(explicitAgentId);
	if (requestedAgentId) {
		const agentId = normalizeAgentId(requestedAgentId);
		if (!listAgentIds(cfg).includes(agentId)) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, `Unknown agent id "${explicitAgentId}"`)
		};
		if (parsed?.agentId && normalizeAgentId(parsed.agentId) !== agentId) return {
			ok: false,
			error: errorShape(ErrorCodes.INVALID_REQUEST, "session key agent does not match agentId")
		};
		if (canonicalKey !== "global") {
			if ((parsed?.agentId ? normalizeAgentId(parsed.agentId) : normalizeAgentId(resolveSessionStoreAgentId(cfg, canonicalKey))) !== agentId) return {
				ok: false,
				error: errorShape(ErrorCodes.INVALID_REQUEST, "session key agent does not match agentId")
			};
		}
		return {
			ok: true,
			agentId
		};
	}
	if (!parsed?.agentId) return { ok: true };
	const inferredAgentId = normalizeAgentId(parsed.agentId);
	if (canonicalKey === "global" && !listAgentIds(cfg).includes(inferredAgentId)) return {
		ok: false,
		error: errorShape(ErrorCodes.INVALID_REQUEST, `Unknown agent id "${parsed.agentId}"`)
	};
	return {
		ok: true,
		agentId: canonicalKey === "global" ? inferredAgentId : void 0
	};
}
//#endregion
export { resolveRequestedSessionAgentId as t };

import { c as resolveAgentDir, f as resolveDefaultAgentId, i as listAgentIds } from "./agent-scope-config-Dusa8eSA.js";
import { n as normalizeAgentId } from "./agent-id-DDgUze4y.js";
import "./agent-scope-DyEposw2.js";
import { n as GatewayErrorDetailCodes, t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
//#region src/gateway/server-methods/model-auth-agent-scope.ts
/** Resolves model-auth RPC scope without letting explicit garbage reach the default store. */
function resolveModelAuthAgentScope(cfg, requestedAgentId) {
	const defaultAgentId = resolveDefaultAgentId(cfg);
	if (requestedAgentId === void 0 || requestedAgentId === "") return {
		ok: true,
		agentId: defaultAgentId,
		agentDir: resolveAgentDir(cfg, defaultAgentId)
	};
	if (typeof requestedAgentId !== "string") return {
		ok: false,
		agentId: requestedAgentId === null ? "null" : typeof requestedAgentId
	};
	const rawAgentId = requestedAgentId.trim();
	if (!rawAgentId) return {
		ok: false,
		agentId: requestedAgentId
	};
	const agentId = normalizeAgentId(rawAgentId);
	if (!/[A-Za-z0-9_]/u.test(rawAgentId) || !listAgentIds(cfg).includes(agentId)) return {
		ok: false,
		agentId: rawAgentId
	};
	return {
		ok: true,
		agentId,
		agentDir: resolveAgentDir(cfg, agentId)
	};
}
function unknownModelAuthAgentIdError(agentId) {
	const details = {
		code: GatewayErrorDetailCodes.UNKNOWN_AGENT_ID,
		agentId
	};
	return errorShape(ErrorCodes.INVALID_REQUEST, `unknown agent id "${agentId}"`, { details });
}
//#endregion
export { unknownModelAuthAgentIdError as n, resolveModelAuthAgentScope as t };

import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { a as resolveMainSessionKey } from "./main-session-Bjm_i_Af.js";
import { _ as isAgentHarnessSessionStoreEntryProtected, h as isAgentHarnessSessionKey, p as AGENT_HARNESS_SESSION_KEY_RESERVED_MESSAGE } from "./session-entry-slot-keys-DPRQmSpa.js";
import { nt as resolveSessionEntryAccessTarget } from "./session-accessor-D5Or7WgI.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import "./sessions-BqBqRT1f.js";
import { i as createMcpAttachGrantServerConfig, o as getActiveMcpLoopbackRuntime } from "./mcp-http.loopback-runtime-CrkkrSyL.js";
import { c as revokeAttachGrant, r as mintAttachGrant } from "./mcp-grant-store-bQkGAKnX.js";
import { n as ensureMcpLoopbackServer } from "./mcp-http-xJSI7VrG.js";
//#region src/gateway/server-methods/attach.ts
function paramRecord(params) {
	return params && typeof params === "object" ? params : {};
}
function readString(params, key) {
	const value = params[key];
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function readPositiveNumber(params, key) {
	const value = params[key];
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
}
const attachHandlers = {
	"attach.grant": async ({ params, respond, context }) => {
		const grantParams = paramRecord(params);
		const cfg = context.getRuntimeConfig();
		const sessionKey = readString(grantParams, "sessionKey") ?? resolveMainSessionKey(cfg);
		const harnessEntry = isAgentHarnessSessionKey(sessionKey) ? resolveSessionEntryAccessTarget({
			cfg,
			sessionKey
		}).entry : void 0;
		if (isAgentHarnessSessionKey(sessionKey) && (!harnessEntry || isAgentHarnessSessionStoreEntryProtected(sessionKey, harnessEntry))) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, AGENT_HARNESS_SESSION_KEY_RESERVED_MESSAGE));
			return;
		}
		await ensureMcpLoopbackServer();
		const runtime = getActiveMcpLoopbackRuntime();
		if (!runtime) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "mcp loopback server unavailable"));
			return;
		}
		const grant = mintAttachGrant({
			sessionKey,
			ttlMs: readPositiveNumber(grantParams, "ttlMs")
		});
		respond(true, {
			sessionKey: grant.sessionKey,
			token: grant.token,
			expiresAtMs: grant.expiresAtMs,
			mcpConfig: createMcpAttachGrantServerConfig(runtime.port),
			env: { OPENCLAW_MCP_TOKEN: grant.token }
		});
	},
	"attach.revoke": async ({ params, respond }) => {
		const token = readString(paramRecord(params), "token");
		if (!token) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "token is required"));
			return;
		}
		respond(true, { revoked: revokeAttachGrant(token) });
	}
};
//#endregion
export { attachHandlers };

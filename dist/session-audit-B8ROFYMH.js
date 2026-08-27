import { t as SessionManager } from "./session-manager-dOl3u7vE.js";
//#region src/gateway/server-methods/session-audit.ts
async function appendSessionAudit(params) {
	const identity = {
		agentId: params.target.agentId,
		sessionId: params.target.entry.sessionId,
		storePath: params.target.storePath
	};
	SessionManager.open({
		...identity,
		sessionKey: params.target.sessionKey
	}).appendMessage({
		role: "custom",
		customType: "openclaw.system-note",
		content: `System note: ${params.text}`,
		display: true,
		timestamp: params.now
	}, { config: params.cfg });
}
//#endregion
export { appendSessionAudit as t };

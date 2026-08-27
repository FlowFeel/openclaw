import { n as resolveAcpSessionCwd } from "./session-identifiers-BmbqiGBi.js";
import { g as resolveSessionAgentId } from "./agent-scope-DyEposw2.js";
import { l as resolveStorePath } from "./paths-DSnYpBD3.js";
import { ct as loadSqliteSessionEntryReadOnly } from "./session-accessor.sqlite-B9iW7DOt.js";
import "./session-accessor-t3qUoTeV.js";
import "./sessions-CBo4LOdS.js";
import { l as persistAcpTurnTranscript } from "./attempt-execution-DWE9KsgY.js";
//#region src/auto-reply/reply/dispatch-acp-transcript.runtime.ts
async function persistAcpDispatchTranscript(params) {
	const promptText = params.promptText.trim();
	const finalText = params.finalText.trim();
	if (!promptText && !finalText) return;
	const sessionAgentId = resolveSessionAgentId({
		sessionKey: params.sessionKey,
		config: params.cfg
	});
	const storePath = resolveStorePath(params.cfg.session?.store, { agentId: sessionAgentId });
	const sessionEntry = loadSqliteSessionEntryReadOnly({
		agentId: sessionAgentId,
		sessionKey: params.sessionKey,
		storePath
	});
	const sessionId = sessionEntry?.sessionId;
	if (!sessionId) throw new Error(`unknown ACP session key: ${params.sessionKey}`);
	await persistAcpTurnTranscript({
		body: promptText,
		transcriptBody: promptText,
		finalText,
		sessionId,
		sessionKey: params.sessionKey,
		sessionEntry,
		storePath,
		sessionAgentId,
		threadId: params.threadId,
		sessionCwd: resolveAcpSessionCwd(params.meta) ?? process.cwd(),
		config: params.cfg
	});
}
//#endregion
export { persistAcpDispatchTranscript };

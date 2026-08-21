import { lt as patchSqliteSessionEntry } from "./session-accessor.sqlite-B9iW7DOt.js";
import "./session-accessor-t3qUoTeV.js";
import { n as captureSessionDiffBaseline } from "./session-diff-cqMjNo0t.js";
//#region src/sessions/session-diff-baseline.ts
async function ensureSessionDiffBaseline(params) {
	if (!params.isNewSession || params.entry.execNode || !params.force && params.entry.createdVia !== "operator" || params.entry.sessionDiffBaseline?.sessionId === params.entry.sessionId) return params.entry;
	const baseline = await captureSessionDiffBaseline({
		cwd: params.cwd,
		sessionId: params.entry.sessionId
	});
	if (!baseline) return params.entry;
	return await patchSqliteSessionEntry({
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, (current) => {
		if (current.sessionId !== params.entry.sessionId || current.sessionDiffBaseline?.sessionId === current.sessionId) return null;
		return { sessionDiffBaseline: baseline };
	}, {
		preserveActivity: true,
		skipMaintenance: true
	}) ?? params.entry;
}
//#endregion
export { ensureSessionDiffBaseline as t };

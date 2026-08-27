import { n as loadCombinedSessionStoreForGateway } from "./combined-store-gateway-Dl7qKsCA.js";
import { A as resolveGatewaySessionStoreTargetWithStore, E as resolveCanonicalSessionEntryFromStoreKeys } from "./session-utils-row-BDvhdN3C.js";
import "./session-utils-C8yYh4dv.js";
import { n as resolveSessionIdMatchSelection } from "./session-id-resolution-joL8CTWk.js";
//#region src/gateway/worker-environments/session-target.ts
function resolveWorkerSessionTarget(cfg, sessionId) {
	const { store } = loadCombinedSessionStoreForGateway(cfg);
	const selection = resolveSessionIdMatchSelection(Object.entries(store).filter(([, entry]) => entry.sessionId === sessionId), sessionId);
	if (selection.kind !== "selected") return;
	const target = resolveGatewaySessionStoreTargetWithStore({
		cfg,
		key: selection.sessionKey,
		clone: false
	});
	const entry = resolveCanonicalSessionEntryFromStoreKeys(target.store, target.storeKeys);
	if (!entry || entry.sessionId !== sessionId) return;
	return {
		agentId: target.agentId,
		sessionEntry: entry,
		sessionId,
		sessionKey: target.canonicalKey,
		sessionStore: target.store,
		storePath: target.storePath
	};
}
//#endregion
export { resolveWorkerSessionTarget as t };

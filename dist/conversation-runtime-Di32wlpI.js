import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import "./session-binding-service-DW9rA35s.js";
import "./conversation-binding-BSvU9WdK.js";
import "./thread-bindings-policy-BelzGFdH.js";
import "./session-QL7UzAqR.js";
import "./pairing-store-CTy8U4zO.js";
import "./binding-routing-B5DqVIPE.js";
import "./pairing-labels-R-yvKazG.js";
import "./channel-access-compat-_yLjhtIU.js";
//#region src/channels/session-meta.ts
const loadInboundSessionRuntime = createLazyRuntimeModule(() => import("./inbound.runtime.js"));
/**
* Best-effort inbound session metadata recorder for channel plugin command handlers.
*/
async function recordInboundSessionMetaSafe(params) {
	const runtime = await loadInboundSessionRuntime();
	const storePath = runtime.resolveStorePath(params.cfg.session?.store, { agentId: params.agentId });
	try {
		await runtime.recordInboundSessionMeta({
			storePath,
			sessionKey: params.sessionKey,
			ctx: params.ctx
		});
	} catch (err) {
		params.onError?.(err);
	}
}
//#endregion
export { recordInboundSessionMetaSafe as t };

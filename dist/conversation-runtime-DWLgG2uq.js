import { r as createLazyRuntimeModule } from "./lazy-runtime-CgCh8H_K.js";
import "./session-binding-service-DfYoR_Na.js";
import "./conversation-binding-BN-i7DFo.js";
import "./thread-bindings-policy-CcUvShLy.js";
import "./session-CxHg5vX_.js";
import "./pairing-store-CNA_dhgo.js";
import "./binding-routing-BKaLXZp2.js";
import "./pairing-labels-CjVfUEDU.js";
import "./channel-access-compat-vDjpRctF.js";
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

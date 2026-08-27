import { f as resolveDefaultAgentId } from "./agent-scope-config-Dusa8eSA.js";
import { r as getRuntimeConfig } from "./io-DCw4R0kD.js";
import { a as wrapExternalContent } from "./external-content-NkkZExk2.js";
import { a as requestHeartbeat } from "./heartbeat-wake-T9cP7M4q.js";
import { a as enqueueSystemEvent } from "./system-events-fsxpbPNB.js";
import { t as resolveMainSessionKeyFromConfig } from "./main-session.runtime.js";
import "./heartbeat-runtime-Bd9Ge4qp.js";
import "./system-event-runtime-BCFyeOjW.js";
import "./agent-runtime-CVIwE66V.js";
import "./security-runtime-Dk7rUwxb.js";
import "./sdk-config-B_RuUtWS.js";
//#region extensions/browser/src/browser/extension-relay/page-share.ts
const PAGE_SHARE_GATEWAY_REQUIRED_ERROR = "Send to OpenClaw needs the extension relay hosted by the Gateway (pair on the Gateway host or use direct Gateway pairing). Node-hosted relays are not supported yet.";
let pageShareSink = null;
function setPageShareSink(sink) {
	pageShareSink = sink;
}
function createGatewayPageShareSink() {
	return {
		enqueueSystemEvent,
		requestHeartbeat,
		resolveDefaultAgentId: () => resolveDefaultAgentId(getRuntimeConfig()),
		resolveMainSessionKey: resolveMainSessionKeyFromConfig
	};
}
async function deliverPageShare(payload) {
	const sink = pageShareSink;
	if (!sink) throw new Error(PAGE_SHARE_GATEWAY_REQUIRED_ERROR);
	const note = payload.note?.trim();
	const body = payload.selection?.trim() || payload.content;
	const wrapped = wrapExternalContent(`Title: ${payload.title}\nURL: ${payload.url}\n\n${body}`, { source: "browser" });
	const text = `${["Page shared from the OpenClaw Chrome extension.", ...note ? [`Note: ${note}`] : []].join("\n")}\n\n${wrapped}`;
	const sessionKey = sink.resolveMainSessionKey();
	await sink.enqueueSystemEvent(text, { sessionKey });
	await sink.requestHeartbeat({
		source: "notifications-event",
		intent: "immediate",
		reason: "wake",
		...sessionKey === "global" ? { agentId: sink.resolveDefaultAgentId() } : {},
		sessionKey,
		heartbeat: { target: "last" }
	});
}
//#endregion
export { setPageShareSink as i, createGatewayPageShareSink as n, deliverPageShare as r, PAGE_SHARE_GATEWAY_REQUIRED_ERROR as t };

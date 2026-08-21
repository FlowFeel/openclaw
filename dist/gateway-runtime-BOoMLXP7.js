import "./net-B22ilI8B.js";
import "./auth-uTW579rj.js";
import "./client-D7lmiXfo.js";
import "./node-command-policy-DdvZ7E6j.js";
import "./startup-auth-CC1KE9pL.js";
import "./gateway-rpc-DDZpjK7K.js";
import "./hosted-plugin-surface-url-CxgeghKS.js";
import "./plugin-node-capability-9V7uhGk6.js";
import "./nodes.helpers-Dm-FYJFz.js";
//#region src/gateway/channel-status-patches.ts
/** Creates a connected-channel status patch with matching connection/event timestamps. */
function createConnectedChannelStatusPatch(at = Date.now()) {
	return {
		connected: true,
		lastConnectedAt: at,
		lastEventAt: at
	};
}
/** Creates a transport-activity patch for health/activity monitors. */
function createTransportActivityStatusPatch(at = Date.now()) {
	return { lastTransportActivityAt: at };
}
function channelReadyPatch(extras = {}) {
	return Object.assign({
		running: true,
		connected: true,
		lifecycle: "ready",
		lastConnectedAt: Date.now(),
		lastError: null,
		terminalDisconnect: void 0
	}, extras);
}
function channelBlockedPatch(lastError, extras = {}) {
	return Object.assign({
		lifecycle: "blocked",
		terminalDisconnect: true,
		lastError
	}, extras);
}
function channelStoppedPatch(extras = {}) {
	return Object.assign({
		running: false,
		connected: false,
		lifecycle: "stopped"
	}, extras);
}
//#endregion
//#region src/plugin-sdk/gateway-runtime.ts
async function resolveAdvertisedLanHost() {
	return await (await import("./advertised-lan-host-BM1GMrsw.js")).resolveAdvertisedLanHost();
}
//#endregion
export { createConnectedChannelStatusPatch as a, channelStoppedPatch as i, channelBlockedPatch as n, createTransportActivityStatusPatch as o, channelReadyPatch as r, resolveAdvertisedLanHost as t };

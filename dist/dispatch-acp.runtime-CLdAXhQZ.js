import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.js";
//#region src/auto-reply/reply/dispatch-acp.runtime.ts
const dispatchAcpLoader = createLazyImportLoader(() => import("./dispatch-acp-mxsNQG3L.js"));
const dispatchAcpCommandBypassLoader = createLazyImportLoader(() => import("./dispatch-acp-command-bypass-D8CR9IRb.js"));
function loadDispatchAcp() {
	return dispatchAcpLoader.load();
}
function loadDispatchAcpCommandBypass() {
	return dispatchAcpCommandBypassLoader.load();
}
async function shouldBypassAcpDispatchForCommand(...args) {
	return (await loadDispatchAcpCommandBypass()).shouldBypassAcpDispatchForCommand(...args);
}
async function tryDispatchAcpReply(...args) {
	return await (await loadDispatchAcp()).tryDispatchAcpReply(...args);
}
//#endregion
export { shouldBypassAcpDispatchForCommand, tryDispatchAcpReply };

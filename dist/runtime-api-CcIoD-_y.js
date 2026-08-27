import "./reply-payload-BE_j43tQ.js";
import "./runtime-group-policy-BRGT6eE6.js";
import "./ssrf-runtime-B8V5-MiN.js";
import "./channel-inbound-Bmn0gdZ_.js";
import "./channel-outbound-O2_4qIiZ.js";
import "./channel-pairing-BTpKky3B.js";
import { t as createPluginRuntimeStore } from "./runtime-store-CjjjpvHZ.js";
//#region extensions/nextcloud-talk/src/runtime.ts
const { setRuntime: setNextcloudTalkRuntime, getRuntime: getNextcloudTalkRuntime } = createPluginRuntimeStore({
	pluginId: "nextcloud-talk",
	errorMessage: "Nextcloud Talk runtime not initialized"
});
//#endregion
export { setNextcloudTalkRuntime as n, getNextcloudTalkRuntime as t };

import "./reply-payload-BE_j43tQ.js";
import "./runtime-group-policy-BRGT6eE6.js";
import "./ssrf-runtime-BKWYxujx.js";
import "./channel-inbound-DgZwCM1p.js";
import "./channel-outbound-sjGCUxtt.js";
import "./channel-pairing-SZNlxp28.js";
import { t as createPluginRuntimeStore } from "./runtime-store-CjjjpvHZ.js";
//#region extensions/nextcloud-talk/src/runtime.ts
const { setRuntime: setNextcloudTalkRuntime, getRuntime: getNextcloudTalkRuntime } = createPluginRuntimeStore({
	pluginId: "nextcloud-talk",
	errorMessage: "Nextcloud Talk runtime not initialized"
});
//#endregion
export { setNextcloudTalkRuntime as n, getNextcloudTalkRuntime as t };

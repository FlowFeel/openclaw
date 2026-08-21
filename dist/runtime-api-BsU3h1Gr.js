import "./runtime-group-policy-BRGT6eE6.js";
import "./ssrf-runtime-BKWYxujx.js";
import "./text-chunking-nhEIGrpB.js";
import "./dangerous-name-runtime-bZgfEkHY.js";
import "./channel-status-DC6xsPE6.js";
import "./channel-actions-BcF0YtO7.js";
import "./channel-feedback-B2A1ElKG.js";
import "./channel-inbound-DgZwCM1p.js";
import "./channel-outbound-sjGCUxtt.js";
import "./channel-pairing-SZNlxp28.js";
import { t as createPluginRuntimeStore } from "./runtime-store-CjjjpvHZ.js";
import "./webhook-request-guards-cY_xufKf.js";
import "./webhook-ingress-CNHkUY93.js";
import "./webhook-targets-B3Re0cee.js";
import "./config-api-CEe8GrUJ.js";
//#region extensions/googlechat/src/runtime.ts
const { setRuntime: setGoogleChatRuntime, getRuntime: getGoogleChatRuntime } = createPluginRuntimeStore({
	pluginId: "googlechat",
	errorMessage: "Google Chat runtime not initialized"
});
//#endregion
export { setGoogleChatRuntime as n, getGoogleChatRuntime as t };

import "./runtime-group-policy-BRGT6eE6.js";
import "./ssrf-runtime-B8V5-MiN.js";
import "./text-chunking-nhEIGrpB.js";
import "./dangerous-name-runtime-bZgfEkHY.js";
import "./channel-status-DC6xsPE6.js";
import "./channel-actions-BCwQOL9z.js";
import "./channel-feedback-Doflo_AK.js";
import "./channel-inbound-D6qLGAVX.js";
import "./channel-outbound-UFYVcsBJ.js";
import "./channel-pairing-CbPqurzb.js";
import { t as createPluginRuntimeStore } from "./runtime-store-CjjjpvHZ.js";
import "./webhook-request-guards-CgiiFJiC.js";
import "./webhook-ingress-CJfLVwIg.js";
import "./webhook-targets-BB4Snwn9.js";
import "./config-api-CoLxU9fb.js";
//#region extensions/googlechat/src/runtime.ts
const { setRuntime: setGoogleChatRuntime, getRuntime: getGoogleChatRuntime } = createPluginRuntimeStore({
	pluginId: "googlechat",
	errorMessage: "Google Chat runtime not initialized"
});
//#endregion
export { setGoogleChatRuntime as n, getGoogleChatRuntime as t };

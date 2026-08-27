import { t as transcribeFirstAudio$1 } from "./media-runtime-BSg_PCVr.js";
import { n as sendDurableMessageBatch$1 } from "./channel-outbound-O2_4qIiZ.js";
//#region extensions/matrix/src/matrix/monitor/preflight-audio.runtime.ts
async function transcribeFirstAudio(...args) {
	return await transcribeFirstAudio$1(...args);
}
async function sendDurableMessageBatch(...args) {
	return await sendDurableMessageBatch$1(...args);
}
//#endregion
export { sendDurableMessageBatch, transcribeFirstAudio };

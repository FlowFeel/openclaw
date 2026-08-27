import { n as readConfigMachineState } from "./config-machine-state-C97R6LG-.js";
import { l as mimeTypeFromFilePath } from "./mime-Ir6g3Vae.js";
import { r as assertSecretOwnerAvailable } from "./runtime-degraded-state-V0p9ck6P.js";
import { u as saveMediaBuffer } from "./store-BDR50q7S.js";
import { r as resolveGeneratedMediaMaxBytes } from "./configured-max-bytes-DnjCdIxf.js";
import { x as setTtsMachinePrefsPathResolver } from "./tts-settings-Cim3tOQK.js";
import { S as setSpeechRuntimeAvailabilityGuard, u as maybeApplyTtsToPayload$1, y as textToSpeech$1 } from "./runtime-api-CViYHuub.js";
//#region src/tts/tts-audio-store.ts
const TTS_MEDIA_SUBDIR = "tool-speech-synthesis";
const persistTtsAudioToMediaStore = async ({ audioBuffer, cfg, fileExtension }) => {
	const originalFilename = `voice${fileExtension}`;
	return (await saveMediaBuffer(audioBuffer, mimeTypeFromFilePath(originalFilename), TTS_MEDIA_SUBDIR, resolveGeneratedMediaMaxBytes(cfg, "audio"), originalFilename)).path;
};
//#endregion
//#region src/tts/tts.ts
/** Public TTS runtime barrel exposed to core callers and plugin SDK facades. */
setSpeechRuntimeAvailabilityGuard(() => {
	assertSecretOwnerAvailable("capability", "tts");
});
setTtsMachinePrefsPathResolver(() => readConfigMachineState("tts.prefsPath"));
function textToSpeech(params) {
	return textToSpeech$1(params, persistTtsAudioToMediaStore);
}
function maybeApplyTtsToPayload(params) {
	return maybeApplyTtsToPayload$1(params, persistTtsAudioToMediaStore);
}
//#endregion
export { textToSpeech as n, maybeApplyTtsToPayload as t };

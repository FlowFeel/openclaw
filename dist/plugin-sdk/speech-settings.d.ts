import { Z as TtsAutoMode } from "../types.openclaw-DqdTE9e3.js";
import { F as resolveEffectiveTtsConfig, M as ResolvedTtsConfig, N as ResolvedTtsModelOverrides, P as TtsConfigResolutionContext } from "../types-CWvW31qx.js";
import { t as normalizeSpeechProviderId } from "../provider-registry-core-C5BT067W.js";

//#region src/tts/tts-auto-mode.d.ts
/** Normalize an unknown value into a supported TTS auto mode. */
declare function normalizeTtsAutoMode(value: unknown): TtsAutoMode | undefined;
//#endregion
export { type ResolvedTtsConfig, type ResolvedTtsModelOverrides, type TtsConfigResolutionContext, normalizeSpeechProviderId, normalizeTtsAutoMode, resolveEffectiveTtsConfig };
import { Z as TtsAutoMode } from "../types.openclaw-DqdTE9e3.js";
import { F as resolveEffectiveTtsConfig, M as ResolvedTtsConfig, N as ResolvedTtsModelOverrides, P as TtsConfigResolutionContext } from "../types-CR0scl6B.js";
import { t as normalizeSpeechProviderId } from "../provider-registry-core-Bz1BSMYo.js";

//#region src/tts/tts-auto-mode.d.ts
/** Normalize an unknown value into a supported TTS auto mode. */
declare function normalizeTtsAutoMode(value: unknown): TtsAutoMode | undefined;
//#endregion
export { type ResolvedTtsConfig, type ResolvedTtsModelOverrides, type TtsConfigResolutionContext, normalizeSpeechProviderId, normalizeTtsAutoMode, resolveEffectiveTtsConfig };
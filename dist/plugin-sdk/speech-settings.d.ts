import { Z as TtsAutoMode } from "../types.openclaw-BwKjboya.js";
import { F as resolveEffectiveTtsConfig, M as ResolvedTtsConfig, N as ResolvedTtsModelOverrides, P as TtsConfigResolutionContext } from "../types-CtE8kx2y.js";
import { t as normalizeSpeechProviderId } from "../provider-registry-core-D1WlC_pj.js";

//#region src/tts/tts-auto-mode.d.ts
/** Normalize an unknown value into a supported TTS auto mode. */
declare function normalizeTtsAutoMode(value: unknown): TtsAutoMode | undefined;
//#endregion
export { type ResolvedTtsConfig, type ResolvedTtsModelOverrides, type TtsConfigResolutionContext, normalizeSpeechProviderId, normalizeTtsAutoMode, resolveEffectiveTtsConfig };
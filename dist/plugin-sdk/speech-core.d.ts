import { _t as normalizeOptionalString } from "../types.openclaw-B4JlK2kd.js";
import { At as SpeechSynthesisStreamResult, Ct as SpeechProviderPrepareSynthesisContext, Dt as SpeechProviderResolveTalkOverridesContext, Et as SpeechProviderResolveTalkConfigContext, Ft as TtsDirectiveParseResult, Mt as SpeechTelephonySynthesisRequest, Nt as SpeechVoiceOption, Ot as SpeechSynthesisRequest, Pt as TtsDirectiveOverrides, St as SpeechProviderOverrides, Tt as SpeechProviderResolveConfigContext, _ as SpeechProviderPlugin, _t as SpeechListVoicesRequest, bt as SpeechProviderConfiguredContext, dt as ResolvedTtsConfig, ft as ResolvedTtsModelOverrides, gt as SpeechDirectiveTokenParseResult, ht as SpeechDirectiveTokenParseContext, jt as SpeechSynthesisTarget, kt as SpeechSynthesisStreamRequest, mt as resolveEffectiveTtsConfig, pt as TtsConfigResolutionContext, vt as SpeechModelOverridePolicy, wt as SpeechProviderPreparedSynthesis, yt as SpeechProviderConfig } from "../types-fxGJj6Ov.js";
import { a as resolveSpeechProviderApiKey, c as normalizeTtsAutoMode, i as requireInRange, l as asBoolean, n as normalizeLanguageCode, o as scheduleCleanup, r as normalizeSeed, s as TTS_AUTO_MODES, t as normalizeApplyTextNormalization } from "../tts-provider-helpers-B-IRXTyc.js";
import { o as asFiniteNumber } from "../number-coercion-Bp6kiesx.js";
import { a as createProviderHttpError, c as formatProviderErrorPayload, g as truncateErrorDetail, h as readResponseTextLimited, l as formatProviderHttpErrorMessage, o as extractProviderErrorDetail, r as assertOkOrThrowProviderError, s as extractProviderRequestId, t as asObject } from "../provider-http-errors-BRTprv2_.js";
import { t as summarizeText } from "../tts-core-CY752uMl.js";
import { a as normalizeSpeechProviderId, i as listSpeechProviders, n as getSpeechProvider, o as parseTtsDirectives, r as listLoadedSpeechProviders, t as canonicalizeSpeechProviderId } from "../provider-registry-BXYh740Q.js";

//#region src/tts/directive-number.d.ts
/** Numeric directive parsing shared by speech providers with bounded knobs. */
type DirectiveNumberRange = {
  min?: number;
  max?: number;
  minExclusive?: boolean;
  maxExclusive?: boolean;
};
/** Parse a numeric speech directive token and return provider overrides when policy allows it. */
declare function parseSpeechDirectiveNumberOverride(params: {
  ctx: SpeechDirectiveTokenParseContext;
  overrideKey: string;
  range: DirectiveNumberRange;
  warning: (value: string) => string;
  mergeCurrentOverrides?: boolean;
}): SpeechDirectiveTokenParseResult;
//#endregion
export { type ResolvedTtsConfig, type ResolvedTtsModelOverrides, type SpeechDirectiveTokenParseContext, type SpeechDirectiveTokenParseResult, type SpeechListVoicesRequest, type SpeechModelOverridePolicy, type SpeechProviderConfig, type SpeechProviderConfiguredContext, type SpeechProviderOverrides, type SpeechProviderPlugin, type SpeechProviderPrepareSynthesisContext, type SpeechProviderPreparedSynthesis, type SpeechProviderResolveConfigContext, type SpeechProviderResolveTalkConfigContext, type SpeechProviderResolveTalkOverridesContext, type SpeechSynthesisRequest, type SpeechSynthesisStreamRequest, type SpeechSynthesisStreamResult, type SpeechSynthesisTarget, type SpeechTelephonySynthesisRequest, type SpeechVoiceOption, TTS_AUTO_MODES, type TtsConfigResolutionContext, type TtsDirectiveOverrides, type TtsDirectiveParseResult, asBoolean, asFiniteNumber, asObject, assertOkOrThrowProviderError, canonicalizeSpeechProviderId, createProviderHttpError, extractProviderErrorDetail, extractProviderRequestId, formatProviderErrorPayload, formatProviderHttpErrorMessage, getSpeechProvider, listLoadedSpeechProviders, listSpeechProviders, normalizeApplyTextNormalization, normalizeLanguageCode, normalizeSeed, normalizeSpeechProviderId, normalizeTtsAutoMode, parseSpeechDirectiveNumberOverride, parseTtsDirectives, readResponseTextLimited, requireInRange, resolveEffectiveTtsConfig, resolveSpeechProviderApiKey, scheduleCleanup, summarizeText, normalizeOptionalString as trimToUndefined, truncateErrorDetail };
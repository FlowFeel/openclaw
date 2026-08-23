import { _t as normalizeOptionalString } from "../types.openclaw-B-6RRL7F.js";
import { At as SpeechSynthesisStreamResult, Ct as SpeechProviderPrepareSynthesisContext, Dt as SpeechProviderResolveTalkOverridesContext, Et as SpeechProviderResolveTalkConfigContext, Ft as TtsDirectiveParseResult, Mt as SpeechTelephonySynthesisRequest, Nt as SpeechVoiceOption, Ot as SpeechSynthesisRequest, Pt as TtsDirectiveOverrides, St as SpeechProviderOverrides, Tt as SpeechProviderResolveConfigContext, _ as SpeechProviderPlugin, _t as SpeechListVoicesRequest, bt as SpeechProviderConfiguredContext, gt as SpeechDirectiveTokenParseResult, ht as SpeechDirectiveTokenParseContext, jt as SpeechSynthesisTarget, kt as SpeechSynthesisStreamRequest, vt as SpeechModelOverridePolicy, wt as SpeechProviderPreparedSynthesis, yt as SpeechProviderConfig } from "../types-dPYYJRo2.js";
import { c as normalizeTtsAutoMode, i as requireInRange, l as asBoolean, n as normalizeLanguageCode, o as scheduleCleanup, r as normalizeSeed, s as TTS_AUTO_MODES, t as normalizeApplyTextNormalization } from "../tts-provider-helpers-DrqXIZGv.js";
import { o as asFiniteNumber } from "../number-coercion-Bp6kiesx.js";
import { a as createProviderHttpError, c as formatProviderErrorPayload, g as truncateErrorDetail, h as readResponseTextLimited, l as formatProviderHttpErrorMessage, o as extractProviderErrorDetail, r as assertOkOrThrowProviderError, s as extractProviderRequestId, t as asObject } from "../provider-http-errors-BRTprv2_.js";
import { a as normalizeSpeechProviderId, i as listSpeechProviders, n as getSpeechProvider, o as parseTtsDirectives, t as canonicalizeSpeechProviderId } from "../provider-registry-DBQrzrR_.js";

//#region src/tts/openai-compatible-speech-provider.d.ts
type OpenAiCompatibleSpeechProviderBaseConfig = {
  apiKey?: string;
  baseUrl?: string;
  model: string;
  voice: string;
  speed?: number;
  responseFormat?: string;
};
/** Normalized config shape for OpenAI-compatible speech HTTP providers. */
type OpenAiCompatibleSpeechProviderConfig<ExtraConfig extends Record<string, unknown> = Record<string, never>> = OpenAiCompatibleSpeechProviderBaseConfig & ExtraConfig;
/** Base URL normalization policy for providers that share OpenAI-style endpoints. */
type OpenAiCompatibleSpeechProviderBaseUrlPolicy = {
  kind: "trim-trailing-slash";
} | {
  kind: "canonical";
  aliases?: readonly string[];
  allowCustom?: boolean;
};
/** Extra config field to forward into the JSON body under an optional request key. */
type OpenAiCompatibleSpeechProviderExtraJsonBodyField<ExtraConfig extends Record<string, unknown>> = {
  configKey: Extract<keyof ExtraConfig, string>;
  requestKey?: string;
};
/** Factory options for a speech provider backed by /audio/speech-compatible HTTP APIs. */
type OpenAiCompatibleSpeechProviderOptions<ExtraConfig extends Record<string, unknown> = Record<string, never>> = {
  id: string;
  label: string;
  autoSelectOrder: number;
  models: readonly string[];
  voices: readonly string[];
  defaultModel: string;
  defaultVoice: string;
  defaultBaseUrl: string;
  envKey: string;
  responseFormats: readonly string[];
  defaultResponseFormat: string;
  voiceCompatibleResponseFormats: readonly string[];
  baseUrlPolicy?: OpenAiCompatibleSpeechProviderBaseUrlPolicy;
  normalizeModel?: (value: string | undefined, fallback: string) => string;
  configKey?: string;
  extraHeaders?: Record<string, string>;
  readExtraConfig?: (raw: Record<string, unknown> | undefined) => ExtraConfig;
  extraJsonBodyFields?: readonly OpenAiCompatibleSpeechProviderExtraJsonBodyField<ExtraConfig>[];
  apiErrorLabel?: string;
  missingApiKeyError?: string;
};
/** Build a complete SpeechProviderPlugin for OpenAI-compatible speech endpoints. */
declare function createOpenAiCompatibleSpeechProvider<ExtraConfig extends Record<string, unknown> = Record<string, never>>(options: OpenAiCompatibleSpeechProviderOptions<ExtraConfig>): SpeechProviderPlugin;
//#endregion
export { type OpenAiCompatibleSpeechProviderBaseUrlPolicy, type OpenAiCompatibleSpeechProviderConfig, type OpenAiCompatibleSpeechProviderExtraJsonBodyField, type OpenAiCompatibleSpeechProviderOptions, type SpeechDirectiveTokenParseContext, type SpeechDirectiveTokenParseResult, type SpeechListVoicesRequest, type SpeechModelOverridePolicy, type SpeechProviderConfig, type SpeechProviderConfiguredContext, type SpeechProviderOverrides, type SpeechProviderPlugin, type SpeechProviderPrepareSynthesisContext, type SpeechProviderPreparedSynthesis, type SpeechProviderResolveConfigContext, type SpeechProviderResolveTalkConfigContext, type SpeechProviderResolveTalkOverridesContext, type SpeechSynthesisRequest, type SpeechSynthesisStreamRequest, type SpeechSynthesisStreamResult, type SpeechSynthesisTarget, type SpeechTelephonySynthesisRequest, type SpeechVoiceOption, TTS_AUTO_MODES, type TtsDirectiveOverrides, type TtsDirectiveParseResult, asBoolean, asFiniteNumber, asObject, assertOkOrThrowProviderError, canonicalizeSpeechProviderId, createOpenAiCompatibleSpeechProvider, createProviderHttpError, extractProviderErrorDetail, extractProviderRequestId, formatProviderErrorPayload, formatProviderHttpErrorMessage, getSpeechProvider, listSpeechProviders, normalizeApplyTextNormalization, normalizeLanguageCode, normalizeSeed, normalizeSpeechProviderId, normalizeTtsAutoMode, parseTtsDirectives, readResponseTextLimited, requireInRange, scheduleCleanup, normalizeOptionalString as trimToUndefined, truncateErrorDetail };
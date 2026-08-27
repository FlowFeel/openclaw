import { p as ReplyPayload } from "../types-KopZMiGd.js";
import { $ as ResolvedTtsPersona, et as TtsAutoMode, it as TtsProvider, n as OpenClawConfig, rt as TtsModelOverrideConfig } from "../types.openclaw-B4JlK2kd.js";
import { Ft as TtsDirectiveParseResult, Nt as SpeechVoiceOption, Pt as TtsDirectiveOverrides, dt as ResolvedTtsConfig, ft as ResolvedTtsModelOverrides, pt as TtsConfigResolutionContext, yt as SpeechProviderConfig } from "../types-fxGJj6Ov.js";
import { c as TtsAutoSchema, d as TtsProviderSchema, l as TtsConfigSchema, u as TtsModeSchema } from "../zod-schema.core-ZmPpppU-.js";
import { t as summarizeText } from "../tts-core-CY752uMl.js";
import { o as parseTtsDirectives } from "../provider-registry-BXYh740Q.js";

//#region src/tts/tts-runtime-types.d.ts
type TtsAttemptReasonCode = "success" | "no_provider_registered" | "not_configured" | "unsupported_for_streaming" | "unsupported_for_telephony" | "timeout" | "provider_error";
type TtsProviderAttempt = {
  provider: string;
  outcome: "success" | "skipped" | "failed";
  reasonCode: TtsAttemptReasonCode;
  persona?: string;
  personaBinding?: "applied" | "missing" | "none";
  latencyMs?: number;
  error?: string;
};
type TtsResult = {
  success: boolean;
  audioPath?: string;
  error?: string;
  latencyMs?: number;
  provider?: string;
  persona?: string;
  fallbackFrom?: string;
  attemptedProviders?: string[];
  attempts?: TtsProviderAttempt[];
  outputFormat?: string;
  voiceCompatible?: boolean;
  audioAsVoice?: boolean;
  target?: "audio-file" | "voice-note";
};
type TtsSynthesisResult = {
  success: boolean;
  audioBuffer?: Buffer;
  error?: string;
  latencyMs?: number;
  provider?: string;
  providerModel?: string;
  providerVoice?: string;
  persona?: string;
  fallbackFrom?: string;
  attemptedProviders?: string[];
  attempts?: TtsProviderAttempt[];
  outputFormat?: string;
  voiceCompatible?: boolean;
  fileExtension?: string;
  target?: "audio-file" | "voice-note";
};
type TtsStreamResult = {
  success: boolean;
  audioStream?: ReadableStream<Uint8Array>;
  error?: string;
  latencyMs?: number;
  provider?: string;
  providerModel?: string;
  providerVoice?: string;
  persona?: string;
  fallbackFrom?: string;
  attemptedProviders?: string[];
  attempts?: TtsProviderAttempt[];
  outputFormat?: string;
  voiceCompatible?: boolean;
  fileExtension?: string;
  target?: "audio-file" | "voice-note";
  release?: () => Promise<void>;
};
type TtsSynthesisStreamResult = TtsStreamResult;
type TtsTelephonyResult = {
  success: boolean;
  audioBuffer?: Buffer;
  error?: string;
  latencyMs?: number;
  provider?: string;
  providerModel?: string;
  providerVoice?: string;
  persona?: string;
  fallbackFrom?: string;
  attemptedProviders?: string[];
  attempts?: TtsProviderAttempt[];
  outputFormat?: string;
  sampleRate?: number;
};
type TtsStatusEntry = {
  timestamp: number;
  success: boolean;
  textLength: number;
  summarized: boolean;
  provider?: string;
  persona?: string;
  fallbackFrom?: string;
  attemptedProviders?: string[];
  attempts?: TtsProviderAttempt[];
  latencyMs?: number;
  error?: string;
};
//#endregion
//#region src/tts/tts-settings.d.ts
declare function resolveModelOverridePolicy(overrides: TtsModelOverrideConfig | undefined): ResolvedTtsModelOverrides;
declare function resolveTtsConfig(cfgInput: OpenClawConfig, contextOrAgentId?: string | TtsConfigResolutionContext): ResolvedTtsConfig;
declare function resolveTtsPrefsPath(config: ResolvedTtsConfig): string;
declare function resolveTtsAutoMode(params: {
  config: ResolvedTtsConfig;
  prefsPath: string;
  sessionAuto?: string;
}): TtsAutoMode;
declare function buildTtsSystemPromptHint(cfg: OpenClawConfig, agentId?: string): string | undefined;
declare function isTtsEnabled(config: ResolvedTtsConfig, prefsPath: string, sessionAuto?: string): boolean;
declare function getTtsPersona(config: ResolvedTtsConfig, prefsPath: string): ResolvedTtsPersona | undefined;
declare function listTtsPersonas(config: ResolvedTtsConfig): ResolvedTtsPersona[];
declare function getTtsMaxLength(prefsPath: string): number;
declare function isSummarizationEnabled(prefsPath: string): boolean;
//#endregion
//#region src/tts/tts-synthesis.d.ts
type TtsAudioPersistence = (params: {
  audioBuffer: Buffer;
  cfg: OpenClawConfig;
  fileExtension: string;
  outputFormat?: string;
}) => Promise<string>;
declare function supportsNativeVoiceNoteTts(channel: string | undefined): boolean;
declare function supportsTranscodedVoiceNoteTts(channel: string | undefined): boolean;
declare function resolveTtsSynthesisTarget(channel: string | undefined): "audio-file" | "voice-note";
declare function shouldDeliverTtsAsVoice(params: {
  channel: string | undefined;
  target: "audio-file" | "voice-note" | undefined;
  voiceCompatible: boolean | undefined;
  fileExtension?: string;
  outputFormat?: string;
}): boolean;
declare function textToSpeech$1(params: {
  text: string;
  cfg: OpenClawConfig;
  prefsPath?: string;
  channel?: string;
  overrides?: TtsDirectiveOverrides;
  disableFallback?: boolean;
  timeoutMs?: number;
  agentId?: string;
  accountId?: string;
}, persistTtsAudio: TtsAudioPersistence): Promise<TtsResult>;
declare function synthesizeSpeech(params: {
  text: string;
  cfg: OpenClawConfig;
  prefsPath?: string;
  channel?: string;
  overrides?: TtsDirectiveOverrides;
  disableFallback?: boolean;
  timeoutMs?: number;
  agentId?: string;
  accountId?: string;
}): Promise<TtsSynthesisResult>;
//#endregion
//#region src/tts/tts-payload.d.ts
declare function getLastTtsAttempt(): TtsStatusEntry | undefined;
declare function setLastTtsAttempt(entry: TtsStatusEntry | undefined): void;
declare function listSpeechVoices(params: {
  provider: string;
  cfg?: OpenClawConfig;
  config?: ResolvedTtsConfig;
  apiKey?: string;
  baseUrl?: string;
}): Promise<SpeechVoiceOption[]>;
declare function maybeApplyTtsToPayload$1(params: {
  payload: ReplyPayload;
  cfg: OpenClawConfig;
  channel?: string;
  kind?: "tool" | "block" | "final";
  inboundAudio?: boolean;
  ttsAuto?: string;
  agentId?: string;
  accountId?: string;
}, persistTtsAudio: TtsAudioPersistence): Promise<ReplyPayload>;
//#endregion
//#region src/tts/tts-provider-resolution.d.ts
declare function getResolvedSpeechProviderConfig(config: ResolvedTtsConfig, providerId: string, cfg?: OpenClawConfig): SpeechProviderConfig;
declare function resolveTtsProviderOrder(primary: TtsProvider, cfg?: OpenClawConfig): TtsProvider[];
declare function isTtsProviderConfigured(config: ResolvedTtsConfig, provider: TtsProvider, cfg?: OpenClawConfig): boolean;
//#endregion
//#region src/tts/tts-synthesis-support.d.ts
declare function formatTtsProviderError(provider: TtsProvider, err: unknown): string;
declare function sanitizeTtsErrorForLog(err: unknown): string;
//#endregion
//#region src/tts/tts-settings-writes.d.ts
declare function setTtsAutoMode(prefsPath: string, mode: TtsAutoMode): void;
declare function setTtsEnabled(prefsPath: string, enabled: boolean): void;
declare function setTtsPersona(prefsPath: string, persona: string | null | undefined): void;
declare function setTtsProvider(prefsPath: string, provider: TtsProvider): void;
declare function setTtsMaxLength(prefsPath: string, maxLength: number): void;
declare function setSummarizationEnabled(prefsPath: string, enabled: boolean): void;
//#endregion
//#region src/tts/tts-request.d.ts
declare function resolveExplicitTtsOverrides(params: {
  cfg: OpenClawConfig;
  prefsPath?: string;
  provider?: string;
  modelId?: string;
  voiceId?: string;
  agentId?: string;
  channelId?: string;
  accountId?: string;
}): TtsDirectiveOverrides;
//#endregion
//#region src/tts/tts-streaming.d.ts
declare function streamSpeech(params: {
  text: string;
  cfg: OpenClawConfig;
  prefsPath?: string;
  channel?: string;
  overrides?: TtsDirectiveOverrides;
  disableFallback?: boolean;
  timeoutMs?: number;
  agentId?: string;
  accountId?: string;
}): Promise<TtsSynthesisStreamResult>;
declare function textToSpeechStream(params: {
  text: string;
  cfg: OpenClawConfig;
  prefsPath?: string;
  channel?: string;
  overrides?: TtsDirectiveOverrides;
  disableFallback?: boolean;
  timeoutMs?: number;
  agentId?: string;
  accountId?: string;
}): Promise<TtsStreamResult>;
//#endregion
//#region src/tts/tts-telephony.d.ts
declare function textToSpeechTelephony(params: {
  text: string;
  cfg: OpenClawConfig;
  prefsPath?: string;
  overrides?: TtsDirectiveOverrides;
  timeoutMs?: number;
}): Promise<TtsTelephonyResult>;
//#endregion
//#region src/tts/runtime-api.d.ts
declare function getTtsProvider(config: ResolvedTtsConfig, prefsPath: string): TtsProvider;
declare const testApi: {
  parseTtsDirectives: typeof parseTtsDirectives;
  resolveModelOverridePolicy: typeof resolveModelOverridePolicy;
  supportsNativeVoiceNoteTts: typeof supportsNativeVoiceNoteTts;
  supportsTranscodedVoiceNoteTts: typeof supportsTranscodedVoiceNoteTts;
  resolveTtsSynthesisTarget: typeof resolveTtsSynthesisTarget;
  shouldDeliverTtsAsVoice: typeof shouldDeliverTtsAsVoice;
  summarizeText: typeof summarizeText;
  getResolvedSpeechProviderConfig: typeof getResolvedSpeechProviderConfig;
  formatTtsProviderError: typeof formatTtsProviderError;
  sanitizeTtsErrorForLog: typeof sanitizeTtsErrorForLog;
};
//#endregion
//#region src/tts/tts.d.ts
declare function textToSpeech(params: Parameters<typeof textToSpeech$1>[0]): Promise<TtsResult>;
declare function maybeApplyTtsToPayload(params: Parameters<typeof maybeApplyTtsToPayload$1>[0]): Promise<ReplyPayload>;
//#endregion
//#region src/plugin-sdk/tts-runtime.d.ts
/** Compatibility no-op retained for callers that prewarm facade runtimes generically. */
declare function prewarmTtsRuntimeFacade(): void;
//#endregion
export { type ResolvedTtsConfig, type ResolvedTtsModelOverrides, TtsAutoSchema, TtsConfigSchema, type TtsDirectiveOverrides, type TtsDirectiveParseResult, TtsModeSchema, TtsProviderSchema, type TtsResult, type TtsStreamResult, type TtsSynthesisResult, type TtsSynthesisStreamResult, type TtsTelephonyResult, testApi as _test, testApi, buildTtsSystemPromptHint, getLastTtsAttempt, getResolvedSpeechProviderConfig, getTtsMaxLength, getTtsPersona, getTtsProvider, isSummarizationEnabled, isTtsEnabled, isTtsProviderConfigured, listSpeechVoices, listTtsPersonas, maybeApplyTtsToPayload, prewarmTtsRuntimeFacade, resolveExplicitTtsOverrides, resolveTtsAutoMode, resolveTtsConfig, resolveTtsPrefsPath, resolveTtsProviderOrder, setLastTtsAttempt, setSummarizationEnabled, setTtsAutoMode, setTtsEnabled, setTtsMaxLength, setTtsPersona, setTtsProvider, streamSpeech, synthesizeSpeech, textToSpeech, textToSpeechStream, textToSpeechTelephony };
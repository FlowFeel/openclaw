import { Pt as resolveTranscriptsConfig, n as OpenClawConfig } from "../types.openclaw-B4JlK2kd.js";
import { a as TranscriptSourceLocator, c as TranscriptStartRequest, d as TranscriptsStartResult, f as TranscriptsStopResult, i as TranscriptSourceKind, l as TranscriptStopRequest, n as TranscriptParticipant, o as TranscriptSourceProvider, r as TranscriptSessionDescriptor, s as TranscriptSourceStatus, t as TranscriptImportRequest, u as TranscriptUtterance } from "../provider-types-DsYmYsth.js";

//#region src/transcripts/provider-registry.d.ts
/**
 * Transcript source provider registry.
 *
 * Transcript providers are plugin capability providers; this module exposes
 * canonical/alias lookup through the shared capability runtime.
 */
/** Normalize transcript source provider ids for registry lookup. */
declare function normalizeTranscriptSourceProviderId(providerId: string | undefined): string | undefined;
/** List canonical transcript source providers for a config snapshot. */
declare function listTranscriptSourceProviders(cfg?: OpenClawConfig): TranscriptSourceProvider[];
/** Resolve a transcript provider by canonical id or alias. */
declare function getTranscriptSourceProvider(providerId: string | undefined, cfg?: OpenClawConfig): TranscriptSourceProvider | undefined;
//#endregion
//#region src/meeting-bot/transcripts-bridge.d.ts
type MeetingTranscriptSourceRuntime = {
  startTranscriptSource(request: TranscriptStartRequest): Promise<TranscriptsStartResult>;
  stopTranscriptSource(request: TranscriptStopRequest): Promise<TranscriptsStopResult>;
};
declare function createMeetingTranscriptSourceProvider(params: {
  id: string;
  aliases?: readonly string[];
  name: string;
  runtime: () => Promise<MeetingTranscriptSourceRuntime>;
}): TranscriptSourceProvider;
//#endregion
export { type MeetingTranscriptSourceRuntime, type TranscriptImportRequest, type TranscriptParticipant, type TranscriptSessionDescriptor, type TranscriptSourceKind, type TranscriptSourceLocator, type TranscriptSourceProvider, type TranscriptSourceStatus, type TranscriptStartRequest, type TranscriptStopRequest, type TranscriptUtterance, type TranscriptsStartResult, type TranscriptsStopResult, createMeetingTranscriptSourceProvider, getTranscriptSourceProvider, listTranscriptSourceProviders, normalizeTranscriptSourceProviderId, resolveTranscriptsConfig };
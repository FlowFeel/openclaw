import { n as OpenClawConfig } from "../types.openclaw-B-6RRL7F.js";
import { G as RealtimeTranscriptionSession, H as RealtimeTranscriptionProviderConfiguredContext, K as RealtimeTranscriptionSessionCallbacks, U as RealtimeTranscriptionProviderId, V as RealtimeTranscriptionProviderConfig, W as RealtimeTranscriptionProviderResolveConfigContext, h as RealtimeTranscriptionProviderPlugin, q as RealtimeTranscriptionSessionCreateRequest } from "../types-DdUyjaEr.js";

//#region src/realtime-transcription/provider-registry.d.ts
declare function normalizeRealtimeTranscriptionProviderId(providerId: string | undefined): RealtimeTranscriptionProviderId | undefined;
/** Lists canonical realtime transcription providers for the active config. */
declare function listRealtimeTranscriptionProviders(cfg?: OpenClawConfig): RealtimeTranscriptionProviderPlugin[];
/** Resolves a realtime transcription provider by id or alias. */
declare function getRealtimeTranscriptionProvider(providerId: string | undefined, cfg?: OpenClawConfig): RealtimeTranscriptionProviderPlugin | undefined;
/** Canonicalizes a configured provider id while preserving unknown ids. */
declare function canonicalizeRealtimeTranscriptionProviderId(providerId: string | undefined, cfg?: OpenClawConfig): RealtimeTranscriptionProviderId | undefined;
//#endregion
//#region src/realtime-transcription/websocket-session.d.ts
type RealtimeTranscriptionWebSocketTransport = {
  readonly callbacks: RealtimeTranscriptionSessionCallbacks;
  closeNow(): void;
  failConnect(error: Error): void;
  isOpen(): boolean;
  isReady(): boolean;
  markReady(): void;
  sendBinary(payload: Buffer): boolean;
  sendJson(payload: unknown): boolean;
};
/** Provider-specific hooks for creating a websocket transcription session. */
type RealtimeTranscriptionWebSocketSessionOptions<Event = unknown> = {
  callbacks: RealtimeTranscriptionSessionCallbacks;
  connectClosedBeforeReadyMessage?: string;
  connectTimeoutMessage?: string;
  connectTimeoutMs?: number;
  closeTimeoutMs?: number;
  headers?: Record<string, string> | (() => Record<string, string> | Promise<Record<string, string>>);
  maxQueuedBytes?: number;
  maxReconnectAttempts?: number;
  onClose?: (transport: RealtimeTranscriptionWebSocketTransport) => void;
  onMessage?: (event: Event, transport: RealtimeTranscriptionWebSocketTransport) => void;
  onOpen?: (transport: RealtimeTranscriptionWebSocketTransport) => void;
  parseMessage?: (payload: Buffer) => Event;
  providerId: string;
  readyOnOpen?: boolean;
  reconnectDelayMs?: number;
  reconnectLimitMessage?: string;
  sendAudio: (audio: Buffer, transport: RealtimeTranscriptionWebSocketTransport) => void;
  url: string | (() => string | Promise<string>);
};
/** Creates a reusable websocket session wrapper for a provider implementation. */
declare function createRealtimeTranscriptionWebSocketSession<Event = unknown>(options: RealtimeTranscriptionWebSocketSessionOptions<Event>): RealtimeTranscriptionSession;
//#endregion
export { type RealtimeTranscriptionProviderConfig, type RealtimeTranscriptionProviderConfiguredContext, type RealtimeTranscriptionProviderId, type RealtimeTranscriptionProviderPlugin, type RealtimeTranscriptionProviderResolveConfigContext, type RealtimeTranscriptionSession, type RealtimeTranscriptionSessionCallbacks, type RealtimeTranscriptionSessionCreateRequest, type RealtimeTranscriptionWebSocketSessionOptions, type RealtimeTranscriptionWebSocketTransport, canonicalizeRealtimeTranscriptionProviderId, createRealtimeTranscriptionWebSocketSession, getRealtimeTranscriptionProvider, listRealtimeTranscriptionProviders, normalizeRealtimeTranscriptionProviderId };
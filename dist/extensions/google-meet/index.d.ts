import { t as OpenClawPluginDefinition } from "../../types-7SOOE25U.js";
import { _t as GatewayClientMode, vt as GatewayClientName } from "../../setup-wizard-types-C896ZHgy.js";
import { r as OperatorScope } from "../../types.public-CDX1pJx5.js";
import { i as OpenClawPluginDefinition$1, r as OpenClawPluginConfigSchema } from "../../plugin-entry-D7C-ld89.js";
import { IncomingMessage } from "node:http";
import { Command } from "commander";

//#region src/infra/device-identity-store.d.ts
type DeviceIdentity = {
  deviceId: string;
  publicKeyPem: string;
  privateKeyPem: string;
};
//#endregion
//#region src/cli/gateway-rpc.types.d.ts
/** Common gateway RPC flags accepted by direct gateway command helpers. */
type GatewayRpcOpts = {
  url?: string;
  token?: string;
  password?: string;
  timeout?: string;
  expectFinal?: boolean;
  json?: boolean;
};
//#endregion
//#region src/cli/gateway-rpc.d.ts
declare function callGatewayFromCli(method: string, opts: GatewayRpcOpts, params?: unknown, extra?: {
  clientName?: GatewayClientName;
  mode?: GatewayClientMode;
  deviceIdentity?: DeviceIdentity | null;
  signal?: AbortSignal;
  expectFinal?: boolean;
  progress?: boolean;
  scopes?: OperatorScope[];
}): Promise<Record<string, unknown>>;
//#endregion
//#region src/talk/agent-consult-tool.d.ts
/** Closed policy set controlling whether the consult tool is exposed. */
declare const REALTIME_VOICE_AGENT_CONSULT_TOOL_POLICIES: readonly ["safe-read-only", "owner", "none"];
/** Tool exposure policy for the shared realtime voice consult tool. */
type RealtimeVoiceAgentConsultToolPolicy = (typeof REALTIME_VOICE_AGENT_CONSULT_TOOL_POLICIES)[number];
//#endregion
//#region extensions/google-meet/src/config.d.ts
type GoogleMeetTransport = "chrome" | "chrome-node" | "twilio";
type GoogleMeetMode = "agent" | "bidi" | "transcribe";
type GoogleMeetRealtimeStrategy = "agent" | "bidi";
type GoogleMeetChromeAudioFormat = "pcm16-24khz" | "g711-ulaw-8khz";
type GoogleMeetToolPolicy = RealtimeVoiceAgentConsultToolPolicy;
type GoogleMeetConfig = {
  enabled: boolean;
  defaults: {
    meeting?: string;
  };
  preview: {
    enrollmentAcknowledged: boolean;
  };
  defaultTransport: GoogleMeetTransport;
  defaultMode: GoogleMeetMode;
  chrome: {
    audioBackend: "blackhole-2ch";
    audioFormat: GoogleMeetChromeAudioFormat;
    audioBufferBytes: number;
    launch: boolean;
    browserProfile?: string;
    guestName: string;
    reuseExistingTab: boolean;
    autoJoin: boolean;
    joinTimeoutMs: number;
    waitForInCallMs: number;
    audioInputCommand?: string[];
    audioOutputCommand?: string[];
    bargeInInputCommand?: string[];
    bargeInRmsThreshold: number;
    bargeInPeakThreshold: number;
    bargeInCooldownMs: number;
    audioBridgeCommand?: string[];
    audioBridgeHealthCommand?: string[];
  };
  chromeNode: {
    node?: string;
  };
  twilio: {
    defaultDialInNumber?: string;
    defaultPin?: string;
    defaultDtmfSequence?: string;
  };
  voiceCall: {
    enabled: boolean;
    gatewayUrl?: string;
    token?: string;
    requestTimeoutMs: number;
    dtmfDelayMs: number;
    postDtmfSpeechDelayMs: number;
    introMessage?: string;
  };
  realtime: {
    strategy: GoogleMeetRealtimeStrategy;
    provider?: string;
    transcriptionProvider?: string;
    voiceProvider?: string;
    model?: string;
    instructions?: string;
    introMessage?: string;
    agentId?: string;
    toolPolicy: GoogleMeetToolPolicy;
    providers: Record<string, Record<string, unknown>>;
  };
  oauth: {
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
    accessToken?: string;
    expiresAt?: number;
  };
  auth: {
    provider: "google-oauth";
    clientId?: string;
    clientSecret?: string;
    tokenPath?: string;
  };
};
declare function resolveGoogleMeetGatewayOperationTimeoutMs(config: GoogleMeetConfig): number;
//#endregion
//#region extensions/google-meet/src/plugin-helpers.d.ts
declare const testing: {
  setCallGatewayFromCliForTests(next?: typeof callGatewayFromCli): void;
  setPlatformForTests(next?: () => NodeJS.Platform): void;
  isGoogleMeetAgentToolActionUnsupportedOnHost: typeof isGoogleMeetAgentToolActionUnsupportedOnHost;
  resolveGoogleMeetGatewayOperationTimeoutMs: typeof resolveGoogleMeetGatewayOperationTimeoutMs;
};
declare function isGoogleMeetAgentToolActionUnsupportedOnHost(params: {
  config: GoogleMeetConfig;
  raw: Record<string, unknown>;
  platform?: NodeJS.Platform;
}): boolean;
//#endregion
//#region extensions/google-meet/index.d.ts
declare const _default: {
  id: string;
  name: string;
  description: string;
  configSchema: OpenClawPluginConfigSchema;
  register: NonNullable<OpenClawPluginDefinition$1["register"]>;
} & Pick<OpenClawPluginDefinition, "kind" | "reload" | "nodeHostCommands" | "securityAuditCollectors">;
//#endregion
export { testing as __testing, testing, _default as default };
import { c as GatewayProtocolRequestOptions, s as GatewayProtocolRequestError } from "./protocol-client-U142L0j3.mjs";
import { ErrorShape, EventFrame, HelloOk } from "@openclaw/gateway-protocol/frame-guards";
import { GatewayClientMode, GatewayClientName } from "@openclaw/gateway-protocol/client-info";

//#region packages/gateway-client/src/client.d.ts
type DeviceIdentity = {
  deviceId: string;
  privateKeyPem: string;
  publicKeyPem: string;
};
type DeviceAuthTokenRecord = {
  token?: string;
  scopes?: string[];
};
type GatewayClientHostDeps = {
  loadOrCreateDeviceIdentity?: () => DeviceIdentity | undefined;
  signDevicePayload?: (privateKeyPem: string, payload: string) => string;
  publicKeyRawBase64UrlFromPem?: (publicKeyPem: string) => string;
  loadDeviceAuthToken?: (params: {
    deviceId: string;
    role: string;
    env?: NodeJS.ProcessEnv;
  }) => DeviceAuthTokenRecord | null;
  storeDeviceAuthToken?: (params: {
    deviceId: string;
    role: string;
    token: string;
    scopes: string[];
    env?: NodeJS.ProcessEnv;
  }) => void;
  clearDeviceAuthToken?: (params: {
    deviceId: string;
    role: string;
    env?: NodeJS.ProcessEnv;
  }) => void;
  beforeConnect?: () => void;
  registerGatewayLoopbackBypass?: (url: string) => (() => void) | undefined;
  logDebug?: (message: string) => void;
  logError?: (message: string) => void;
  redactForLog?: (message: string) => string;
  normalizeTlsFingerprint?: (fingerprint: string | undefined) => string;
};
type GatewayClientRequestOptions = GatewayProtocolRequestOptions;
type GatewayReconnectPausedInfo = {
  code: number;
  reason: string;
  detailCode: string | null;
};
type GatewayClientCloseInfo = {
  phase: "pre-hello" | "post-hello";
  socketOpened: boolean;
  transportValidated: boolean;
  transientPreHelloCleanClose: boolean;
};
declare class GatewayClientRequestError extends GatewayProtocolRequestError {
  constructor(error: Partial<ErrorShape>);
}
declare class GatewayClientRequestTimeoutError extends Error {
  readonly method: string;
  readonly timeoutMs: number;
  readonly requestSent: boolean;
  constructor(params: {
    method: string;
    timeoutMs: number;
    requestSent: boolean;
  });
}
declare function isGatewayConnectAssemblyError(value: unknown): value is Error;
type GatewayClientOptions = {
  url?: string;
  origin?: string;
  connectChallengeTimeoutMs?: number;
  /**
   * Server-side pre-auth handshake budget. Config-derived local clients use
   * this to keep the connect-challenge watchdog aligned with the gateway.
   */
  preauthHandshakeTimeoutMs?: number;
  tickWatchMinIntervalMs?: number;
  tickWatchTimeoutMs?: number;
  requestTimeoutMs?: number;
  token?: string;
  bootstrapToken?: string;
  deviceToken?: string;
  password?: string;
  approvalRuntimeToken?: string;
  agentRuntimeIdentityToken?: string;
  instanceId?: string;
  clientName?: GatewayClientName;
  clientDisplayName?: string;
  clientVersion?: string;
  platform?: string;
  deviceFamily?: string;
  mode?: GatewayClientMode;
  role?: string;
  scopes?: string[];
  caps?: string[];
  commands?: string[];
  permissions?: Record<string, boolean>;
  pathEnv?: string;
  env?: NodeJS.ProcessEnv;
  deviceIdentity?: DeviceIdentity | null;
  hostDeps?: GatewayClientHostDeps;
  minProtocol?: number;
  maxProtocol?: number;
  tlsFingerprint?: string;
  onEvent?: (evt: EventFrame) => void;
  onHelloOk?: (hello: HelloOk) => void;
  onConnectError?: (err: Error) => void;
  onReconnectPaused?: (info: GatewayReconnectPausedInfo) => void;
  onClose?: (code: number, reason: string, info?: GatewayClientCloseInfo) => void;
  onGap?: (info: {
    expected: number;
    received: number;
  }) => void;
};
type GatewayClientConnectionMetadata = {
  clientName?: GatewayClientName;
  hasDeviceIdentity: boolean;
  mode?: GatewayClientMode;
  preauthHandshakeTimeoutMs?: number;
};
declare class GatewayClient {
  private readonly protocol;
  private ws;
  private opts;
  private deps;
  private stopped;
  private pendingDeviceTokenRetry;
  private deviceTokenRetryBudgetUsed;
  private approvalRuntimeTokenCompatibilityDisabled;
  private approvalRuntimeTokenRetryBudgetUsed;
  private lastTick;
  private tickIntervalMs;
  private tickTimer;
  private readonly requestTimeoutMs;
  private pendingStop;
  private transportValidated;
  private suppressedTransientPreHelloCleanCloses;
  constructor(opts: GatewayClientOptions);
  getConnectionMetadata(): GatewayClientConnectionMetadata;
  updateNodeManifest(manifest: {
    caps: string[];
    commands: string[];
  }): void;
  start(): void;
  private createSocket;
  stop(): void;
  stopAndWait(opts?: {
    timeoutMs?: number;
  }): Promise<void>;
  private beginStop;
  private createPendingStop;
  private resolvePendingStop;
  private logDebug;
  private logError;
  private assembleConnectParams;
  private buildDeviceConnectParams;
  private handleConnectHello;
  private handleConnectRequestFailure;
  private resolveClose;
  private closeInfo;
  private clearStaleDeviceTokenForClose;
  private notifyConnectError;
  private notifyReconnectPaused;
  private shouldRetryWithoutApprovalRuntimeToken;
  private shouldFailClosedForUnsupportedAgentRuntimeIdentity;
  private isTrustedDeviceRetryEndpoint;
  private selectConnectAuth;
  private startTickWatch;
  private validateTlsFingerprint;
  request<T = Record<string, unknown>>(method: string, params?: unknown, opts?: GatewayClientRequestOptions): Promise<T>;
}
//#endregion
//#region packages/gateway-client/src/event-loop-ready.d.ts
/** Readiness probe outcome with timing data for diagnosing event-loop stalls. */
type EventLoopReadyResult = {
  ready: boolean;
  elapsedMs: number;
  maxDriftMs: number;
  checks: number;
  aborted: boolean;
};
/** Controls how aggressively the client waits for low-drift timer checks before starting IO. */
type EventLoopReadyOptions = {
  maxWaitMs?: number;
  intervalMs?: number;
  driftThresholdMs?: number;
  consecutiveReadyChecks?: number;
  signal?: AbortSignal;
};
/** Waits until timer drift stays low for consecutive checks, or aborts/times out. */
declare function waitForEventLoopReady(options?: EventLoopReadyOptions): Promise<EventLoopReadyResult>;
//#endregion
//#region packages/gateway-client/src/readiness.d.ts
type GatewayClientStartable = {
  start(): void;
};
/** Injectable readiness waiter used by tests and alternate event-loop probes. */
type EventLoopReadyWaiter = (options?: EventLoopReadyOptions) => Promise<EventLoopReadyResult>;
/** Timeout and abort controls for delaying client start until the loop can process IO. */
type GatewayClientStartReadinessOptions = {
  timeoutMs?: number;
  clientOptions?: Pick<GatewayClientOptions, "connectChallengeTimeoutMs" | "env" | "preauthHandshakeTimeoutMs">;
  signal?: AbortSignal;
};
/** Starts a gateway client only after the supplied readiness probe succeeds. */
declare function startGatewayClientWithReadinessWait(waitForReady: EventLoopReadyWaiter, client: GatewayClientStartable, options?: GatewayClientStartReadinessOptions): Promise<EventLoopReadyResult>;
/** Starts a gateway client after the default event-loop readiness probe succeeds. */
declare function startGatewayClientWhenEventLoopReady(client: GatewayClientStartable, options?: GatewayClientStartReadinessOptions): Promise<EventLoopReadyResult>;
//#endregion
export { GatewayClientRequestOptions as _, startGatewayClientWithReadinessWait as a, isGatewayConnectAssemblyError as b, waitForEventLoopReady as c, GatewayClient as d, GatewayClientCloseInfo as f, GatewayClientRequestError as g, GatewayClientOptions as h, startGatewayClientWhenEventLoopReady as i, DeviceAuthTokenRecord as l, GatewayClientHostDeps as m, GatewayClientStartReadinessOptions as n, EventLoopReadyOptions as o, GatewayClientConnectionMetadata as p, GatewayClientStartable as r, EventLoopReadyResult as s, EventLoopReadyWaiter as t, DeviceIdentity as u, GatewayClientRequestTimeoutError as v, GatewayReconnectPausedInfo as y };
import { ConnectParams, HelloOk } from "@openclaw/gateway-protocol";

//#region packages/gateway-client/src/device-auth.d.ts
declare function normalizeDeviceMetadataForAuth(value?: string | null): string;
type DeviceAuthPayloadParams = {
  deviceId: string;
  clientId: string;
  clientMode: string;
  role: string;
  scopes: string[];
  signedAtMs: number;
  token?: string | null;
  nonce: string;
};
type DeviceAuthPayloadV3Params = DeviceAuthPayloadParams & {
  platform?: string | null;
  deviceFamily?: string | null;
};
declare function buildDeviceAuthPayload(params: DeviceAuthPayloadParams): string;
declare function buildDeviceAuthPayloadV3(params: DeviceAuthPayloadV3Params): string;
//#endregion
//#region packages/gateway-client/src/connect-auth.d.ts
type GatewayConnectAuthSelection = {
  authToken?: string;
  authBootstrapToken?: string;
  authDeviceToken?: string;
  authPassword?: string;
  authApprovalRuntimeToken?: string;
  authAgentRuntimeIdentityToken?: string;
  signatureToken?: string;
  resolvedDeviceToken?: string;
  storedToken?: string;
  storedScopes?: string[];
  usingStoredDeviceToken?: boolean;
};
declare function selectGatewayConnectAuth(params: {
  token?: string;
  bootstrapToken?: string;
  deviceToken?: string;
  password?: string;
  approvalRuntimeToken?: string;
  agentRuntimeIdentityToken?: string;
  storedToken?: string;
  storedScopes?: string[];
  pendingDeviceTokenRetry?: boolean;
  trustedDeviceTokenRetry?: boolean;
  preferBootstrapToken?: boolean;
}): GatewayConnectAuthSelection;
declare function buildGatewayConnectAuth(selected: GatewayConnectAuthSelection): ConnectParams["auth"];
declare function resolveGatewayConnectScopes(params: {
  requestedScopes?: string[];
  usingStoredDeviceToken?: boolean;
  storedScopes?: string[];
  defaultScopes: readonly string[];
}): string[];
declare function shouldRetryGatewayWithDeviceToken(params: {
  retryBudgetUsed: boolean;
  currentDeviceToken?: string;
  explicitToken?: string;
  storedToken?: string;
  trustedEndpoint: boolean;
  canRetryWithDeviceTokenHint?: boolean;
  errorDetails?: unknown;
}): boolean;
//#endregion
//#region packages/gateway-client/src/browser-device-auth.d.ts
type GatewayBrowserDeviceIdentity = {
  deviceId: string;
  publicKey: string;
  sign: (payload: string) => Promise<string>;
};
type GatewayBrowserDeviceTokenRecord = {
  token: string;
  scopes: string[];
};
type MaybePromise<T> = T | Promise<T>;
type GatewayBrowserDeviceTokenStore = {
  load: (params: {
    clientId: string;
    deviceId: string;
    role: string;
  }) => MaybePromise<GatewayBrowserDeviceTokenRecord | null>;
  store: (params: {
    clientId: string;
    deviceId: string;
    role: string;
    token: string;
    scopes: string[];
  }) => MaybePromise<void>;
  clear: (params: {
    clientId: string;
    deviceId: string;
    role: string;
  }) => MaybePromise<void>;
};
type GatewayBrowserDeviceAuthPlan = {
  clientId: string;
  role: string;
  identity: GatewayBrowserDeviceIdentity | null;
  selectedAuth: GatewayConnectAuthSelection;
  scopes: string[];
  device?: NonNullable<ConnectParams["device"]>;
  auth?: ConnectParams["auth"];
};
/** Browser-safe device pairing and issued-token lifecycle shared by first-party UI clients. */
declare class GatewayBrowserDeviceAuthLifecycle {
  private readonly deps;
  constructor(deps: {
    loadIdentity: () => Promise<GatewayBrowserDeviceIdentity | null>;
    tokenStore: GatewayBrowserDeviceTokenStore;
    nowMs?: () => number;
  });
  buildPlan(params: {
    client: ConnectParams["client"];
    role: string;
    defaultScopes: readonly string[];
    bootstrapScopes?: readonly string[];
    token?: string;
    bootstrapToken?: string;
    password?: string;
    pendingDeviceTokenRetry?: boolean;
    trustedDeviceTokenRetry?: boolean;
    preferBootstrapToken?: boolean;
    nonce: string | null;
    challengeTs?: number | null;
  }): Promise<GatewayBrowserDeviceAuthPlan>;
  acceptHello(hello: Pick<HelloOk, "auth">, plan: GatewayBrowserDeviceAuthPlan): Promise<void>;
  clearStoredToken(plan: GatewayBrowserDeviceAuthPlan): Promise<void>;
}
//#endregion
//#region packages/gateway-client/src/session-projection.d.ts
/** Browser-safe identity and replay rules shared by Gateway conversation clients. */
type SessionMessageEnvelope = {
  messageId?: unknown;
  messageSeq?: unknown;
  clientRunId?: unknown;
  runId?: unknown;
  idempotencyKey?: unknown;
};
type SessionMessageIdentity = {
  role: string;
  id: string | null;
  sequence: number | null;
  idempotencyKey: string | null;
  runId: string | null;
  isImported: boolean;
  externalSource: string | null;
};
type SessionProjectionScope = {
  sessionKey?: string;
  sessionId?: string;
  agentId?: string;
  lifecycleRevision?: number | string;
  activeLeafEntryId?: string | null;
};
type SessionProjectionSnapshotOptions = {
  shouldIncludeMessage?: (message: unknown) => boolean;
};
type SessionProjectionRunStatus = "streaming" | "completed" | "error" | "aborted" | "timeout" | "yielded";
type SessionProjectionRun = {
  runId: string;
  status: SessionProjectionRunStatus;
  message?: unknown;
  acceptedFinalMessageIdentities?: readonly string[];
  stopReason?: string;
  errorKind?: string;
  errorMessage?: string;
};
type SessionProjectionGatewayRunEvent = {
  state?: unknown;
  yielded?: unknown;
} & Partial<Record<"runId" | "message" | "stopReason" | "errorKind" | "errorMessage", unknown>>;
type SessionProjectionRunTransition = {
  projection: SessionProjectionState;
  previousRun: SessionProjectionRun | undefined;
  currentRun: SessionProjectionRun | undefined;
};
type SessionProjectionEntry = {
  message: unknown;
  identity: SessionMessageIdentity | null;
  live: boolean;
  pending: boolean;
  pendingRunId: string | null;
};
type SessionProjectionState = {
  scope: SessionProjectionScope;
  entries: readonly SessionProjectionEntry[];
  messages: readonly unknown[];
  runs: Readonly<Record<string, SessionProjectionRun>>;
  hasTransportGap: boolean;
};
type ScopedSessionProjectionEvent = SessionProjectionScope & {
  scope?: SessionProjectionScope;
};
type SessionProjectionEvent = ScopedSessionProjectionEvent & ({
  type: "snapshotLoaded";
  messages: readonly unknown[];
  options?: SessionProjectionSnapshotOptions;
} | ({
  type: "messagePersisted";
  message: unknown;
  envelope?: SessionMessageEnvelope;
} & SessionMessageEnvelope) | {
  type: "sendPending";
  message: unknown;
  runId?: string;
  idempotencyKey?: string;
} | {
  type: "sendAcknowledged";
  runId?: string;
  idempotencyKey?: string;
  previousRunId?: string;
} | {
  type: "sendFailed";
  runId: string;
} | {
  type: "runDelta";
  runId: string;
  message?: unknown;
} | (Omit<SessionProjectionRun, "acceptedFinalMessageIdentities"> & {
  type: "runTerminal";
  status: Exclude<SessionProjectionRunStatus, "streaming">;
}) | {
  type: "sessionReset";
} | {
  type: "transportGap";
} | {
  type: "reconnected";
});
/** History and status markers carry transcript order even when they have no chat role. */
declare function readSessionMessageSequence(message: unknown, envelope?: SessionMessageEnvelope): number | null;
/** Run ownership normalizes a user-turn suffix without changing its persisted send key. */
declare function normalizeSessionProjectionRunId(value: unknown): string | null;
/** Persisted transcript facts win over envelope projections and provider-local import IDs. */
declare function readSessionMessageIdentity(message: unknown, envelope?: SessionMessageEnvelope): SessionMessageIdentity | null;
/** Local turns have no durable transcript metadata beyond their own optional send key. */
declare function isLocallyOptimisticSessionMessage(message: unknown): boolean;
declare function createSessionProjection(scope?: SessionProjectionScope, messages?: readonly unknown[]): SessionProjectionState;
declare function projectLiveSessionMessage(state: SessionProjectionState, message: unknown, envelope?: SessionMessageEnvelope, scope?: SessionProjectionScope): SessionProjectionState;
/** Only observed live events and this client's pending turns may survive an older snapshot. */
declare function reconcileSessionProjectionSnapshot(state: SessionProjectionState, messages: readonly unknown[], scope?: SessionProjectionScope, options?: SessionProjectionSnapshotOptions): SessionProjectionState;
/** Replayed finals are recognized against this run's bounded canonical terminal history. */
declare function hasSessionProjectionAcceptedFinal(run: SessionProjectionRun | undefined, message: unknown): boolean;
/** Reduces durable events, snapshots, and transport lifecycle without client-specific policy. */
declare function reduceSessionProjection(state: SessionProjectionState, event: SessionProjectionEvent): SessionProjectionState;
/** Normalizes Gateway run envelopes once for every browser and terminal adapter. */
declare function reduceSessionProjectionRunEvent(projection: SessionProjectionState, event: SessionProjectionGatewayRunEvent, scope?: SessionProjectionScope): SessionProjectionRunTransition | null;
//#endregion
//#region packages/gateway-client/src/session-subscriptions.d.ts
type GatewaySessionMessageRequestClient = {
  request<T = unknown>(method: string, params: Record<string, unknown>): Promise<T>;
};
type GatewaySessionMessageSubscription = {
  key: string;
  agentId?: string | null;
  includeApprovals?: true;
  approvalReplay?: unknown;
};
type GatewaySessionMessageSubscriptionOptions = {
  agentId?: string | null;
  includeApprovals?: boolean;
};
type GatewaySessionMessageSubscriptionCoordinatorOptions = {
  keysEquivalent?: (left: string, right: string) => boolean;
};
/**
 * One Gateway connection owns one targeted observer per canonical session.
 * Approval delivery is an upgrade of that observer, never a second observer.
 */
declare class GatewaySessionMessageSubscriptionCoordinator {
  #private;
  constructor(client: GatewaySessionMessageRequestClient, options?: GatewaySessionMessageSubscriptionCoordinatorOptions);
  configure(options?: GatewaySessionMessageSubscriptionCoordinatorOptions): this;
  acquire(key: string, options?: GatewaySessionMessageSubscriptionOptions): Promise<GatewaySessionMessageSubscription>;
  release(subscription: GatewaySessionMessageSubscription): Promise<void>;
  /** A reconnect retires leases without touching the next connection's observers. */
  reset(): void;
}
declare function getGatewaySessionMessageSubscriptionCoordinator(client: GatewaySessionMessageRequestClient, options?: GatewaySessionMessageSubscriptionCoordinatorOptions): GatewaySessionMessageSubscriptionCoordinator;
declare function resetGatewaySessionMessageSubscriptionCoordinator(client: GatewaySessionMessageRequestClient): void;
declare function releaseGatewaySessionMessageSubscription(subscription: GatewaySessionMessageSubscription): Promise<void>;
//#endregion
export { GatewayBrowserDeviceAuthLifecycle as A, buildDeviceAuthPayload as B, normalizeSessionProjectionRunId as C, reconcileSessionProjectionSnapshot as D, readSessionMessageSequence as E, GatewayConnectAuthSelection as F, normalizeDeviceMetadataForAuth as H, buildGatewayConnectAuth as I, resolveGatewayConnectScopes as L, GatewayBrowserDeviceIdentity as M, GatewayBrowserDeviceTokenRecord as N, reduceSessionProjection as O, GatewayBrowserDeviceTokenStore as P, selectGatewayConnectAuth as R, isLocallyOptimisticSessionMessage as S, readSessionMessageIdentity as T, buildDeviceAuthPayloadV3 as V, SessionProjectionScope as _, GatewaySessionMessageSubscriptionOptions as a, createSessionProjection as b, resetGatewaySessionMessageSubscriptionCoordinator as c, SessionProjectionEntry as d, SessionProjectionEvent as f, SessionProjectionRunTransition as g, SessionProjectionRunStatus as h, GatewaySessionMessageSubscriptionCoordinatorOptions as i, GatewayBrowserDeviceAuthPlan as j, reduceSessionProjectionRunEvent as k, SessionMessageEnvelope as l, SessionProjectionRun as m, GatewaySessionMessageSubscription as n, getGatewaySessionMessageSubscriptionCoordinator as o, SessionProjectionGatewayRunEvent as p, GatewaySessionMessageSubscriptionCoordinator as r, releaseGatewaySessionMessageSubscription as s, GatewaySessionMessageRequestClient as t, SessionMessageIdentity as u, SessionProjectionSnapshotOptions as v, projectLiveSessionMessage as w, hasSessionProjectionAcceptedFinal as x, SessionProjectionState as y, shouldRetryGatewayWithDeviceToken as z };
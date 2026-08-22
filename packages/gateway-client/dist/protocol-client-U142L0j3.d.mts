import { ErrorShape, EventFrame, HelloOk } from "@openclaw/gateway-protocol";

//#region packages/gateway-client/src/protocol-request.d.ts
type GatewayProtocolRequestOptions = {
  timeoutMs?: number | null;
  expectFinal?: boolean;
  onSent?: () => void;
  onAccepted?: (payload: unknown) => void;
  signal?: AbortSignal;
};
declare class GatewayProtocolRequestError extends Error {
  readonly code: string;
  readonly gatewayCode: string;
  readonly details?: unknown;
  readonly retryable: boolean;
  readonly retryAfterMs?: number;
  constructor(error: Partial<ErrorShape>);
}
//#endregion
//#region packages/gateway-client/src/protocol-client.d.ts
type GatewayProtocolSocket = {
  isOpen: () => boolean;
  send: (data: string) => void;
  close: (code?: number, reason?: string) => void;
};
type GatewayProtocolSocketHandlers = {
  open: () => void;
  message: (data: string) => void;
  close: (code: number, reason: string) => void;
  error: (error: Error) => void;
};
type GatewayProtocolConnectContext<TPlan> = {
  generation: number;
  nonce: string | null;
  challengeTs: number | null | undefined;
  plan: TPlan;
};
type GatewayProtocolCloseContext = {
  code: number;
  reason: string;
  generation: number;
  socketOpened: boolean;
  helloReceived: boolean;
  connectRequestSent: boolean;
  connectFailure?: {
    error: Error;
    reconnectDelayMs?: number;
  };
};
type GatewayProtocolConnectDecision = {
  closeCode: number;
  closeReason: string;
  reconnectDelayMs?: number;
  stop?: boolean;
  error?: Error;
};
type GatewayProtocolCloseDecision = {
  retry: boolean;
  notify: boolean;
  reconnectDelayMs?: number;
  pendingError?: Error;
};
type GatewayProtocolTiming<TPlan> = {
  phase: "socket-open" | "challenge" | "fallback" | "device-identity-ready" | "connect-plan-ready" | "request-sent" | "hello" | "failed";
  generation: number;
  durationMs: number;
  phaseDurationMs: number;
  hasChallenge: boolean;
  usedFallback: boolean;
  plan?: TPlan;
  detail?: unknown;
};
type GatewayProtocolRequestTiming = {
  id: string;
  method: string;
  ok: boolean;
  durationMs: number;
  startedAtMs: number;
  endedAtMs: number;
  errorCode?: string;
};
type GatewayProtocolClientOptions<TPlan> = {
  createSocket: (handlers: GatewayProtocolSocketHandlers) => GatewayProtocolSocket;
  createRequestId: () => string;
  createRequestError?: (error: Partial<ErrorShape>) => GatewayProtocolRequestError;
  createRequestTimeoutError?: (method: string, timeoutMs: number, requestSent: boolean) => Error;
  createRequestAbortError?: (method: string) => Error;
  buildConnectPlan: (params: {
    nonce: string | null;
    challengeTs: number | null | undefined;
    generation: number;
  }) => TPlan | Promise<TPlan>;
  buildConnectParams: (plan: TPlan) => unknown;
  onConnectPlanError?: (error: Error) => GatewayProtocolConnectDecision;
  onConnectHello?: (hello: HelloOk, context: GatewayProtocolConnectContext<TPlan>) => void;
  onHello?: (hello: HelloOk) => void;
  onConnectFailure?: (error: GatewayProtocolRequestError, context: GatewayProtocolConnectContext<TPlan>) => GatewayProtocolConnectDecision;
  resolveClose: (context: GatewayProtocolCloseContext) => GatewayProtocolCloseDecision;
  onClose?: (context: GatewayProtocolCloseContext, decision: GatewayProtocolCloseDecision) => void;
  notifyStoppedClose?: boolean;
  onConnectError?: (error: Error) => void;
  onSocketFactoryError?: (error: Error) => void;
  onParseError?: (error: unknown) => void;
  onEvent?: (event: EventFrame) => void;
  onGap?: (info: {
    expected: number;
    received: number;
  }) => void;
  onActivity?: () => void;
  onTiming?: (timing: GatewayProtocolTiming<TPlan>) => void;
  onRequestTiming?: (timing: GatewayProtocolRequestTiming) => void;
  onCallbackError?: (label: string, error: unknown) => void;
  handshake: {
    mode: "fallback";
    timeoutMs: number;
  } | {
    mode: "require-challenge";
    timeoutMs: number;
    timeoutMessage?: (elapsedMs: number) => string;
  };
  reconnect: {
    initialMs: number;
    multiplier: number;
    maxMs: number;
  };
  requestTimeoutMs?: number;
  nowMs?: () => number;
  shouldRetrySocketFactoryError?: (error: Error) => boolean;
  rethrowSocketFactoryError?: (error: Error) => boolean;
};
/**
 * Browser-safe gateway wire client. Environment adapters own transport and auth
 * policy; this class owns the single socket/handshake/reconnect/frame state machine.
 */
declare class GatewayProtocolClient<TPlan> {
  private readonly opts;
  private socket;
  private readonly pending;
  private readonly listeners;
  private stopped;
  private generation;
  private lastSeq;
  private connectNonce;
  private connectChallengeTs;
  private connectSent;
  private connectRequestSent;
  private handshakeTimer;
  private readonly reconnectSupervisor;
  private reconnectSignal;
  private socketOpened;
  private helloReceived;
  private connectFailure;
  private connectTiming;
  private stoppedSocket?;
  constructor(opts: GatewayProtocolClientOptions<TPlan>);
  get connected(): boolean;
  get hasPendingRequests(): boolean;
  get connecting(): boolean;
  get hasUnboundedPendingRequests(): boolean;
  start(): void;
  stop(): void;
  request<T = unknown>(method: string, params?: unknown, options?: GatewayProtocolRequestOptions): Promise<T>;
  addEventListener(listener: (event: EventFrame) => void): () => void;
  closeSocket(code?: number, reason?: string): void;
  resetReconnectBackoff(initialMs: number): void;
  recordTiming(phase: GatewayProtocolTiming<TPlan>["phase"], generation: number, plan?: TPlan, detail?: unknown): void;
  private connect;
  private handleOpen;
  private armHandshakeTimer;
  private sendConnect;
  private handleConnectPlanError;
  private sendConnectPlan;
  private handleMessage;
  private handleResponse;
  private handleClose;
  private handleSocketError;
  private flushRequests;
  private finishRequestTiming;
  private scheduleReconnect;
  private closeContext;
  private isActive;
  private nowMs;
  private clearHandshakeTimer;
  private invoke;
}
//#endregion
export { GatewayProtocolSocketHandlers as a, GatewayProtocolRequestOptions as c, GatewayProtocolSocket as i, GatewayProtocolCloseContext as n, GatewayProtocolTiming as o, GatewayProtocolRequestTiming as r, GatewayProtocolRequestError as s, GatewayProtocolClient as t };
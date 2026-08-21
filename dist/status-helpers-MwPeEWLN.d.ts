import { J as ChannelAccountSnapshot } from "./setup-wizard-types-B677hB7z.js";
//#region src/plugin-sdk/status-helpers.d.ts
type RuntimeLifecycleSnapshot = {
  linked?: boolean | null;
  running?: boolean | null;
  connected?: boolean | null;
  restartPending?: boolean | null;
  reconnectAttempts?: number | null;
  lastConnectedAt?: number | null;
  lastDisconnect?: string | {
    at: number;
    status?: number;
    error?: string;
    loggedOut?: boolean;
  } | null;
  lastEventAt?: number | null;
  lastTransportActivityAt?: number | null;
  healthState?: string | null;
  lifecycle?: ChannelAccountSnapshot["lifecycle"] | null;
  ingressUnavailable?: true | null;
  terminalDisconnect?: boolean | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  lastInboundAt?: number | null;
  lastOutboundAt?: number | null;
  busy?: boolean | null;
  activeRuns?: number | null;
  lastRunActivityAt?: number | null;
  activeRunStartedAt?: number | null;
};
type StatusSnapshotExtra = Record<string, unknown>;
/** Create the baseline runtime snapshot shape used by channel/account status stores. */
declare function createDefaultChannelRuntimeState<T extends Record<string, unknown>>(accountId: string, extra?: T): {
  accountId: string;
  running: false;
  lastStartAt: null;
  lastStopAt: null;
  lastError: null;
} & T;
/** Extend the base summary with probe fields while preserving stable null defaults. */
declare function buildProbeChannelStatusSummary<TExtra extends Record<string, unknown>>(snapshot: {
  configured?: boolean | null;
  running?: boolean | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  probe?: unknown;
  lastProbeAt?: number | null;
}, extra?: TExtra): {
  configured: boolean;
} & TExtra & {
  probe: unknown;
  lastProbeAt: number | null;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
};
/** Convenience wrapper when the caller already has flattened account fields instead of an account object. */
declare function buildComputedAccountStatusSnapshot<TExtra extends StatusSnapshotExtra>(params: {
  accountId: string;
  name?: string;
  enabled?: boolean;
  configured?: boolean;
  runtime?: RuntimeLifecycleSnapshot | null;
  probe?: unknown;
}, extra?: TExtra): {
  lastInboundAt: number | null;
  lastOutboundAt: number | null;
  activeRunStartedAt?: number | undefined;
  lastRunActivityAt?: number | undefined;
  activeRuns?: number | undefined;
  busy?: boolean | undefined;
  terminalDisconnect?: true | undefined;
  ingressUnavailable?: true | undefined;
  lifecycle?: "starting" | "ready" | "recovering" | "blocked" | "stopped" | undefined;
  healthState?: string | undefined;
  lastTransportActivityAt?: number | undefined;
  lastEventAt?: number | undefined;
  lastDisconnect?: string | {
    at: number;
    status?: number;
    error?: string;
    loggedOut?: boolean;
  } | undefined;
  lastConnectedAt?: number | undefined;
  reconnectAttempts?: number | undefined;
  restartPending?: boolean | undefined;
  connected?: boolean | undefined;
  linked?: boolean | undefined;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
  probe: unknown;
  accountId: string;
  name: string | undefined;
  enabled: boolean | undefined;
  configured: boolean | undefined;
} & TExtra;
/** Build token-based channel status summaries with optional mode reporting. */
declare function buildTokenChannelStatusSummary(snapshot: {
  configured?: boolean | null;
  tokenSource?: string | null;
  running?: boolean | null;
  mode?: string | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  probe?: unknown;
  lastProbeAt?: number | null;
}, opts?: {
  includeMode?: boolean;
}): {
  tokenSource: string;
  probe: unknown;
  lastProbeAt: number | null;
  configured: boolean;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
} | {
  mode: string | null;
  tokenSource: string;
  probe: unknown;
  lastProbeAt: number | null;
  configured: boolean;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
};
//#endregion
export { createDefaultChannelRuntimeState as i, buildProbeChannelStatusSummary as n, buildTokenChannelStatusSummary as r, buildComputedAccountStatusSnapshot as t };
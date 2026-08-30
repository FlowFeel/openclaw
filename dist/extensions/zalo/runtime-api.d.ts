import { Et as normalizeSecretInputString, St as SecretInput, Tt as normalizeResolvedSecretInputString, _t as MarkdownTableMode, c as ZodLiteral, h as ZodUnion, mt as GroupPolicy, n as OpenClawConfig, o as ZodDiscriminatedUnion, p as ZodString, u as ZodObject, v as $strict, wt as hasConfiguredSecretInput } from "../../types.openclaw-B_WTBPdp.js";
import { B as OutboundReplyPayload, Ct as jsonResult, H as deliverTextOrMediaReply, L as PluginRuntime, St as readStringParam, U as isNumericTargetId, V as ReplyPayload, W as sendPayloadWithChunkedTextAndMedia, z as createChannelReplyPipeline } from "../../types-DCnZ_KP9.js";
import { H as WizardPrompter, J as BaseTokenResolution, Y as ChannelAccountSnapshot, ot as ChannelStatusIssue, q as BaseProbeResult, rt as ChannelMessageActionAdapter } from "../../setup-wizard-types-CdHl9mdg.js";
import { f as RuntimeEnv } from "../../manifest-registry-CCblNuJM.js";
import { n as ChannelPlugin, t as ChannelMessageActionName } from "../../types.public-CzDPG1QF.js";
import { _ as PAIRING_APPROVED_MESSAGE, b as DEFAULT_ACCOUNT_ID, m as buildTokenChannelStatusSummary, p as buildBaseAccountStatusSnapshot, x as normalizeAccountId } from "../../runtime-api-B2IwyxDu.js";
import { C as resolveOpenProviderRuntimeGroupPolicy, S as resolveDefaultGroupPolicy, _ as createWebhookAnomalyTracker, a as resolveWebhookPath, c as withResolvedWebhookRequestPipeline, d as applyBasicWebhookRequestGuards, g as createFixedWindowRateLimiter, h as WEBHOOK_RATE_LIMIT_DEFAULTS, i as registerWebhookTargetWithPluginRoute, l as registerPluginHttpRoute, m as WEBHOOK_ANOMALY_COUNTER_DEFAULTS, n as RegisterWebhookTargetOptions, p as readJsonWebhookBodyOrReject, r as registerWebhookTarget, s as resolveWebhookTargetWithAuthOrRejectSync, t as RegisterWebhookPluginRouteOptions, v as chunkTextForOutbound, w as warnMissingProviderGroupPolicyFallbackOnce, y as createChannelPairingController } from "../../webhook-ingress-CBHr698X.js";
import { r as buildChannelConfigSchema, t as formatPairingApproveHint } from "../../core-bq0D_t5i.js";
import { n as applySetupAccountConfigPatch, r as migrateBaseNameToDefaultAccount, t as applyAccountNameToChannelSection } from "../../setup-helpers-DNxwBHOx.js";
import { a as runSingleChannelSecretStep, i as promptSingleChannelSecretInput, n as buildSingleChannelSecretPromptState, o as setTopLevelChannelDmPolicyWithAllowFrom, r as mergeAllowFromEntries, t as addWildcardAllowFrom } from "../../setup-DsOwGw_B.js";
import { IncomingMessage } from "node:http";

//#region src/infra/dedupe.d.ts
/** Small in-memory TTL/LRU-style cache for replay and duplicate suppression. */
type DedupeCache = {
  /** Returns true for a recent duplicate; records the key and optional owner when absent. */check: (key: string | undefined | null, now?: number, ownerToken?: object) => boolean; /** Returns true for a recent duplicate without refreshing or recording the key. */
  peek: (key: string | undefined | null, now?: number) => boolean;
  delete: (key: string | undefined | null, ownerToken?: object) => void;
  clear: () => void;
  size: () => number;
};
/** Dedupe cache bounds; ttlMs <= 0 disables expiry, maxSize <= 0 disables storage. */
type DedupeCacheOptions = {
  ttlMs: number;
  maxSize: number;
};
/** Creates a bounded in-memory dedupe cache with optional TTL expiry. */
declare function createDedupeCache(options: DedupeCacheOptions): DedupeCache;
//#endregion
//#region src/gateway/net.d.ts
declare function resolveClientIp(params: {
  remoteAddr?: string;
  forwardedFor?: string;
  realIp?: string;
  trustedProxies?: string[]; /** Default false: only trust X-Real-IP when explicitly enabled. */
  allowRealIpFallback?: boolean;
}): string | undefined;
//#endregion
//#region src/channels/logging.d.ts
/**
 * Shared channel diagnostic formatters exposed through the plugin SDK.
 * Keep messages compact and stable enough for plugin logs without making them machine contracts.
 */
/** Minimal logger callback shape exposed through channel SDK helpers. */
type LogFn = (message: string) => void;
/** Emits a normalized typing-indicator failure diagnostic for channel plugins. */
declare function logTypingFailure(params: {
  log: LogFn;
  channel: string;
  target?: string;
  action?: "start" | "stop";
  error: unknown;
}): void;
//#endregion
//#region src/plugin-sdk/allow-from.d.ts
/** Lowercase and optionally strip prefixes from allowlist entries before sender comparisons. */
declare function formatAllowFromLowercase(params: {
  /** Raw allowlist entries from config or channel-specific overrides. */allowFrom: Array<string | number>; /** Optional prefix remover for channel aliases such as `tg:` or `zalo:`. */
  stripPrefixRe?: RegExp;
}): string[];
/** Check whether a sender id matches a simple normalized allowlist with wildcard support. */
declare function isNormalizedSenderAllowed(params: {
  /** Sender id or handle to compare after string coercion and lowercase normalization. */senderId: string | number; /** Raw allowlist entries; `*` allows every sender. */
  allowFrom: Array<string | number>; /** Optional prefix remover applied to allowlist entries before comparison. */
  stripPrefixRe?: RegExp;
}): boolean;
//#endregion
//#region src/infra/abort-signal.d.ts
/** Resolves when the signal aborts, or immediately when no wait is needed. */
declare function waitForAbortSignal(signal?: AbortSignal): Promise<void>;
//#endregion
//#region src/plugin-sdk/secret-input-schema.d.ts
/**
 * Returns the shared secret-input schema for plaintext values and env/file/exec refs.
 * Reusing this singleton preserves sensitive-path registration for config redaction.
 */
declare function buildSecretInputSchema(): ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
  source: ZodLiteral<"env">;
  provider: ZodString;
  id: ZodString;
}, $strict>, ZodObject<{
  source: ZodLiteral<"file">;
  provider: ZodString;
  id: ZodString;
}, $strict>, ZodObject<{
  source: ZodLiteral<"exec">;
  provider: ZodString;
  id: ZodString;
}, $strict>], "source">]>;
//#endregion
//#region extensions/zalo/src/runtime.d.ts
declare const setZaloRuntime: (next: PluginRuntime) => void, getZaloRuntime: () => PluginRuntime;
//#endregion
export { type BaseProbeResult, type BaseTokenResolution, type ChannelAccountSnapshot, type ChannelMessageActionAdapter, type ChannelMessageActionName, type ChannelPlugin, type ChannelStatusIssue, DEFAULT_ACCOUNT_ID, type GroupPolicy, type MarkdownTableMode, type OpenClawConfig, type OutboundReplyPayload, PAIRING_APPROVED_MESSAGE, type PluginRuntime, type RegisterWebhookPluginRouteOptions, type RegisterWebhookTargetOptions, type ReplyPayload, type RuntimeEnv, type SecretInput, WEBHOOK_ANOMALY_COUNTER_DEFAULTS, WEBHOOK_RATE_LIMIT_DEFAULTS, type WizardPrompter, addWildcardAllowFrom, applyAccountNameToChannelSection, applyBasicWebhookRequestGuards, applySetupAccountConfigPatch, buildBaseAccountStatusSnapshot, buildChannelConfigSchema, buildSecretInputSchema, buildSingleChannelSecretPromptState, buildTokenChannelStatusSummary, chunkTextForOutbound, createChannelReplyPipeline as createChannelMessageReplyPipeline, createChannelPairingController, createDedupeCache, createFixedWindowRateLimiter, createWebhookAnomalyTracker, deliverTextOrMediaReply, formatAllowFromLowercase, formatPairingApproveHint, hasConfiguredSecretInput, isNormalizedSenderAllowed, isNumericTargetId, jsonResult, logTypingFailure, mergeAllowFromEntries, migrateBaseNameToDefaultAccount, normalizeAccountId, normalizeResolvedSecretInputString, normalizeSecretInputString, promptSingleChannelSecretInput, readJsonWebhookBodyOrReject, readStringParam, registerPluginHttpRoute, registerWebhookTarget, registerWebhookTargetWithPluginRoute, resolveClientIp, resolveDefaultGroupPolicy, resolveOpenProviderRuntimeGroupPolicy, resolveWebhookPath, resolveWebhookTargetWithAuthOrRejectSync, runSingleChannelSecretStep, sendPayloadWithChunkedTextAndMedia, setTopLevelChannelDmPolicyWithAllowFrom, setZaloRuntime, waitForAbortSignal, warnMissingProviderGroupPolicyFallbackOnce, withResolvedWebhookRequestPipeline };
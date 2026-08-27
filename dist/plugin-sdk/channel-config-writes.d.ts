import { n as OpenClawConfig } from "../types.openclaw-B4JlK2kd.js";
import { G as ConfigWriteTargetLike, U as ConfigWriteAuthorizationResultLike, W as ConfigWriteScopeLike } from "../types.adapters-lTbIcsoc.js";
//#region src/plugin-sdk/channel-config-helpers.d.ts
/** Origin scope used when authorizing channel config writes. */
type ConfigWriteScope = ConfigWriteScopeLike;
/** Target account/channel for a config write authorization check. */
type ConfigWriteTarget = ConfigWriteTargetLike;
/** Decision returned by channel config write policy helpers. */
type ConfigWriteAuthorizationResult = ConfigWriteAuthorizationResultLike;
/** Returns whether config writes are enabled for a channel/account target. */
declare function resolveChannelConfigWrites(params: {
  cfg: OpenClawConfig;
  channelId?: string | null;
  accountId?: string | null;
}): boolean;
/** Authorizes a channel config mutation against origin and target policy. */
declare function authorizeConfigWrite(params: {
  cfg: OpenClawConfig;
  origin?: ConfigWriteScope;
  target?: ConfigWriteTarget;
  allowBypass?: boolean;
}): ConfigWriteAuthorizationResult;
/** Returns true when trusted internal message scopes can bypass config write policy. */
declare function canBypassConfigWritePolicy(params: {
  channel?: string | null;
  gatewayClientScopes?: string[] | null;
}): boolean;
/** Formats the denial message shown when config write authorization fails. */
declare function formatConfigWriteDeniedMessage(params: {
  result: Exclude<ConfigWriteAuthorizationResult, {
    allowed: true;
  }>;
  fallbackChannelId?: string | null;
}): string;
//#endregion
export { type ConfigWriteAuthorizationResult, type ConfigWriteScope, type ConfigWriteTarget, authorizeConfigWrite, canBypassConfigWritePolicy, formatConfigWriteDeniedMessage, resolveChannelConfigWrites };
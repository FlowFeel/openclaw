import { n as OpenClawConfig, qg as ContextVisibilityMode } from "./types.openclaw-_47ZKysp.js";
//#region src/config/context-visibility.d.ts
/** Resolves supplemental context visibility using explicit, account, channel, default precedence. */
declare function resolveChannelContextVisibilityMode(params: {
  /** Full OpenClaw config containing channel defaults and per-channel overrides. */cfg: OpenClawConfig; /** Channel id whose visibility policy is being resolved. */
  channel: string; /** Optional channel account id used for account-specific overrides. */
  accountId?: string | null; /** Runtime adapter override that takes precedence over config-backed policy. */
  configuredContextVisibility?: ContextVisibilityMode;
}): ContextVisibilityMode;
//#endregion
export { resolveChannelContextVisibilityMode as t };
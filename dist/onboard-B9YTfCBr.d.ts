import { n as OpenClawConfig } from "./types.openclaw-DlZm98yj.js";
//#region extensions/xai/onboard.d.ts
declare const XAI_DEFAULT_MODEL_REF = "xai/grok-4.3";
declare const XAI_OAUTH_DEFAULT_MODEL_REF = "xai/auto";
declare function applyXaiProviderConfig(cfg: OpenClawConfig): OpenClawConfig;
declare function applyXaiConfig(cfg: OpenClawConfig): OpenClawConfig;
declare function applyXaiOAuthConfig(cfg: OpenClawConfig): OpenClawConfig;
//#endregion
export { applyXaiProviderConfig as a, applyXaiOAuthConfig as i, XAI_OAUTH_DEFAULT_MODEL_REF as n, applyXaiConfig as r, XAI_DEFAULT_MODEL_REF as t };
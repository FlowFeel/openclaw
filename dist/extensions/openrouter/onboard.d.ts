import { n as OpenClawConfig } from "../../types.openclaw-lExroEnq.js";
//#region extensions/openrouter/onboard.d.ts
declare const OPENROUTER_DEFAULT_MODEL_REF = "openrouter/auto";
declare function applyOpenrouterProviderConfig(cfg: OpenClawConfig): OpenClawConfig;
declare function applyOpenrouterConfig(cfg: OpenClawConfig): OpenClawConfig;
//#endregion
export { OPENROUTER_DEFAULT_MODEL_REF, applyOpenrouterConfig, applyOpenrouterProviderConfig };
import { T as ModelProviderConfig, n as OpenClawConfig } from "../../types.openclaw-B2WvMv3k.js";
import { y as ProviderThinkingProfile } from "../../types-7SOOE25U.js";
import { applyAnthropicConfigDefaults } from "./config-defaults.js";
//#region extensions/anthropic/provider-policy-api.d.ts
/** Normalize Anthropic provider config without importing runtime registration. */
declare function normalizeConfig(params: {
  provider: string;
  providerConfig: ModelProviderConfig;
}): ModelProviderConfig;
/** Apply Anthropic config defaults through the provider-policy seam. */
declare function applyConfigDefaults(params: Parameters<typeof applyAnthropicConfigDefaults>[0]): OpenClawConfig;
/** Resolve Claude thinking profile for Anthropic or Claude CLI providers. */
declare function resolveThinkingProfile(params: {
  provider: string;
  modelId: string;
  params?: Record<string, unknown>;
}): ProviderThinkingProfile | {
  readonly levels: readonly [{
    readonly id: "off";
  }];
  readonly defaultLevel: "off";
} | null;
//#endregion
export { applyConfigDefaults, normalizeConfig, resolveThinkingProfile };
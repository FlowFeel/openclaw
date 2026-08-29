import { v as ProviderThinkingProfile } from "../../types-t45BJFXe.js";
import { l as ModelProviderConfig } from "../../types.openclaw-DPyC_juj.js";
import { c as ProviderDefaultThinkingPolicyContext } from "../../plugin-entry-h8MjCePN.js";
//#region extensions/google/provider-policy-api.d.ts
declare function normalizeConfig(params: {
  provider: string;
  providerConfig: ModelProviderConfig;
}): ModelProviderConfig;
declare function resolveThinkingProfile(context: ProviderDefaultThinkingPolicyContext): ProviderThinkingProfile | undefined;
//#endregion
export { normalizeConfig, resolveThinkingProfile };
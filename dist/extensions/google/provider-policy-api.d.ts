import { v as ProviderThinkingProfile } from "../../types-B3KbIvCl.js";
import { l as ModelProviderConfig } from "../../types.openclaw-hJEKisz6.js";
import { c as ProviderDefaultThinkingPolicyContext } from "../../plugin-entry-CuznV56Y.js";
//#region extensions/google/provider-policy-api.d.ts
declare function normalizeConfig(params: {
  provider: string;
  providerConfig: ModelProviderConfig;
}): ModelProviderConfig;
declare function resolveThinkingProfile(context: ProviderDefaultThinkingPolicyContext): ProviderThinkingProfile | undefined;
//#endregion
export { normalizeConfig, resolveThinkingProfile };
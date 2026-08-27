import { v as ProviderThinkingProfile } from "../../types-kmCR57lP.js";
import { l as ModelProviderConfig } from "../../types.openclaw-Becy5MdM.js";
import { c as ProviderDefaultThinkingPolicyContext } from "../../plugin-entry-Bcv4dwhw.js";
//#region extensions/google/provider-policy-api.d.ts
declare function normalizeConfig(params: {
  provider: string;
  providerConfig: ModelProviderConfig;
}): ModelProviderConfig;
declare function resolveThinkingProfile(context: ProviderDefaultThinkingPolicyContext): ProviderThinkingProfile | undefined;
//#endregion
export { normalizeConfig, resolveThinkingProfile };
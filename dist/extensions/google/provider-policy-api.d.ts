import { v as ProviderThinkingProfile } from "../../types-DJ09K2Ui.js";
import { l as ModelProviderConfig } from "../../types.openclaw-Becy5MdM.js";
import { c as ProviderDefaultThinkingPolicyContext } from "../../plugin-entry-CC26Si1X.js";
//#region extensions/google/provider-policy-api.d.ts
declare function normalizeConfig(params: {
  provider: string;
  providerConfig: ModelProviderConfig;
}): ModelProviderConfig;
declare function resolveThinkingProfile(context: ProviderDefaultThinkingPolicyContext): ProviderThinkingProfile | undefined;
//#endregion
export { normalizeConfig, resolveThinkingProfile };
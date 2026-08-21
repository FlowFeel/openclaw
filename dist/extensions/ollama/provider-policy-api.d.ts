import { l as ModelProviderConfig } from "../../types.openclaw-hJEKisz6.js";
import { p as ProviderThinkingProfile, u as ProviderNormalizeResolvedModelContext } from "../../plugin-entry-Cqz1CRwl.js";

//#region extensions/ollama/provider-policy-api.d.ts
type OllamaProviderConfigDraft = Partial<ModelProviderConfig>;
/**
 * Provider policy surface for Ollama: normalize provider configs used by
 * core defaults/normalizers. This runs during config defaults application and
 * normalization paths (not Zod validation).
 */
declare function normalizeConfig({
  provider,
  providerConfig
}: {
  provider: string;
  providerConfig: OllamaProviderConfigDraft;
}): OllamaProviderConfigDraft;
/**
 * Ollama's local and cloud providers do not normalize resolved models.
 * Skip full plugin activation when the model-list path asks for that no-op.
 */
declare function projectConfiguredModelRow(ctx: ProviderNormalizeResolvedModelContext): null | undefined;
declare function resolveThinkingProfile({
  reasoning
}: {
  reasoning?: boolean;
}): ProviderThinkingProfile;
//#endregion
export { normalizeConfig, projectConfiguredModelRow, resolveThinkingProfile };
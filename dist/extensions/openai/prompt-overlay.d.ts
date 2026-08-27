import { nt as resolveGpt5SystemPromptContribution, rt as ProviderSystemPromptContribution, tt as Gpt5PromptOverlayMode } from "../../plugin-entry-DZ50A-uD.js";

//#region extensions/openai/prompt-overlay.d.ts
type OpenAIPromptOverlayMode = Gpt5PromptOverlayMode;
declare function resolveOpenAIPromptOverlayMode(pluginConfig?: Record<string, unknown>): OpenAIPromptOverlayMode;
declare function resolveOpenAISystemPromptContribution(params: {
  config?: Parameters<typeof resolveGpt5SystemPromptContribution>[0]["config"];
  legacyPluginConfig?: Record<string, unknown>;
  mode?: OpenAIPromptOverlayMode;
  modelProviderId?: string;
  modelId?: string;
  trigger?: Parameters<typeof resolveGpt5SystemPromptContribution>[0]["trigger"];
}): ProviderSystemPromptContribution | undefined;
//#endregion
export { resolveOpenAIPromptOverlayMode, resolveOpenAISystemPromptContribution };
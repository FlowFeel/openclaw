import { P as ProviderPlugin } from "../../plugin-entry-DZ50A-uD.js";

//#region extensions/openai/openai-provider.d.ts
declare function buildOpenAIProvider(): ProviderPlugin;
/** @deprecated Use buildOpenAIProvider; OpenAI Codex is now an OpenAI auth/transport mode. */
declare function buildOpenAICodexProviderPlugin(): ProviderPlugin;
//#endregion
export { buildOpenAICodexProviderPlugin, buildOpenAIProvider };
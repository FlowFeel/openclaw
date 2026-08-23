import { P as ProviderPlugin } from "../../plugin-entry-D2U6D_c3.js";

//#region extensions/openai/openai-provider.d.ts
declare function buildOpenAIProvider(): ProviderPlugin;
/** @deprecated Use buildOpenAIProvider; OpenAI Codex is now an OpenAI auth/transport mode. */
declare function buildOpenAICodexProviderPlugin(): ProviderPlugin;
//#endregion
export { buildOpenAICodexProviderPlugin, buildOpenAIProvider };
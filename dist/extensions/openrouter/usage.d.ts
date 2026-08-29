import { j as ModelProviderDeclarationConfig } from "../../types.openclaw-szgVaeve.js";
import { N as ProviderUsageSnapshot } from "../../types-DhsBnKIv.js";
//#region extensions/openrouter/usage.d.ts
declare function fetchOpenRouterUsage(params: {
  token: string;
  baseUrl?: string;
  request?: ModelProviderDeclarationConfig["request"];
  timeoutMs: number;
  fetchFn: typeof fetch;
}): Promise<ProviderUsageSnapshot>;
//#endregion
export { fetchOpenRouterUsage };
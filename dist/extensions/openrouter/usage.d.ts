import { j as ModelProviderDeclarationConfig } from "../../types.openclaw-DlZm98yj.js";
import { N as ProviderUsageSnapshot } from "../../types-BNfDyER-.js";
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
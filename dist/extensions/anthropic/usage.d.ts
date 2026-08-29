import { b as ProviderUsageSnapshot } from "../../types-DCnZ_KP9.js";
import { _ as ProviderResolveUsageAuthContext, m as ProviderFetchUsageSnapshotContext, v as ProviderResolvedUsageAuth } from "../../plugin-entry-CUAoWLy3.js";

//#region extensions/anthropic/usage.d.ts
declare function resolveAnthropicUsageAuth(ctx: ProviderResolveUsageAuthContext): Promise<ProviderResolvedUsageAuth>;
declare function fetchAnthropicUsage(ctx: ProviderFetchUsageSnapshotContext): Promise<ProviderUsageSnapshot>;
//#endregion
export { fetchAnthropicUsage, resolveAnthropicUsageAuth };
import { b as ProviderUsageSnapshot } from "../../types-odeWQ5Sn.js";
import { _ as ProviderResolveUsageAuthContext, m as ProviderFetchUsageSnapshotContext, v as ProviderResolvedUsageAuth } from "../../plugin-entry-D6tZQojt.js";

//#region extensions/anthropic/usage.d.ts
declare function resolveAnthropicUsageAuth(ctx: ProviderResolveUsageAuthContext): Promise<ProviderResolvedUsageAuth>;
declare function fetchAnthropicUsage(ctx: ProviderFetchUsageSnapshotContext): Promise<ProviderUsageSnapshot>;
//#endregion
export { fetchAnthropicUsage, resolveAnthropicUsageAuth };
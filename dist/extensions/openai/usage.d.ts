import { D as ProviderResolvedUsageAuth, J as ProviderUsageSnapshot, T as ProviderResolveUsageAuthContext, b as ProviderFetchUsageSnapshotContext } from "../../plugin-entry-DZ50A-uD.js";

//#region extensions/openai/usage.d.ts
declare function resolveOpenAIUsageAuth(ctx: ProviderResolveUsageAuthContext): Promise<ProviderResolvedUsageAuth>;
declare function fetchOpenAIUsage(ctx: ProviderFetchUsageSnapshotContext): Promise<ProviderUsageSnapshot>;
//#endregion
export { fetchOpenAIUsage, resolveOpenAIUsageAuth };
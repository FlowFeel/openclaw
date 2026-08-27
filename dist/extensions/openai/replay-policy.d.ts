import { C as ProviderReplayPolicyContext, S as ProviderReplayPolicy } from "../../plugin-entry-DZ50A-uD.js";

//#region extensions/openai/replay-policy.d.ts
/**
 * Returns the provider-owned replay policy for OpenAI-family transports.
 */
declare function buildOpenAIReplayPolicy(ctx: ProviderReplayPolicyContext): ProviderReplayPolicy;
//#endregion
export { buildOpenAIReplayPolicy };
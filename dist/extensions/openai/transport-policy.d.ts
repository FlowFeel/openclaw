import { A as ProviderWebSocketSessionPolicy, E as ProviderResolveWebSocketSessionPolicyContext, k as ProviderTransportTurnState, w as ProviderResolveTransportTurnStateContext } from "../../plugin-entry-d4GRo0oQ.js";

//#region extensions/openai/transport-policy.d.ts
declare function resolveOpenAITransportTurnState(ctx: ProviderResolveTransportTurnStateContext): ProviderTransportTurnState | undefined;
declare function resolveOpenAIWebSocketSessionPolicy(ctx: ProviderResolveWebSocketSessionPolicyContext): ProviderWebSocketSessionPolicy | undefined;
//#endregion
export { resolveOpenAITransportTurnState, resolveOpenAIWebSocketSessionPolicy };
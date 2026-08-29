import { Kt as StreamFn } from "../../setup-wizard-types-qbnj3m4f.js";
import { h as ProviderWrapStreamFnContext } from "../../plugin-entry-h8MjCePN.js";
import { t as VllmQwenThinkingFormat } from "../../thinking-policy-CeDbgM3V.js";

//#region extensions/vllm/stream.d.ts
type VllmThinkingLevel = ProviderWrapStreamFnContext["thinkingLevel"];
declare function createVllmQwenThinkingWrapper(params: {
  baseStreamFn: StreamFn | undefined;
  format: VllmQwenThinkingFormat;
  thinkingLevel: VllmThinkingLevel;
}): StreamFn;
declare function wrapVllmProviderStream(ctx: ProviderWrapStreamFnContext): StreamFn | undefined;
//#endregion
export { createVllmQwenThinkingWrapper, wrapVllmProviderStream };